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
            'CONTACT',
            "Name: {$enquiry['name']}",
            "Email: {$enquiry['email']}",
            'Company: ' . ($enquiry['company'] ?: 'Not provided'),
            '',
            'PROJECT',
            "Plan: {$enquiry['planTitle']}",
            "Service: {$enquiry['service']}",
            'Budget: ' . ($enquiry['budget'] ?: 'Not provided'),
            '',
            'MESSAGE',
            $enquiry['message'],
            '',
            "Reply directly to {$enquiry['email']}",
        ]);
    }

    private function customerText(array $enquiry): string
    {
        return implode("\n", [
            "Hi {$enquiry['name']},",
            '',
            'Thanks for getting in touch. Your enquiry has arrived safely.',
            '',
            "Selected plan: {$enquiry['planTitle']}",
            "Reference: #{$enquiry['id']}",
            '',
            'What happens next:',
            '1. I will review your project details.',
            '2. I will reply within one business day.',
            '3. We will agree on the right approach and a clear quote.',
            '',
            'You can reply to this email if you would like to add anything.',
            '',
            'Norda',
            'Independent web design and development',
        ]);
    }

    private function adminHtml(array $enquiry): string
    {
        $id = (int) $enquiry['id'];
        $name = $this->escape($enquiry['name']);
        $message = nl2br($this->escape($enquiry['message']));
        $replyHref = $this->escape(
            'mailto:' . $enquiry['email'] . '?subject=' . rawurlencode("Re: Your Norda enquiry #{$id}")
        );
        $contactRows =
            $this->detailRow('Name', $enquiry['name']) .
            $this->detailRow('Email', $enquiry['email']) .
            $this->detailRow('Company', $enquiry['company'] ?: 'Not provided');
        $projectRows =
            $this->detailRow('Plan', $enquiry['planTitle']) .
            $this->detailRow('Service', $enquiry['service']) .
            $this->detailRow('Budget', $enquiry['budget'] ?: 'Not provided');

        $content = <<<HTML
            <p style="margin:0 0 24px;color:#4d4d4d;font-family:Arial,sans-serif;font-size:16px;line-height:1.65;">
                {$name} has sent a new project enquiry through the Norda website.
            </p>

            {$this->sectionLabel('Contact details')}
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 28px;border:1px solid #e7e3de;border-radius:16px;border-collapse:separate;overflow:hidden;">
                {$contactRows}
            </table>

            {$this->sectionLabel('Project details')}
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 28px;border:1px solid #e7e3de;border-radius:16px;border-collapse:separate;overflow:hidden;">
                {$projectRows}
            </table>

            {$this->sectionLabel('Message')}
            <div style="margin:0 0 28px;padding:20px;border-left:4px solid #ff5fa2;border-radius:4px 14px 14px 4px;background:#faf8f5;color:#242424;font-family:Arial,sans-serif;font-size:15px;line-height:1.7;">
                {$message}
            </div>

            {$this->actionButton($replyHref, 'Reply to enquiry')}
        HTML;

        return $this->emailShell(
            "New enquiry #{$id} from {$name}",
            'New website enquiry',
            "A new project just landed.",
            "Reference #{$id}",
            $content
        );
    }

    private function customerHtml(array $enquiry): string
    {
        $id = (int) $enquiry['id'];
        $name = $this->escape($enquiry['name']);
        $adminEmail = $this->admin->getAddress();
        $replyHref = $this->escape(
            'mailto:' . $adminEmail . '?subject=' . rawurlencode("More details for enquiry #{$id}")
        );
        $summaryRows =
            $this->detailRow('Selected plan', $enquiry['planTitle']) .
            $this->detailRow('Reference', "#{$id}");

        $content = <<<HTML
            <p style="margin:0 0 24px;color:#4d4d4d;font-family:Arial,sans-serif;font-size:16px;line-height:1.65;">
                Hi {$name}, thanks for getting in touch. Your enquiry has arrived safely and I&rsquo;ll review the details shortly.
            </p>

            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 30px;border:1px solid #e7e3de;border-radius:16px;border-collapse:separate;overflow:hidden;">
                {$summaryRows}
            </table>

            {$this->sectionLabel('What happens next')}
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 30px;">
                {$this->stepRow('1', "I'll review your brief", "I'll look through your goals, requirements and selected plan.")}
                {$this->stepRow('2', "You'll hear from me soon", "I'll reply personally within one business day.")}
                {$this->stepRow('3', "We'll plan the right approach", "We'll confirm the scope, timeline and a clear fixed quote.")}
            </table>

            <div style="margin:0 0 28px;padding:18px 20px;border-radius:14px;background:#f3f8df;color:#30351f;font-family:Arial,sans-serif;font-size:14px;line-height:1.6;">
                Want to add something? Simply reply to this email and it will be attached to your conversation.
            </div>

            {$this->actionButton($replyHref, 'Add project details')}
        HTML;

        return $this->emailShell(
            "Your Norda enquiry #{$id} has arrived safely.",
            'Enquiry received',
            "Thanks, {$name} &mdash; it&rsquo;s in.",
            "Reference #{$id}",
            $content
        );
    }

    private function emailShell(
        string $preheader,
        string $eyebrow,
        string $title,
        string $reference,
        string $content
    ): string {
        return <<<HTML
            <!doctype html>
            <html lang="en">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <meta name="color-scheme" content="light">
                <title>{$eyebrow}</title>
            </head>
            <body style="margin:0;padding:0;background:#f7f5f2;">
                <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">{$preheader}</div>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;background:#f7f5f2;">
                    <tr>
                        <td align="center" style="padding:32px 14px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;max-width:640px;border:1px solid #e7e3de;border-radius:24px;border-collapse:separate;overflow:hidden;background:#ffffff;box-shadow:0 16px 48px rgba(17,17,17,.08);">
                                <tr>
                                    <td style="padding:34px 36px;background:#111111;">
                                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td style="color:#ffffff;font-family:Arial,sans-serif;font-size:22px;font-weight:800;letter-spacing:-.5px;">Norda<span style="color:#c7f000;">.</span></td>
                                                <td align="right" style="color:#bdbdbd;font-family:Arial,sans-serif;font-size:12px;">{$reference}</td>
                                            </tr>
                                        </table>
                                        <p style="margin:34px 0 10px;color:#ff78b0;font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;">{$eyebrow}</p>
                                        <h1 style="margin:0;max-width:500px;color:#ffffff;font-family:Arial,sans-serif;font-size:32px;line-height:1.15;letter-spacing:-1px;">{$title}</h1>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:34px 36px 38px;">{$content}</td>
                                </tr>
                                <tr>
                                    <td style="padding:22px 36px;border-top:1px solid #ece8e2;background:#faf9f7;color:#77736d;font-family:Arial,sans-serif;font-size:12px;line-height:1.6;">
                                        Norda &middot; Independent web design and development<br>
                                        This email relates to an enquiry submitted through the Norda website.
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
        HTML;
    }

    private function detailRow(string $label, mixed $value): string
    {
        $safeLabel = $this->escape($label);
        $safeValue = $this->escape($value);

        return <<<HTML
            <tr>
                <td width="38%" style="padding:14px 16px;border-bottom:1px solid #ece8e2;background:#faf9f7;color:#77736d;font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;">{$safeLabel}</td>
                <td style="padding:14px 16px;border-bottom:1px solid #ece8e2;color:#171717;font-family:Arial,sans-serif;font-size:14px;font-weight:600;line-height:1.45;">{$safeValue}</td>
            </tr>
        HTML;
    }

    private function sectionLabel(string $label): string
    {
        $safeLabel = $this->escape($label);

        return <<<HTML
            <p style="margin:0 0 10px;color:#77736d;font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.3px;text-transform:uppercase;">{$safeLabel}</p>
        HTML;
    }

    private function stepRow(string $number, string $title, string $description): string
    {
        $safeNumber = $this->escape($number);
        $safeTitle = $this->escape($title);
        $safeDescription = $this->escape($description);

        return <<<HTML
            <tr>
                <td width="48" valign="top" style="padding:0 12px 18px 0;">
                    <div style="width:34px;height:34px;border-radius:50%;background:#c7f000;color:#111111;font-family:Arial,sans-serif;font-size:14px;font-weight:800;line-height:34px;text-align:center;">{$safeNumber}</div>
                </td>
                <td valign="top" style="padding:0 0 18px;">
                    <p style="margin:0 0 3px;color:#171717;font-family:Arial,sans-serif;font-size:15px;font-weight:700;line-height:1.4;">{$safeTitle}</p>
                    <p style="margin:0;color:#676767;font-family:Arial,sans-serif;font-size:14px;line-height:1.55;">{$safeDescription}</p>
                </td>
            </tr>
        HTML;
    }

    private function actionButton(string $href, string $label): string
    {
        $safeLabel = $this->escape($label);

        return <<<HTML
            <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                    <td style="border-radius:999px;background:#111111;">
                        <a href="{$href}" style="display:inline-block;padding:14px 22px;color:#ffffff;font-family:Arial,sans-serif;font-size:14px;font-weight:700;line-height:1;text-decoration:none;">{$safeLabel} &nbsp;&#8594;</a>
                    </td>
                </tr>
            </table>
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
