# APP WEB CEVICHERIA PISCIS

Manual de ejecucion de la app web de manera local con PHP apache y conectado a AWS mysql.

## Tabla de Contenidos

- [Inicio](#inicio)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

## Inicio

Este proyecto utiliza PHP8 del lado del servidor para poder conectar a una DB alojada en AWS, asimismo para poder visualizar las tabla y dbs correspondientes al endpoint de AWS sera necesario MYSQL workbench o algun otro entorno grafico de MySQL.

## Requisitos

- [Apache](#Apache)
- [VisualC++](#VisualC++)
- [PHP8](#PHP8)
- [Gist](#Gist)
- [MYSQL](#MYSQL)
- [Composer](#Composer)

## Instalación

## Apache
- Descargar apache del siguiente link: https://www.apachelounge.com/download/
- Una vez descargado el zip, extraer el archivo "Apache24" y pegar en disco C.
- Renombrar carpeta como "apache".
- Buscar en la carpeta el archivo "httpd.conf" y abrir con VScode para editarlo
- Linea 37: cambiar la direccion del SRVROOT a "c:/apache".
- Linea 227: Descomentar ServerName y cambiar el "www.example.com:80" por "localhost".
- Guardar.
- Nota: para que funcione apache debes instalar tambien VisualC++
- Para comprobar si funciona apache
    - En powershell, ubicarse en la carpeta de apache: cd C:\apache\bin
    - Ejecutar httpd.exe
    - En navegador, escribir "localhost"
    - De estar todo correcto, aparecera en ventana el mensaje "It works"
    - En la carpeta de apache, carpeta htdocs, se unica el archivo index.html de donde se obtiene este mensaje.
- Para no tener que ejecutar apache desde powershell siempre que lo necesitemos, lo instalaremos como servicio.
    - En powershell, ubicarse en apache\bin: cd C:\apache\bin
    - Escribir: .\httpd.exe -k install 
    - Se instalara el servicio
    - En "Servicios"(buscar en menu inicio xd) podras ubicar Apache2.4, que puedes iniciar y detener. 
    
## VisualC++
Descargar el ejecutable en: 
https://learn.microsoft.com/es-es/cpp/windows/latest-supported-vc-redist?view=msvc-170

## PHP8
- En https://www.php.net/  dirigirse a Download, luego "Windows downloads", en el recuadro de Thread Safe descargar el Zip.
- Extraer todo en C:\php
- Buscar en la carpeta C:\apache el archivo "httpd.conf" y abrir con VScode para editarlo. Ubicarse al final del archivo y pegar el Module de Gist(3 lineas de codigo).
- En la carpeta php, unicar el archivo php.ini-production, copiar y pegar el archivo(en la misma carpeta), renombrarlo a "php.ini". Este archivo permite configurar extensiones php.
- Abrir el php.ini
    - Buscar "post_max_size" y cambiar el valor a 20M .
    - Buscar "upload_max_filesize" y cambiar el valor a 20M .
    - Buscar ";extension", lineas 917 en adelante, estar comentadas varias extensiones, ubicar "extension=mysqli" y descomentar(quitar el ";"). 
- Agregar la carpeta C:\php al path del sistema.
- Escribir en consola "php -v".

- Al hacer cambios en el .conf de apache, es necesario reiniciar el servidor, desde servicios reiniciar Apache2.4

## Gist
- Modulo de Gist para correr php con Apache:
https://gist.github.com/codigoconjuan/deeb683d13e08c75111b83b625a8e3c9

## MYSQL
- https://dev.mysql.com/downloads/mysql/ 
- En version NO elegir la innovation.
- Click en El recommended Download. 
- Descargar el MSI installer.(el mas pesado incluye el paquete completo)
- Al darle download, en la siguiente pestaña clickear en "No thanks, just start my download."
- Al ejecutar el instalador, elegir el Setup type "Developer Default". De no ubicarse, elegir "Full".
- Next -> Execute
- Luego pedira configurar, no modificar nada y seguir dando next hasta ubicarse en Account and Roles. Escribir usuario y contraseña, ejemplo: ('root', 'password')
- Next -> Execute
- Seguir next hasta ubicarse en Connect to Server, pedira usuario y contraseña(que se registro antes)
- Next -> Execute
- Next -> finish.
- Se abrira Workbench, ya puedes usar MySQL
- Asimismo, en Servicios, se creo el servicio MySQL80. (recomendado darle arranque manual, no automatico)
- Para conectarse a la DB AWS del proyecto, en Workbench, en MySQL Connections en el signo "+", Elegir un nombre que desees, en parameter
    - Hostname: piscis-web.cuyhndew5rmv.us-east-2.rds.amazonaws.com
    - Port: 3306
    - Username:  admin
    - Password -> Store in Vault : 123Ojalajale
- Testear
- Darle Ok

## Composer
Equivalente a npm pero para PHP.
- https://getcomposer.org/download/
- Descargar el setup.exe 
- Ubicar el archivo php cuando lo solicite.
- En powershell :  composer -v


## Ejecucion de la app web
- Ahora, tras clonar el repositorio , abrirlo con VSCODE.
- Abrir la terminal, y ubicarse en al carpeta public: "cd public"
- Escribir el comando: "php -S localhost:3000" Esto arrancara el servidor, la misma consola te deja el link, ctrl + click para acceder. Se abrira la ventana con la pagina cargada.
(De no ubicarse la carpeta Vendor, en consola escribir "composer install", esto tomara las dependencias y el autoload ubicadas en composer.json)
(Crear el archivo con nombre ".env" en la carpeta includes, y ahi poner las credenciales de la conexion a la base de datos)
