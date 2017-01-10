<?php

namespace Src\Https\Controllers;

use Src\Https\Models\Dao\FilesDao;
use Src\Https\Models\Files;
use Src\Helpers\UploadFile;

class UploadController extends Controller {

	public function setDb($db) {

		$this->_db = $db;
	    $this->_dao = new FilesDao($this->_db);

	}

	public function delete($req = null, $res = null, $args = [])
	{

		return $this->_dao->delete($args['id']);

	}

	public function post($req = null, $res = null, $args = []) {

		$files = $this->_getFiles();

	    $data = [];

	    foreach ($files as $key => $value) {

	        # code...
	        $file = $this->_insertFile($value);
	        array_push($data, $file);

	    }

	    return [
	        'data'    => $data,
	        'amout' => count($data)
	    ];

	}

	public function get($req = null, $res = null, $args = []) {

	    $dao = new FilesDao($this->_db);

	    if (isset($args['id'])) {

	    	$data = $this->_dao->getById($args['id']);
	    	$data->file = base64_encode($data->file);

	    }
	    else {

	    	$data = $this->_dao->getAll();

	    	for ($x = 0; $x < count($data); $x++) {

	    		$data[$x]['file'] = base64_encode($data[$x]['file']);

	    	}

	    }

	    return [
	        'success' => true,
	        'amount' => isset($args['id']) ? 1 : count($data),
	        'data' => $data
	    ];

	}

	private function _getFiles() {

		$data = [];

	    if (isset($_FILES['multiple']))
	        $data = UploadFile::getFiles($_FILES['multiple']);

	    if (isset($_FILES['simple'])) {

	        $file = UploadFile::getFile($_FILES['simple']);
	        array_push($data, $file);

	    }

		return $data;

	}

	private function _insertFile($value) {

		$file = [
		  	'name' => $value->getName(),
		    'file' => $value->getFile(),
		    'type' => $value->getType(),
	    ];

	    $file['id'] = $this->_dao->save($file);
	    $file['file'] = '';

		return $file;	        

	}
}