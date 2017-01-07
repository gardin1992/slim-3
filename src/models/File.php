<?php

namespace Src\Models;

class File extends AbstractDao {

	public function __construct($db) {

		parent::__construct($db);
		$this->_table = 'files';
		$this->_fields = ['name', 'file'];

	}


}