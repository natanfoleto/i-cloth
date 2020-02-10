<?php

require "../../../../config.php";

use app\Models\MUsuarios;

$nome = filter_input(INPUT_POST, 'nome', FILTER_SANITIZE_STRING);

$usuario = new MUsuarios;
$result = $usuario->GetUnique($nome);

if (!$result || empty($nome)) {
	echo 'nouser';
} else {
	echo json_encode($result);
}