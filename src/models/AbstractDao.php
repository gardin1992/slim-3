<?php

namespace Src\Models;

class AbstractDao {

	protected $_table = '';
	protected $_fields = [];
	protected $_db = [];

	public function __construct($db) {

		$this->_db = $db;

	}

	private function _fieldsToStr($before = '', $after = '') {

		$fields = [];

		foreach ($this->_fields as $value) {
			# code...
			array_push($fields, $before . $value . $after);

		}

		return $fields;

	}

	public function create($values) {

		$sql = "INSERT INTO $this->_table "
			. "(" . implode(", ", $this->_fieldsToStr()) . ") VALUES "
			. "(" . implode(", ", $this->_fieldsToStr(':') ) . ")";

		$sth = $this->_db->prepare($sql);

		for ($x = 0; $x < count($this->_fields); $x++) {

			$sth->bindParam($this->_fields[$x], $values[$this->_fields[$x]]);

		}

        $sth->execute();

        return $this->_db->lastInsertId();

	}

	public function save() {


	}

	public function delete() {



	}

	private function insert() {


	}

	private function update() {



	}


}