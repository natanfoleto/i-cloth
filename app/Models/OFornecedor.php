<?php

namespace app\Models;

class OFornecedor {

    public $idFornecedor;
    public $razaoSocial;
    public $nomeFantasia;
    public $OcpfCnpj;
    public $endereco;
    public $numero;
    public $bairro;
    public $complemento;
    public $cidade;
    public $uf;
    public $cep;
    public $telefoneEmpresa;
    public $emailEmpresa;
    public $celularContato;
    public $nomeContato;
    public $emailContato;
    public $obs;
    public $usuAdd;
    public $dataHoraAdd;
    public $usuEdt;
    public $dataHoraEdt;
    public $ativo;
    


    public function __set($atribute, $value) {
        $this->$atribute = $value;
    }

    public function __get($atribute)
    {
        return $this->$atribute;
    }
}

?>