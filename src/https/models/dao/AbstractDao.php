<?php

namespace Src\Https\Models\Dao;

class AbstractDao {

	protected $_db;

	protected $_table = '';
	protected $_fields = [];

	public function __construct($db) {

		$this->_db = $db;

	}

	public function getById($id) {

		$sql = "SELECT * FROM $this->_table WHERE id=:id";
		$sth = $this->_db->query($slq);
	    $sth->bindParam('id', $id);
	    $sth->execute();

	    return $sth->fetchObject();

	}

	public function getAll() {

		$sql = "SELECT * FROM $this->_table";
		$sth = $this->_db->query($sql);
	    $sth->execute();

	    return $sth->fetchAll();

	}

	public function save($values = [], $id = null) {

		if (empty($id))
			$this->insert($values);

		else
			$this->update($id, $values);

	}

	public function delete($id) {

		$sql = "DELETE FROM $this->table WHERE id=:id";

		$sth = $this->_db->prepare($sql);
		$sth->bindParam('id', $id);
		$sth->execute();

		return $sth->fetchAll();

	}

	private function insert($values) {

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

	private function update($id, $values) {

		$sql = "UPDATE $this->_table SET "
			. "(" . implode(", ", $this->_fieldsToStr()) . ") "
			. 'WHERE id=:id';

		$sth = $this->_db->prepare($sql);
		$sth->bindParam('id', $id);

		for ($x = 0; $x < count($this->_fields); $x++) {
			$sth->bindParam($this->_fields[$x], $values[$this->_fields[$x]]);
		}

        $sth->execute();

        return $id;

	}

	/* Methods */

	private function _fieldsToStr($before = '', $after = '') {

		$fields = [];

		foreach ($this->_fields as $value) {
			# code...
			array_push($fields, $before . $value . $after);

		}

		return $fields;

	}

}