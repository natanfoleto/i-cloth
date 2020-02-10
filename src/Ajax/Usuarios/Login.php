<?php

require "../../../config.php";

use app\Controllers\CUsuario;

$object = array(
	"cpf" => filter_input(INPUT_POST, 'txtCPF', FILTER_SANITIZE_STRING),
	"senha" => filter_input(INPUT_POST, 'txtSenha', FILTER_SANITIZE_STRING),
);

$usuario = new CUsuario;

$result = $usuario->GetLogin($object);

if (!$result) {
	echo 404;
} else {
	echo json_encode($result);
	// $session->CreateSession('Login', $result['nome']);
}