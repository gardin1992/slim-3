<?php

use Src\Helpers\Debug;
use Src\Helpers\UploadFile;
use Src\Https\Models\Files;
use Src\Https\Models\Dao\FilesDao;

$app->options('/upload', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// Routes
// / - home
$app->get('/', function ($request, $response, $args) {

    return $this->renderer->render($response, 'index.phtml', $args);

});

$app->get('/stream', function ($req, $res, $args) {

    return $this->renderer->render($res, 'indexstream.phtml', $args);

});

$app->get('/file/stream', function ($req, $res, $args) {

    \Src\Helpers\Stream::getVideo();

});

// Crud Upload
$app->get('/upload[/{id}]', function ($req, $res, $args) {

    $controller = \Src\Https\Controllers\UploadController::getInstance();
    $controller->setDb($this->db);

    return $res->withJson($controller->get($req, $res, $args));

});

// insert
$app->post('/upload', function ($req, $res) {

    $controller = \Src\Https\Controllers\UploadController::getInstance();
    $controller->setDb($this->db);
    $controller->post($req, $res);

});

$app->delete('/upload/[{id}]', function($req, $res, $args) {

	$controller = \Src\Https\Controllers\UploadController::getInstance();
    $controller->setDb($this->db);
    $controller->delete($req, $res, $args);

    return $res->withJson([
    	'success' => true,
    	'data' => 'Success. Delete id '. $args['id']
    ]);

});
