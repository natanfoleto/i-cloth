<?php

namespace app\Models;

class OGrupoUsuario {

    public $idGrupoUsuario;
    public $Nome;
    public $Ativo;
    public $Obs;
    public $usuAdd;
    public $DataHoraAdd;
    public $UsuEdt;
    public $DataHoraEdt;

    public function __set($atribute, $value) {
        $this->$atribute = $value;
    }

    public function __get($atribute)
    {
        return $this->$atribute;
    }
}

?>