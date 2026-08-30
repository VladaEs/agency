<?php 
    // In case one is using PHP 5.4's built-in server
    $filename = __DIR__ . preg_replace('#(\?.*)$#', '', $_SERVER['REQUEST_URI']);
if (php_sapi_name() === 'cli-server' && is_file($filename)) {
    return false;
}

    // Include the Router class
    // @note: it's recommended to just use the composer autoloader when working with other packages too
    require_once __DIR__ . './Router.php';
    require_once __DIR__ . './apiHandler.php';
    // Create a Router
    $router = new \Bramus\Router\Router();



       
    
    
    $router->set404(function () use ($router) {
        header($_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found');
        $router->returnJson(['error' => '404, route not found!'], 404);
    });

    

