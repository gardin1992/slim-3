<?php

namespace Src\Helpers;

use Src\Helpers\Debug;
use Src\Https\Models\Files;

class UploadFile {

	public static function getFile($file) {

		return new Files($file);

	}

	/**
	 * retorna sempre um array de arquivos ou um array vazio.
	**/
	public static function getFiles($files) {

		$index = ['tmp_name', 'name', 'type', 'error', 'size'];

		$data = [];

		for ($x = 0; $x < count($files['tmp_name']); $x++) {

			$file = [];

			foreach ($index as $value) {

				$file[$value] = $files[$value][$x];

			}

			array_push($data, new Files($file));

		} 
	
		return $data;

	}

}
