<?php

require "../../../config.php";

use app\Controllers\CSessions;

$session = new CSessions;

$result = $session->DestroySession('Login');

echo json_encode($result);
