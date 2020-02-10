<?php 

namespace app\Models;
session_start();

class MSessions {

    public function CreateSession($name, $value) {
		$_SESSION[$name] = $value;
    }

    public function DestroySession($name) {
        unset($_SESSION[$name]);
    }
    
    public function GetSession($name) {
        echo $_SESSION[$name];
    }
}