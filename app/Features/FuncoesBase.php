<?php

namespace app\Features;

class FuncoesBase {
    public function TratarCaracter($Value, $Type) {
	    switch($Type) {
            case 1: $rst = utf8_decode($Value); break;
            case 2: $rst = utf8_encode($Value); break;    
			case 3: $rst = htmlentities($Value, ENT_QUOTES, "ISO-8859-1"); break; 
        }
        
        return $rst;
    }	
    
    public function DataAtual($Type) {
	    switch($Type) {
            case 1: $rst = date("Y-m-d"); break;
            case 2: $rst = date("Y-m-d H:i:s"); break;
            case 3: $rst = date("d/m/Y"); break;
        }

        return $rst;
    }
    
    public function Base64($Value, $Type) {
        switch($Type) {
            case 1: $rst = base64_encode($Value); break;
            case 2: $rst = base64_decode($Value); break;
        }

        return $rst;
    }
}

?>