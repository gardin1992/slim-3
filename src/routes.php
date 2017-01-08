<?php

use Src\Helpers\Debug;
use Src\Helpers\UploadFile;
use Src\Https\Models\Files;
use Src\Https\Models\Dao\FilesDao;

// Routes
// / - home
$app->get('/', function ($request, $response, $args) {

    return $this->renderer->render($response, 'index.phtml', $args);

});

// api

$app->get('/api/files[/{id}]', function ($req, $res, $args) {

    $dao = new FilesDao($this->db);

    if (isset($args['id'])) {

        $data = $dao->getById($args['id']);

        $json = json_encode([
            'success' => true,
            'data' => [
                'name' => $data->name,
                'type' => $data->type,
                'file' => base64_encode($data->file)
            ]
        ]);

        return $res->withJson($json);

    } else {

        $data = $dao->getAll();

        for($x = 0; $x < count($data); $x++) {}

    }

    //echo '<video controls autoplay><source type="video/mp4" src="data:video/mp4;base64,' . $firstFile . '"></video>';
    //echo '<img src="data:image/jpeg;base64,'. base64_encode( $file['file'] ).'"/>';

    //var_dump($firstFile);
    

});

// Crud Upload
// /upload - index - get all
$app->get('/upload', function ($req, $res) {

    $dao = new FilesDao($this->db);
    $data = $dao->getAll();

    return $res->withJson([
		'success' => true,
		'data' => $data
	]);

});

// get by id
$app->get('/upload/[{id}]', function ($req, $res, $args) {
    
    $dao = new FilesDao($this->db);
    $data = $dao->getById($args['id']);

    // $this->response
    return $res->withJson([
        'success' => true,
        'data' => $data
    ]);

});

// insert
$app->post('/upload', function ($req, $res) {

    $data = [];

    if (!isset($_FILES['multiple']))
        return $res->withJson([
            'success' => false,
            'err' => 'Nenhum arquivo enviado'
        ]);

    $files = UploadFile::getFiles($_FILES['multiple']);
    // /array_push($files, Helpers\UploadFile::getFiles($_FILES['simple']));

    $dao = new FilesDao($this->db);

    foreach ($files as $key => $value) {

        # code...
        $props = [
            'name' => $value->getName(),
            'file' => $value->getFile(),
            'type' => $value->getType(),
        ];

        $file = $dao->save($props);
        array_push($data, $file);

    }

    return $res->withJson([
        'success' => true,
        'data'    => $data
    ]);

});
