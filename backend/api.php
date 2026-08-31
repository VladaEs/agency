<?php

$filename = __DIR__ . preg_replace('#(\?.*)$#', '', $_SERVER['REQUEST_URI']);
if (PHP_SAPI === 'cli-server' && is_file($filename)) {
    return false;
}

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/helpers/Environment.php';
require_once __DIR__ . '/helpers/Database.php';
require_once __DIR__ . '/helpers/MailService.php';
require_once __DIR__ . '/helpers/Router.php';
require_once __DIR__ . '/Controllers/apiHandler.php';

Environment::load(__DIR__ . '/.env');


$router = new \Bramus\Router\Router();
$router->setBasePath('/');
$handler = new ApiHandler($router);

$router->get('/api/health', [$handler, 'health']);
$router->get('/api/plans', [$handler, 'getPlans']);
$router->post('/api/enquiries', [$handler, 'createEnquiry']);

$router->set404(function () use ($router) {
    $router->returnJson(['error' => 'Route not found.'], 404);
});

$router->run();
