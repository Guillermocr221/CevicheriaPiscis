<?php

namespace Model;

class Producto{

    //Base de datos
    protected static $db;

    //Definir conexion a la DB
    public static function setDB($database){
        self::$db = $database;
    }

    //Listar todos los productos
    public static function all(){
        $query = "SELECT * FROM PRODUCTO";

        $resultado = self::consultarSQL($query);

        return $resultado;

    }
    public static function consultarSQL($query){
        //Consultar la base de datos
        $resultado = self::$db->query($query);
        
        //Iterar los resultados
        $array = [];
        while($registro = $resultado->fetch_assoc()){
            $array[] = self::crearObjeto($registro); 
        }

        //liberar memoria
        $resultado->free();

        //retornar los resultados
        return $array;
    }
    
    // Funcion para convertir un arreglo asociativo en Objeto
    protected static function crearObjeto($registro){
        $objeto = new self; // crea nuevos objetos de la clase actual

        foreach($registro as $key => $value){
            // if(property_exists($objeto, $key)){
                $objeto->$key = $value;
            // }
        }
        // debuguear($objeto);
        return $objeto;
    }
}    