<?php

namespace app\Models;

class OUsuario {

    public $idUsuario;
    public $Nome;
    public $DataNascimento;
    public $CPF;
    public $Celular;
    public $Email;
    public $Senha;
    public $grupoUsuario;
    public $Inativo;
    public $usuAdd;
    public $DataHoraAdd;
    public $UsuEdt;
    public $DataHoraEdt;
    public $AlterarSenha;


    public function __set($atribute, $value) {
        $this->$atribute = $value;
    }

    public function __get($atribute)
    {
        return $this->$atribute;
    }
}
?>