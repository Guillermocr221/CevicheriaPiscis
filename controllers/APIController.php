<?php

namespace Controllers;

use Model\Producto;

class APIController{

    public static function index(){
        $productos = Producto::all();
        echo json_encode($productos);
    }
}

