<?php

namespace Src\Https\Controllers;

class Controller {

	protected static $_instance;
	protected $_db;
	protected $_dao;

	private function __construct() {
	}
	
	public static function getInstance() {

		if (empty(self::$_instance))
			self::$_instance = new UploadController();

		return self::$_instance;

	}

	public function setDb($db) {

		$this->_db = $db;
		
	}

}