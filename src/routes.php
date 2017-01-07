<?php

use Src\Helpers;
use Src\Models;

// Routes
$app->get('/', function ($request, $response, $args) {

    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");
    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);

});

$app->get('/require', function ($request, $response, $args) {

    // Render index view
    return $this->renderer->render($response, 'require.phtml', $args);

});

$app->get('/upload', function ($req, $res) {

	$sth = $this->db->query('select * from files');
	$sth->execute();

	$data = $sth->fetchAll();

	// $this->response
	return $res->withJson([
		'success' => true,
		'data' => $data
	]);

});

$app->post('/upload', function ($req, $res) {

    $data = [];

    if (!isset($_FILES['multiple']))
        return $res->withJson([
            'success' => false,
            'err' => 'Nenhum arquivo enviado'
        ]);

    $files = Helpers\UploadFile::getFiles($_FILES['multiple']);
    // /array_push($files, Helpers\UploadFile::getFiles($_FILES['simple']));

    $model = new Models\File($this->db);

    foreach ($files as $key => $value) {
        # code...
        $props = [
            'name' => $value->getName(),
            'file' => $value->getFile()
        ];

        $file = $model->create($props);
        array_push($data, $file);

    }

    return $res->withJson([
        'success' => true,
        'data'    => $data
    ]);

});
