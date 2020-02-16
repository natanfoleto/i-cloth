<?php

require "../../../config.php";

use app\Controllers\CUsuario;

$usuario = new CUsuario;

$object = array (
	"idUsuario" => filter_input(INPUT_POST, 'txtId', FILTER_SANITIZE_NUMBER_INT),
	"nome" => filter_input(INPUT_POST, 'txtNome', FILTER_SANITIZE_STRING),
	"dataNascimento" => filter_input(INPUT_POST, 'txtData', FILTER_SANITIZE_STRING),
	"cpf" => filter_input(INPUT_POST, 'txtCpf', FILTER_SANITIZE_STRING),
	"celular" => filter_input(INPUT_POST, 'txtCelular', FILTER_SANITIZE_STRING),
	"email" => filter_input(INPUT_POST, 'txtEmail', FILTER_SANITIZE_EMAIL),
	"senha" => filter_input(INPUT_POST, 'txtSenha', FILTER_SANITIZE_STRING),
	"grupoUsuario" => $_POST['txtGrupoUsuario'],	
	"ativo" => $_POST['txtAtivo'],
	"usuAdd" => 1,
	"usuEdt" => 1
);

if($_POST['txtId'] === "") {
	$result = $usuario->InsertUser($object);
} else {
	$result = $usuario->UpdateUser($object);
}

echo json_encode($result);