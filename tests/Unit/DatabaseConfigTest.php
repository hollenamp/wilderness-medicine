<?php

use Tests\TestCase;

uses(TestCase::class);

test('mysql connections use the pdo mysql ssl ca attribute', function () {
    $deprecations = [];

    set_error_handler(function (int $severity, string $message) use (&$deprecations): bool {
        if ($severity === E_DEPRECATED && str_contains($message, 'MYSQL_ATTR_SSL_CA')) {
            $deprecations[] = $message;

            return true;
        }

        return false;
    }, E_DEPRECATED);

    try {
        $config = require config_path('database.php');
    } finally {
        restore_error_handler();
    }

    $source = file_get_contents(config_path('database.php'));

    expect($deprecations)->toBeEmpty()
        ->and($source)->toContain('Mysql::ATTR_SSL_CA')
        ->and($source)->not->toContain('PDO::MYSQL_ATTR_SSL_CA')
        ->and($config['connections']['mysql']['options'])->toBeArray()
        ->and($config['connections']['mariadb']['options'])->toBeArray();
});
