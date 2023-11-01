<?php
use Model\Producto;
require __DIR__ . '/../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad(); //extraer del archivo .env los datos para conectarse a la DB


require 'funciones.php';
require 'database.php';



// Conectarese a la base de datos
$db = conectarDb();
$producto = new Producto;

Producto::setDB($db);