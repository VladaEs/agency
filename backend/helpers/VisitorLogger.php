<?php

final class VisitorLogger
{
    public function log(): bool
    {
        $ipAddress = $this->clientIp();
        $retentionDays = $this->integerSetting(
            'VISITOR_LOG_RETENTION_DAYS',
            30,
            1,
            365
        );
        $deduplicationMinutes = $this->integerSetting(
            'VISITOR_LOG_DEDUPLICATION_MINUTES',
            30,
            1,
            1440
        );

        $now = new DateTimeImmutable('now', new DateTimeZone('UTC'));
        $bucketSeconds = $deduplicationMinutes * 60;
        $visitBucket = intdiv($now->getTimestamp(), $bucketSeconds);
        $expiresAt = $now->modify("+{$retentionDays} days");

        $connection = Database::connection();
        $this->deleteExpiredRecords($connection);

        $statement = $connection->prepare(
            'INSERT INTO visitor_visits (
                vv_ip,
                vv_visit_bucket,
                vv_visited_at,
                vv_expires_at
            ) VALUES (
                INET6_ATON(:ip_address),
                :visit_bucket,
                :visited_at,
                :expires_at
            )
            ON DUPLICATE KEY UPDATE vv_id = vv_id'
        );
        $statement->execute([
            'ip_address' => $ipAddress,
            'visit_bucket' => $visitBucket,
            'visited_at' => $now->format('Y-m-d H:i:s'),
            'expires_at' => $expiresAt->format('Y-m-d H:i:s'),
        ]);

        $inserted = $statement->rowCount() === 1;

        return $inserted;
    }

    private function clientIp(): string
    {
        $ipAddress = trim((string) ($_SERVER['REMOTE_ADDR'] ?? ''));

        if (filter_var($ipAddress, FILTER_VALIDATE_IP) === false) {
            throw new RuntimeException('Unable to determine the visitor IP address.');
        }

        return $ipAddress;
    }

    private function deleteExpiredRecords(PDO $connection): void
    {
        $connection->exec(
            'DELETE FROM visitor_visits
             WHERE vv_expires_at < UTC_TIMESTAMP()
             LIMIT 500'
        );
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
}
