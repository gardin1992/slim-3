<?php

namespace Src\Helpers;

class Debug {

	/**
	 * Printa o array/objeto passado como parametro
	**/
	public function dump($value) {

		echo '<pre>';
		print_r($value);
		echo '</pre>';

	}

}