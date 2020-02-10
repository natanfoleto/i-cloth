<?php

namespace app\DataModules;

use PDO;

class Connection {

	public static function GetConnection() {
		$pdo = new PDO("mysql:host=localhost;dbname=icloth", "root", "143010");
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
        
        return $pdo;
    }

}

?>