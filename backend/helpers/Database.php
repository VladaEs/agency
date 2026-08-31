<?php

final class Database
{
    private static ?PDO $connection = null;

    public static function connection(): PDO
    {
        if (self::$connection instanceof PDO) {
            return self::$connection;
        }

        $host = self::required('DATABASE_HOST');
        $port = self::required('DATABASE_PORT');
        $database = self::required('DATABASE_NAME');
        $username = self::required('DATABASE_USER');
        $password = self::required('DATABASE_PASSWORD');

        $dsn = "mysql:host={$host};port={$port};dbname={$database};charset=utf8mb4";

        self::$connection = new PDO($dsn, $username, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);

        return self::$connection;
    }

    private static function required(string $name): string
    {
        $value = Environment::get($name);

        if ($value === null || $value === '') {
            throw new RuntimeException("Missing required environment variable: {$name}");
        }

        return $value;
    }
}

