<?php 

namespace Controllers;
use MVC\Router;


class PaginasController{

    public static function index(Router $router){
        $router->render('platos');
    }

    public static function bebidas(Router $router){
        $router->render('bebidas');
    }
}