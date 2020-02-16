<?php

namespace app\Features;

class FuncoesBase {
    
    public function DataAtual($Type) {
	    switch($Type) {
            case 1: $rst = date("Y-m-d"); break;
            case 2: $rst = date("Y-m-d H:i:s"); break;
            case 3: $rst = date("d/m/Y"); break;
        }

        return $rst;
    }
}

?>