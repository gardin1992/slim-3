<?php

namespace Src\Helpers;


use Src\Helpers\Debug;
use Src\Https\Models\Files;

class UploadFile {

	/**
	 * retorna sempre um array de arquivos ou um array vazio.
	**/
	public static function getFiles($files) {

		$data = [];

		$index = ['tmp_name', 'name', 'type', 'error', 'size'];
		$numFile = count($files['name']);

		if ($numFile) {

			array_push($data, new Files($files));

		} else {

			for ($x = 0; $x < $numFile; $x++) {

				$file = []; 
				foreach ($index as $value) {

					$file[$value] = $files[$value][$x];

				}

				array_push($data, new Files($file));

			}
			
		}
	
		return $data;

	}

}
