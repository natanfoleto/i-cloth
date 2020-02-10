<?php

require "../../../../config.php";

use app\Models\MUsuarios;

$usuarios = new MUsuarios;

echo json_encode($usuarios->GetAll());