<?php

namespace Src\Https\Models\Dao;

use Src\Helpers\Singleton;

class FilesDao  extends AbstractDao {

	public function __construct($db) {

		parent::__construct($db);
		$this->_table = 'files';
		$this->_fields = ['name', 'file', 'type'];

	}

}