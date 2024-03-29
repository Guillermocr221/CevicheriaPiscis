<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cevicheria Piscis</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link rel="stylesheet" href="build/css/estilos.css">
    <script src="https://kit.fontawesome.com/93358a4a8b.js" crossorigin="anonymous"></script>
    </head>
<body>
    <header>
        <div class="admin">
            <!-- <i><span class="material-symbols-outlined">account_circle</span></i> -->
            <p>Admin</p>
        </div>
        <div class="logo"></div>
        <div class="carrito" id="carrito">
            <i><span class="material-symbols-outlined">shopping_cart</span></i>
            <p>Order</p>
            <div class="carrito__cantidadSimbolo"></div>
        </div>
        
    </header>
    <div class="contenedor-banner">
        <div class="banner"></div>
    </div>


    <div class="contenido-carrito inactivo" id="contenido-carrito">
        <div class="info-pedido" id="info-pedido">
            <h2 class="titulo-carrito">Orden</h2>
        </div>
        <div class="area-whatsapp">
            <button id="boton__ordenar" class="boton boton--ordenar" >Ordenar Por whatsapp</button>
            <button id="boton__ordenar" class="boton boton--cerrarCarrito" >Cerrar Carrito</button>
        </div>    
        <div class="formulario__datos inactivo">
            <div class="cerrarForm">
                <i><span class="material-symbols-outlined">
                    cancel
                </span></i>
            </div>
            <h1 class="titulo__form">
                DATOS PERSONALES
            </h1>
            <div class="input__wrapper">
                <input id="nombre" type="text" name="nombre" placeholder="Ingresar Nombres"  required
                class="input__field">
                <label for="nombre" class="input__label">Nombre y Apellido</label>
            </div>
            <div class="input__wrapper">
                <input id="telefono" type="text" oninput="validarNumero(this)" name="telefono"  required
                class="input__field" placeholder="Ingresar Telefono"  maxlength="9">
                <label for="telefono" class="input__label">Telefono</label>
            </div>
            <div class="input__wrapper">
                <input id="distrito" type="text" name="distrito"  required
                class="input__field" placeholder="Ingresar distrito">
                <label for="distrito" class="input__label">Distrito</label> 
            </div>
            <div class="input__wrapper">
                <input id="direccion" type="text" name="direccion"  required
                class="input__field" placeholder="Ingresar Direccion">
                <label for="direccion" class="input__label">Direccion</label> 
            </div>
            <div class="input__wrapper select__wrapper">
                <select id="metodoPago" name="metodoPago" class="input__field">
                    <option value="">Seleccione una opción</option>
                    <option value="efectivo">Efectivo</option>
                    <option value="transferencia">Transferencia</option>
                </select>
                <label for="metodoPago" class="input__label input__select">Metodo de Pago</label> 
            </div>
           

            <button class="boton boton__confirmar">Confirmar Datos y Ordenar</button>
            <div id="errorForm" class="alerta alerta--roja inactivo ">
                <p>Ingresar Datos Correctamente</p>
            </div>
            <div class="alerta alerta--verde inactivo ">
                <p>Gracias, Redireccionando A whatsapp</p>
            </div>
        </div>
    </div>

    

    <div class="fondo-oscuro inactivo" id="fondo-oscuro">
        <i id="boton-cerrar" class=""><span class="material-symbols-outlined icono-cerrar">close</span></i>
    </div>

    <div class="cuadroModPlato modPlato-inactivo">
        <section class="cuadroModPlato_detalles">

            <div class="cuadroModPlato_foto">
                <img class='img_cuadro' src="/build/img/svgs-platos/Cebiche Mixto.svg" alt="">
            </div>
            
            <div class="cuadroModPlato_info">
                <div class="cuadroModPlato_nombre">Ceviche Peruano</div>
                <div class="cuadroModPlato_descripcion">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta assumenda officiis saepe rerum sapiente ex.</div>
                <div class="cuadroModPlato_precio "><p class="precio">35</p></div>
            </div>
        </section>

        <section class="cuadroModPlato_personalizacion">
            <div class="extras">
                <h2 class="titulo_extras">Agregar Extras</h2>
                <div class="extra">
                    <div class="nombre-extra">Aji <span>1.00</span></div>
                    <div class="cantidad-extra">
                        <p class="menos">-</p>
                        <p class="cantidad"> 0 </p>
                        <p class="mas">+</p>
                    </div>
                </div>
                <div class="extra">
                    <div class="nombre-extra">Limon <span>5.00</span></div>
                    <div class="cantidad-extra">
                        <p class="menos">-</p>
                        <p class="cantidad"> 0 </p>
                        <p class="mas">+</p>
                    </div>
                </div>
                <div class="extra">
                    <div class="nombre-extra">Cancha <span>1.00</span> </div>
                    <div class="cantidad-extra">
                        <p class="menos">-</p>
                        <p class="cantidad"> 0 </p>
                        <p class="mas">+</p>
                    </div>
                </div>
                <div class="extra">
                    <div class="nombre-extra">Chifles <span>2.50</span></div>
                    <div class="cantidad-extra">
                        <p class="menos">-</p>
                        <p class="cantidad"> 0 </p>
                        <p class="mas">+</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="nuevoPrecio">
            <button class="boton boton--agregar boton--agregar--platoMod">Add</button>
            <button class="boton boton--cancelar">Cancelar</button>
            <div class="precioMod precio">45</div>
        </section>
    </div>


    <div id="pantalla-carga">
         <div id="mensaje-carga">Bienvenido a Piscis...</div>
    </div>

    <?php echo $contenido; ?>


    <footer>
        <div class="logo logo--footer"></div>

        <div class="footer__seccion">
            <p class="footer__titulo">Piscis Pueblo Libre</br></p>

            <p class="footer__subtitulo">Direccion</p>
            <p class="footer__contenido"> Mz G lt. 10 Urb. Bayovar Los Ucayali 350</p>
        </div>
        <div class="footer__seccion">
            <p class="footer__titulo">Contacto</p>

            <p class="footer__subtitulo">Telefono</p>
            <p class="footer__contenido">005-1129</p>
            <p class="footer__subtitulo">E-Mail</p>
            <p class="footer__contenido">sabor.mar@gmail.com</p>
        </div>
        <div class="footer__seccion">
            <p class="footer__titulo">Redes</p>
            <div class="footer__redes">
                <a class="iconRedes iconRedes--fb" href=""><i class="fa-brands fa-facebook"></i></a>
                <a class="iconRedes iconRedes--ig" href=""><i class="fa-brands fa-instagram"></i></a>
                <a class="iconRedes iconRedes--ws" href=""><i class="fa-brands fa-whatsapp"></i></a>
            </div>
        </div>
        
        <div class="ministerio"></div>

    </footer>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="build/js/script.js"></script>
</body>
</html>