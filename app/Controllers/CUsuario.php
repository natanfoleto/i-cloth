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

        $Query = $this->Conn->GetConnection()->prepare("SELECT * FROM {$this->table} WHERE cpf = :cpf AND senha = :senha AND inativo <> 'S'");
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

    // public function GetAll() {
    //     try {
    //         $Query = $this->Conn->GetConnection()->prepare("SELECT * FROM `usuario`;");
    //         $Query->execute();
    //         return $Query->fetchAll();
    //     } catch(PDOException $ex) {
    //         return 'Erro: '.$ex->getMessage();
    //     }
    // }

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

    // public function QueryUpdate($Object) {
    //     try {
    //         $this->ObjUsuario->idUsuario = $this->ObjFunc->Base64($Object['idUsuario'], 2);
    //         $this->ObjUsuario->Nome = $this->ObjFunc->TratarCaracter($Object['nome'], 1);
    //         $this->ObjUsuario->Email = $Object['email'];
    //         $this->ObjUsuario->Ativo = $Object['ativo'];
    //         $this->ObjUsuario->GrupoUsuario = $Object['grupoUsuario'];

    //         $Query = $this->Conn->GetConnection()->prepare("UPDATE `usuarios` SET  `nome` = :Nome, `email` = :Email, `ativo` = :Ativo, `GrupoUsuario` = :grupoUsuario WHERE `idUsuario` = :IdUsuario;");
    //         $Query->bindParam(":IdUsuario", $this->ObjUsuario->idUsuairo, PDO::PARAM_INT);
    //         $Query->bindParam(":Nome", $this->ObjUsuario->Nome, PDO::PARAM_STR);
    //         $Query->bindParam(":Email", $this->ObjUsuario->Email, PDO::PARAM_STR);
    //         $Query->bindParam(":Ativo", $this->ObjUsuario->Ativo, PDO::PARAM_STR);
    //         $Query->bindParam(":GrupoUsuario", $this->ObjUsuario->GrupoUsuario, PDO::PARAM_INT);

    //         if($Query->execute()) {
    //             return 'OK';
    //         } else {
    //             return 'ERRO';
    //         }
    //     } catch(PDOException $ex) {
    //         return 'Erro: '.$ex->getMessage();
    //     }
    // }

    // public function QueryDelete($Id) {
    //     try {
    //         $this->ObjUsuario->idUsuario = $this->ObjFunc->Base64($Id, 2);

    //         $Query = $this->Conn->GetConnection()->prepare("DELETE FROM `usuarios` WHERE `idUsuario` = :Id;");
    //         $Query->bindParam(":Id", $this->ObjUsuario->idUsuario, PDO::PARAM_INT);

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