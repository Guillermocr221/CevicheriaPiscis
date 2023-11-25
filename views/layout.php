<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cevicheria Piscis</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link rel="stylesheet" href="build/css/estilos.css">
    </head>
<body>
    <header>
        <div class="admin">
            <!-- <i><span class="material-symbols-outlined">account_circle</span></i> -->
            <p>Admin</p>
        </div>
        <a href="/"><div class="logo"></div></a>
        <div class="carrito" id="carrito">
            <i><span class="material-symbols-outlined">fact_check</span></i>
            <p>Order</p>
        </div>
        
    </header>

    <div class="contenido-carrito inactivo" id="contenido-carrito">
        <div class="info-pedido" id="info-pedido">
            <h2 class="titulo-carrito">Orden</h2>
        </div>
        <div class="area-whatsapp">
            <button class="boton boton--ordenar" onclick="enviarOrdenPorWhatsApp()">Ordenar Por whatsapp</button>
        </div>    
    </div>
    <div class="fondo-oscuro inactivo" id="fondo-oscuro">
        <i id="boton-cerrar"><span class="material-symbols-outlined icono-cerrar">close</span></i>
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

    <div class="contenedor-banner">
        <div class="banner"></div>
    </div>

    <div id="pantalla-carga">
         <div id="mensaje-carga">Bienvenido a Piscis...</div>
    </div>

    <?php echo $contenido; ?>


    <footer>
        <div class="logo logo--footer"></div>

        <p>Cevichería Sabor de Mar</br>

            Mz G lt. 10 Urb. Bayovar</br>
            
            Los Ucayali 350</p>
        <p>     Telefono :</br>
                005-1129</br>
               Correo electrónico: </br>
               sabor.mar@gmail.com</p>

        <div class="ministerio"></div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="build/js/script.js"></script>
</body>
</html>