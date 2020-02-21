<?php

require "../../../config.php";

use app\Controllers\CSessions;

$session = new CSessions;

$result = $session->GetSession('Login');

if (!$result) {
	echo 404;
} else {
	echo json_encode($result);
}