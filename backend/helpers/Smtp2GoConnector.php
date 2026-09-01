<?php

use SMTP2GO\ApiClient;
use SMTP2GO\Contracts\BuildsRequest;

final class Smtp2GoConnector implements EmailConnector
{
    private ApiClient $client;

    public function __construct(?ApiClient $client = null)
    {
        $this->client = $client ?? new ApiClient($this->required('SMTP2GO_API_KEY'));

        $region = strtolower(trim(Environment::get('SMTP2GO_API_REGION', '')));

        if ($region !== '') {
            $this->client->setApiRegion($region);
        }

        $this->client->setMaxSendAttempts(
            $this->integerSetting('SMTP2GO_MAX_SEND_ATTEMPTS', 3, 1, 5)
        );
        $this->client->setTimeout(
            $this->integerSetting('SMTP2GO_TIMEOUT_SECONDS', 20, 1, 120)
        );
        $this->client->setTimeoutIncrement(
            $this->integerSetting('SMTP2GO_TIMEOUT_INCREMENT_SECONDS', 5, 0, 30)
        );
    }

    public function send(BuildsRequest $request): void
    {
        if (!$this->client->consume($request)) {
            throw new RuntimeException($this->failureMessage());
        }

        $body = $this->client->getResponseBody();
        $succeeded = is_object($body) && isset($body->data->succeeded)
            ? (int) $body->data->succeeded
            : null;

        if ($succeeded !== null && $succeeded < 1) {
            throw new RuntimeException($this->failureMessage('SMTP2GO did not queue the email.'));
        }
    }

    private function failureMessage(string $fallback = 'SMTP2GO request failed.'): string
    {
        $body = $this->client->getResponseBody();
        $status = $this->client->getLastResponseStatusCode();
        $error = null;
        $code = null;

        if (is_object($body) && isset($body->data) && is_object($body->data)) {
            $error = isset($body->data->error) ? trim((string) $body->data->error) : null;
            $code = isset($body->data->error_code) ? trim((string) $body->data->error_code) : null;
        }

        $details = [];

        if ($status !== null) {
            $details[] = "HTTP {$status}";
        }

        if ($code !== null && $code !== '') {
            $details[] = "code {$code}";
        }

        $message = $error !== null && $error !== '' ? $error : $fallback;

        return $details === []
            ? $message
            : $message . ' (' . implode(', ', $details) . ')';
    }

    private function integerSetting(
        string $name,
        int $default,
        int $minimum,
        int $maximum
    ): int {
        $rawValue = Environment::get($name, (string) $default);

        if (filter_var($rawValue, FILTER_VALIDATE_INT) === false) {
            throw new RuntimeException("{$name} must be an integer.");
        }

        $value = (int) $rawValue;

        if ($value < $minimum || $value > $maximum) {
            throw new RuntimeException("{$name} must be between {$minimum} and {$maximum}.");
        }

        return $value;
    }

    private function required(string $name): string
    {
        $value = Environment::get($name);

        if ($value === null || trim($value) === '') {
            throw new RuntimeException("Missing SMTP2GO setting: {$name}");
        }

        return trim($value);
    }
}
