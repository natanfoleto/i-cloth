<?php

namespace app\Controllers;

use app\DataModules\Connection;
use app\Models\OUsuario;
use app\Features\FuncoesBase;

use PDO;

class CUsuario {

    protected $table = 'usuarios';
    private $Conn;
    private $ObjUsuario;
    private $ObjFunc;

    public function __construct() {
        $this->Conn = new Connection();
        $this->ObjUsuario = new OUsuario();
        $this->ObjFunc = new FuncoesBase();
    }

    public function GetLogin($Object) {
        $this->ObjUsuario->CPF = $Object['cpf'];
        $this->ObjUsuario->Senha = $Object['senha'];

        $Query = $this->Conn->GetConnection()->prepare("SELECT * FROM {$this->table} WHERE cpf = :cpf AND senha = :senha AND ativo <> 'N'");
        $Query->bindParam(":cpf", $this->ObjUsuario->CPF, PDO::PARAM_STR);
        $Query->bindParam(":senha", $this->ObjUsuario->Senha, PDO::PARAM_STR);
        $Query->execute();
        return $Query->fetch();
    }

    public function GetUser($Object) {
        $this->ObjUsuario->Nome = $Object['nome'];

        $Query = $this->Conn->GetConnection()->prepare("SELECT * FROM {$this->table} WHERE nome LIKE ? ORDER BY nome DESC");
        $Query->bindValue(1, '%' . $this->ObjUsuario->Nome . '%');
        $Query->execute();
        return $Query->fetchAll();
    }
    
    public function InsertUser($Object) {
        $this->ObjUsuario->Nome = $Object['nome'];
        $this->ObjUsuario->DataNascimento = $Object['dataNascimento'];
        $this->ObjUsuario->CPF = $Object['cpf'];
        $this->ObjUsuario->Celular = $Object['celular'];
        $this->ObjUsuario->Email = $Object['email'];
        $this->ObjUsuario->Senha = $Object['senha'];
        $this->ObjUsuario->GrupoUsuario = $Object['grupoUsuario'];
        $this->ObjUsuario->Ativo = $Object['ativo'];
        $this->ObjUsuario->usuAdd = $Object['usuAdd'];
        $this->ObjUsuario->DataHoraAdd = $this->ObjFunc->DataAtual(2);
        $this->ObjUsuario->UsuEdt = $Object['usuEdt'];
        $this->ObjUsuario->DataHoraEdt = $this->ObjFunc->DataAtual(2);

        $Query = $this->Conn->GetConnection()->prepare("INSERT INTO {$this->table} (`nome`, `dataNascimento`, `cpf`, `celular`, 
            `email`, `senha`, `grupoUsuario`, `ativo`, `usuAdd`, `dataHoraAdd`, `usuEdt`, `dataHoraEdt` ) VALUES 
            (:nome, :dataNascimento, :cpf, :celular, :email, :senha, :grupoUsuario, :ativo, :usuAdd, :dataHoraAdd, 
            :usuEdt, :dataHoraEdt);");

        $Query->bindParam(":nome", $this->ObjUsuario->Nome, PDO::PARAM_STR);
        $Query->bindParam(":dataNascimento", $this->ObjUsuario->DataNascimento, PDO::PARAM_STR);
        $Query->bindParam(":cpf", $this->ObjUsuario->CPF, PDO::PARAM_STR);
        $Query->bindParam(":celular", $this->ObjUsuario->Celular, PDO::PARAM_STR);
        $Query->bindParam(":email", $this->ObjUsuario->Email, PDO::PARAM_STR);
        $Query->bindParam(":senha", $this->ObjUsuario->Senha, PDO::PARAM_STR);
        $Query->bindParam(":grupoUsuario", $this->ObjUsuario->GrupoUsuario, PDO::PARAM_INT);
        $Query->bindParam(":ativo", $this->ObjUsuario->Ativo, PDO::PARAM_STR);
        $Query->bindParam(":usuAdd", $this->ObjUsuario->UsuEdt, PDO::PARAM_INT);
        $Query->bindParam(":dataHoraAdd", $this->ObjUsuario->DataHoraEdt, PDO::PARAM_STR);
        $Query->bindParam(":usuEdt", $this->ObjUsuario->UsuEdt, PDO::PARAM_INT);
        $Query->bindParam(":dataHoraEdt", $this->ObjUsuario->DataHoraEdt, PDO::PARAM_STR);

        if($Query->execute()) {
            return "InsertTrue";
        } else {
            return false;
        }
    }

    public function UpdateUser($Object) {
        $this->ObjUsuario->idUsuario = $Object['idUsuario'];
        $this->ObjUsuario->Nome = $Object['nome'];
        $this->ObjUsuario->DataNascimento = $Object['dataNascimento'];
        $this->ObjUsuario->CPF = $Object['cpf'];
        $this->ObjUsuario->Celular = $Object['celular'];
        $this->ObjUsuario->Email = $Object['email'];
        $this->ObjUsuario->Senha = $Object['senha'];
        $this->ObjUsuario->GrupoUsuario = $Object['grupoUsuario'];
        $this->ObjUsuario->Ativo = $Object['ativo'];
        $this->ObjUsuario->UsuEdt = $Object['usuEdt'];
        $this->ObjUsuario->DataHoraEdt = $this->ObjFunc->DataAtual(2);
        
        $Query = $this->Conn->GetConnection()->prepare("UPDATE {$this->table} SET `nome` = :nome, 
            `dataNascimento` = :dataNascimento, `cpf` = :cpf, `celular` = :celular, `email` = :email,
            `senha` = :senha, `grupoUsuario` = :grupoUsuario, `ativo` = :ativo, `usuEdt` = :usuEdt,
            `dataHoraEdt` = :dataHoraEdt WHERE `idUsuario` = :idUsuario;");

        $Query->bindParam(":idUsuario", $this->ObjUsuario->idUsuario, PDO::PARAM_INT);
        $Query->bindParam(":nome", $this->ObjUsuario->Nome, PDO::PARAM_STR);
        $Query->bindParam(":dataNascimento", $this->ObjUsuario->DataNascimento, PDO::PARAM_STR);
        $Query->bindParam(":cpf", $this->ObjUsuario->CPF, PDO::PARAM_STR);
        $Query->bindParam(":celular", $this->ObjUsuario->Celular, PDO::PARAM_STR);
        $Query->bindParam(":email", $this->ObjUsuario->Email, PDO::PARAM_STR);
        $Query->bindParam(":senha", $this->ObjUsuario->Senha, PDO::PARAM_STR);
        $Query->bindParam(":grupoUsuario", $this->ObjUsuario->GrupoUsuario, PDO::PARAM_INT);
        $Query->bindParam(":ativo", $this->ObjUsuario->Ativo, PDO::PARAM_STR);
        $Query->bindParam(":usuEdt", $this->ObjUsuario->UsuEdt, PDO::PARAM_INT);
        $Query->bindParam(":dataHoraEdt", $this->ObjUsuario->DataHoraEdt, PDO::PARAM_STR);

        if($Query->execute()) {
            return "UpdateTrue";
        } else {
            return false;
        }
    }

    // public function QueryInsert($Object) { 
    //     try {
    //         $this->ObjUsuario->Nome = $this->ObjFunc->TratarCaracter($Object['usuario'], 1);
    //         $this->ObjUsuario->Email = $Object['email'];
    //         $this->ObjUsuario->Senha = sha1($Object['senha']);
    //         $this->ObjUsuario->GrupoUsuario = $Object['grupoUsuario'];
    //         $this->ObjUsuario->DataHoraAdd = $this->ObjFunc->DataAtual(2);

    //         $Query = $this->Conn->GetConnection()->prepare("INSERT INTO `usuarios` (`nome`, `email`, `senha`, `grupoUsuario`, `dataHoraAdd`) VALUES (:Nome, :Email, :Senha, :GrupoUsuario, :DataHoraAdd);");
    //         $Query->bindParam(":Nome", $this->ObjUsuario->Nome, PDO::PARAM_STR);
    //         $Query->bindParam(":Email", $this->ObjUsuario->Email, PDO::PARAM_STR);
    //         $Query->bindParam(":Senha", $this->ObjUsuario->Senha, PDO::PARAM_STR);
    //         $Query->bindParam(":GrupoUsuario", $this->ObjUsuario->GrupoUsuario, PDO::PARAM_INT);
    //         $Query->bindParam(":DataHoraAdd", $this->ObjUsuario->DataHoraAdd, PDO::PARAM_STR);

    //         if($Query->execute()) {
    //             return 'OK';
    //         } else {
    //             return 'ERRO';
    //         }
    //     } catch(PDOException $ex) {
    //         return 'Erro: '.$ex->getMessage();
    //     }
    // }   
}

?>