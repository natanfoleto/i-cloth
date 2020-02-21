<?php 

namespace app\Controllers;
session_start();

class CSessions {

    public function CreateSession($name, $value) {
		$_SESSION[$name] = $value;
    }

    public function DestroySession($name) {
        unset($_SESSION[$name]);
    }
    
    public function GetSession($name) {
        return $_SESSION[$name];
    }
}