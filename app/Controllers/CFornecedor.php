<?php

namespace app\Controllers;

use app\DataModules\Connection;
use app\Models\OFornecedor;
use app\Features\FuncoesBase;

use PDO;

Class CFornecedor {

    protected $table = 'fornecedor';
    private $Conn;
    private $ObjFornecedor;
    private $ObjFunc;


    public function __construct() {
      $this->Conn = new Connection();
      $this->ObjFornecedor = new OFornecedor();
      $this->ObjFunc = new FuncoesBase();

  }
  
  public function GetGroupUser($Object) {
    $this->ObjGrupoUsuario->Nome = $Object['nome'];

  
}
}

?>