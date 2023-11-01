<?php

function conectarDb(): mysqli
{
    $db = new mysqli(
        $_ENV['DB_HOST'],
        $_ENV['DB_USER'], 
        $_ENV['DB_PASS'],
        $_ENV['DB_NAME']
    );

    $db->set_charset('utf8');

    if (!$db) {
        echo "Error: No se pudo conectar a MySQL.";
        echo "errno de depuración: " . mysqli_connect_errno();
        echo "error de depuración: " . mysqli_connect_error();
        exit;
    }
    // else{
    //     echo "Conexion a DB Amazon exitosa";
    // }

    return $db;
}

// $query = "SELECT * from Para_Pruebas_Con_RDS.producto" ;

// $producto = $db->query($query)->fetchAll(PDO::FETCH_ASSOC);


// echo "<pre>";
// var_dump($producto);
// echo "</pre>";

