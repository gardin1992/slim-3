<?php

namespace Src\Helpers;

class Helper {

	/**
	 * Printa o array/objeto passado como parametro
	**/
	public function debug($value) {

		echo '<pre>';
		print_r($value);
		echo '</pre>';

	}

}