<?php

require "../../../../config.php";

use app\Models\MUsuarios;

$nome = filter_input(INPUT_POST, 'nome', FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_STRING);
$senha = filter_input(INPUT_POST, 'senha', FILTER_SANITIZE_STRING);

$usuario = new MUsuarios;
$result = $usuario->Save($nome, $email, $senha);

if ($result) {
	echo 'done';
} else {
	echo 'erro';
}