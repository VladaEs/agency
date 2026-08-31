<?php

use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mailer\Transport\Smtp\EsmtpTransport;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mime\Email;

final class MailService
{
    private Mailer $mailer;
    private Address $from;
    private Address $admin;

    public function __construct()
    {
        $host = $this->required('SMTP_HOST');
        $port = (int) $this->required('SMTP_PORT');
        $username = $this->required('SMTP_USERNAME');
        $password = $this->required('SMTP_PASSWORD');
        $encryption = strtolower(Environment::get('SMTP_ENCRYPTION', 'tls'));

        if (!in_array($encryption, ['tls', 'ssl', 'none'], true)) {
            throw new RuntimeException('SMTP_ENCRYPTION must be tls, ssl, or none.');
        }

        $transport = new EsmtpTransport(
            $host,
            $port,
            $encryption === 'ssl'
        );
        $transport->setUsername($username);
        $transport->setPassword($password);

        if ($encryption === 'tls') {
            $transport->setRequireTls(true);
        } elseif ($encryption === 'none') {
            $transport->setAutoTls(false);
        }

        $this->mailer = new Mailer($transport);
        $this->from = new Address(
            $this->validEmail($this->required('SMTP_FROM_EMAIL'), 'SMTP_FROM_EMAIL'),
            Environment::get('SMTP_FROM_NAME', 'Norda')
        );
        $this->admin = new Address(
            $this->validEmail($this->required('SMTP_ADMIN_EMAIL'), 'SMTP_ADMIN_EMAIL')
        );
    }

    public function sendEnquiryNotifications(array $enquiry): void
    {
        $customer = new Address($enquiry['email'], $enquiry['name']);
        $id = (int) $enquiry['id'];

        $adminEmail = (new Email())
            ->from($this->from)
            ->to($this->admin)
            ->replyTo($customer)
            ->subject("New website enquiry #{$id}")
            ->text($this->adminText($enquiry))
            ->html($this->adminHtml($enquiry));

        $customerEmail = (new Email())
            ->from($this->from)
            ->to($customer)
            ->replyTo($this->admin)
            ->subject('We received your enquiry')
            ->text($this->customerText($enquiry))
            ->html($this->customerHtml($enquiry));

        $this->mailer->send($adminEmail);
        $this->mailer->send($customerEmail);
    }

    private function adminText(array $enquiry): string
    {
        return implode("\n", [
            "New website enquiry #{$enquiry['id']}",
            '',
            "Name: {$enquiry['name']}",
            "Email: {$enquiry['email']}",
            'Company: ' . ($enquiry['company'] ?: 'Not provided'),
            "Plan: {$enquiry['planTitle']}",
            "Service: {$enquiry['service']}",
            'Budget: ' . ($enquiry['budget'] ?: 'Not provided'),
            '',
            'Message:',
            $enquiry['message'],
        ]);
    }

    private function customerText(array $enquiry): string
    {
        return implode("\n", [
            "Hi {$enquiry['name']},",
            '',
            'Thanks for getting in touch. I have received your enquiry and will reply within one business day.',
            '',
            "Selected plan: {$enquiry['planTitle']}",
            "Reference: #{$enquiry['id']}",
            '',
            'Norda',
        ]);
    }

    private function adminHtml(array $enquiry): string
    {
        $name = $this->escape($enquiry['name']);
        $email = $this->escape($enquiry['email']);
        $company = $this->escape($enquiry['company'] ?: 'Not provided');
        $plan = $this->escape($enquiry['planTitle']);
        $service = $this->escape($enquiry['service']);
        $budget = $this->escape($enquiry['budget'] ?: 'Not provided');
        $message = nl2br($this->escape($enquiry['message']));

        return <<<HTML
            <h2>New website enquiry #{$enquiry['id']}</h2>
            <p><strong>Name:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Company:</strong> {$company}</p>
            <p><strong>Plan:</strong> {$plan}</p>
            <p><strong>Service:</strong> {$service}</p>
            <p><strong>Budget:</strong> {$budget}</p>
            <h3>Message</h3>
            <p>{$message}</p>
        HTML;
    }

    private function customerHtml(array $enquiry): string
    {
        $name = $this->escape($enquiry['name']);
        $plan = $this->escape($enquiry['planTitle']);

        return <<<HTML
            <h2>Thanks for your enquiry, {$name}!</h2>
            <p>I have received your message and will reply within one business day.</p>
            <p><strong>Selected plan:</strong> {$plan}</p>
            <p><strong>Reference:</strong> #{$enquiry['id']}</p>
            <p>Norda</p>
        HTML;
    }

    private function escape(mixed $value): string
    {
        return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    }

    private function required(string $name): string
    {
        $value = Environment::get($name);

        if ($value === null || trim($value) === '') {
            throw new RuntimeException("Missing SMTP setting: {$name}");
        }

        return trim($value);
    }

    private function validEmail(string $email, string $setting): string
    {
        if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
            throw new RuntimeException("{$setting} must contain a valid email address.");
        }

        return $email;
    }
}

