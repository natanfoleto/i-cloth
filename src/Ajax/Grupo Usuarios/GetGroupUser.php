<?php

require "../../../config.php";

use app\Controllers\CGrupoUsuario;

$grupoUsuario = new CGrupoUsuario;

$object = array (
	"nome" => filter_input(INPUT_POST, 'txtNome', FILTER_SANITIZE_STRING),
);

$result = $grupoUsuario->GetGroupUser($object);

if (!$result) {
	echo 404;
} else {
	echo json_encode($result);
}