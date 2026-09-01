<?php

use SMTP2GO\Collections\Mail\AddressCollection;
use SMTP2GO\Service\Mail\Send as MailSend;
use SMTP2GO\Types\Mail\Address;
use SMTP2GO\Types\Mail\CustomHeader;

final class EmailSender
{
    private EmailConnector $connector;
    private Address $from;

    public function __construct(?EmailConnector $connector = null)
    {
        $this->connector = $connector ?? new Smtp2GoConnector();
        $this->from = new Address(
            $this->validEmail($this->required('SMTP_FROM_EMAIL'), 'SMTP_FROM_EMAIL'),
            $this->headerValue(Environment::get('SMTP_FROM_NAME', 'Norda'), 'SMTP_FROM_NAME')
        );
    }

    public function send(
        string $toEmail,
        string $subject,
        string $textBody,
        string $htmlBody,
        ?string $replyToEmail = null
    ): void {
        $recipient = new Address(
            $this->validEmail($toEmail, 'recipient email')
        );
        $message = new MailSend(
            $this->from,
            new AddressCollection([$recipient]),
            $this->headerValue($subject, 'email subject'),
            $htmlBody
        );

        $message->setHtmlBody($htmlBody);
        $message->setTextBody($textBody);

        if ($replyToEmail !== null && trim($replyToEmail) !== '') {
            $message->addCustomHeader(new CustomHeader(
                'Reply-To',
                $this->validEmail($replyToEmail, 'reply-to email')
            ));
        }

        $this->connector->send($message);
    }

    private function headerValue(?string $value, string $setting): string
    {
        $value = trim((string) $value);

        if ($value === '') {
            throw new RuntimeException("{$setting} cannot be empty.");
        }

        if (str_contains($value, "\r") || str_contains($value, "\n")) {
            throw new RuntimeException("{$setting} cannot contain line breaks.");
        }

        return $value;
    }

    private function required(string $name): string
    {
        $value = Environment::get($name);

        if ($value === null || trim($value) === '') {
            throw new RuntimeException("Missing email setting: {$name}");
        }

        return trim($value);
    }

    private function validEmail(string $email, string $setting): string
    {
        $email = trim($email);

        if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
            throw new RuntimeException("{$setting} must contain a valid email address.");
        }

        return $email;
    }
}
