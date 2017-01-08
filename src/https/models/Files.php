<?php

namespace Src\Https\Models;

class Files {

	private $_tmp_name;
	private $_size;
	private $_type;
	private $_name;
	private $_path = BASE_PATH . 'uploads';

	public function __construct($file) {

		if (isset($file['name']) && isset($file['name'][0]) ) {

			$this->_tmp_name = $file['tmp_name'][0];
			$this->_size 	= $file['size'][0];
			$this->_type 	= $file['type'][0];
			$this->_name 	= $file['name'][0];

		} else {

			$this->_tmp_name = $file['tmp_name'];
			$this->_size 	= $file['size'];
			$this->_type 	= $file['type'];
			$this->_name 	= $file['name'];

		}

	}

	public function _getPath() {

		return $this->_path . '/' . $this->_name . '.' . $this->_type;

	}

	public function getFile() {

		if ( $this->getTmpName() != "none" ) {
			
			$fp = fopen($this->getTmpName(), "rb");
		    $file = fread($fp, $this->getSize());
		    $file = addslashes($file);
		    fclose($fp);

		}

	  	return $file;

	}

	public function getTmpName() {
		
		return $this->_tmp_name;

	}

	public function getSize() {

		return $this->_size;

	}

	public function getType() {

		return $this->_type;

	}

	public function getName() {
		return $this->_name;

	}

	public function setTmpName($tmpName) {

		$this->_tmp_name = $tmpName;

	}

	public function setSize($size) {

		$this->_size = $size;

	}

	public function setType($type) {

		$this->_type = $type;

	}

	public function setName($name) {

		$this->_name = $name;

	}

}