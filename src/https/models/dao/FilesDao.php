<?php

namespace Src\Https\Models\Dao;

class FilesDao  extends AbstractDao {

	public function __construct($db) {

		parent::__construct($db);
		$this->_table = 'files';
		$this->_fields = ['name', 'file', 'type'];

	}

}