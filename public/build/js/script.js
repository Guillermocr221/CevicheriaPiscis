let header = document.querySelector("header")
let logo = document.querySelector(".logo")
let banner = document.querySelector(".banner")
let carrito = document.getElementById("carrito")
let linkRecomendados = document.querySelector(".link-bebidas")

let platos = document.createElement('DIV')
    platos.classList.add('platos')

let imagenesPlatos = document.querySelectorAll(".foto-plato")

let recomendados = document.querySelector(".lista-recomendados");

let navp = document.querySelectorAll(".nav-p")
let carta = document.getElementById('carta')
let vertical ;

let platosTotalObject = null;
let platosObject = null;
let numeroPlatos = null;
let numeroSlides = 0;
let navPlatos = 0;
let categoriaActual = 1;

let links = document.querySelectorAll(".link-bebidas");
for(const link of links){
    link.addEventListener('click', (e)=>{
        e.preventDefault();
    })
}

async function consultarAPI(){
    try {
        const url = '/api/productos';
        const resultado = await fetch(url);
        const JsonDePlatos = await resultado.json();

        //?Ejemplos para en caso de compartir localmente desde VSCode.
        // const JsonDePlatos = [
        //     {ID:"1", DESCRIPCION:"Concentrado jugoso de un buen Cebiche Mixto.",LINKIMAGEN:"falta",NOMBRE:"LECHE DE TIGRE POWER",CATEGORIA:"1",PRECIO:"22"},
        //     {ID:"4",DESCRIPCION:"Cebiche jugoso acompa\u00f1ado con chicharr\u00f3n de pota.",LINKIMAGEN:"https:\/\/drive.google.com\/file\/d\/1aRlRe0YCt3mTgC4i9MF_eOYfvVJ_nhbQ\/view?usp=drive_link",NOMBRE:"LECHE DE TIGRE CROCANTE",CATEGORIA:"2",PRECIO:"24"},
        //     {ID:"5",DESCRIPCION:"Cebiche jugoso acompa\u00f1ado con chicharr\u00f3n de pota.",LINKIMAGEN:"https:\/\/drive.google.com\/file\/d\/1aRlRe0YCt3mTgC4i9MF_eOYfvVJ_nhbQ\/view?usp=drive_link",NOMBRE:"LECHE DE TIGRE CROCANTE",CATEGORIA:"3",PRECIO:"24"},
        //     {ID:"6",DESCRIPCION:"Cebiche jugoso acompa\u00f1ado con chicharr\u00f3n de pota.",LINKIMAGEN:"https:\/\/drive.google.com\/file\/d\/1aRlRe0YCt3mTgC4i9MF_eOYfvVJ_nhbQ\/view?usp=drive_link",NOMBRE:"LECHE DE TIGRE CROCANTE",CATEGORIA:"4",PRECIO:"24"},
        //     {ID:"7",DESCRIPCION:"Cebiche jugoso acompa\u00f1ado con chicharr\u00f3n de pota.",LINKIMAGEN:"https:\/\/drive.google.com\/file\/d\/1aRlRe0YCt3mTgC4i9MF_eOYfvVJ_nhbQ\/view?usp=drive_link",NOMBRE:"LECHE DE TIGRE CROCANTE",CATEGORIA:"5",PRECIO:"24"},
        //     {ID:"42",DESCRIPCION:"Cebiche jugoso acompa\u00f1ado con chicharr\u00f3n de pota.",LINKIMAGEN:"https:\/\/drive.google.com\/file\/d\/1aRlRe0YCt3mTgC4i9MF_eOYfvVJ_nhbQ\/view?usp=drive_link",NOMBRE:"LECHE DE TIGRE CROCANTE",CATEGORIA:"6",PRECIO:"24"},
        //     {ID:"44",DESCRIPCION:"Cebiche jugoso acompa\u00f1ado con chicharr\u00f3n de pota.",LINKIMAGEN:"https:\/\/drive.google.com\/file\/d\/1aRlRe0YCt3mTgC4i9MF_eOYfvVJ_nhbQ\/view?usp=drive_link",NOMBRE:"LECHE DE TIGRE CROCANTE",CATEGORIA:"7",PRECIO:"24"},
        //     {ID:"54",DESCRIPCION:"Cebiche jugoso acompa\u00f1ado con chicharr\u00f3n de pota.",LINKIMAGEN:"https:\/\/drive.google.com\/file\/d\/1aRlRe0YCt3mTgC4i9MF_eOYfvVJ_nhbQ\/view?usp=drive_link",NOMBRE:"LECHE DE TIGRE CROCANTE",CATEGORIA:"8",PRECIO:"24"},
        //     {ID:"47",DESCRIPCION:"Cebiche jugoso acompa\u00f1ado con chicharr\u00f3n de pota.",LINKIMAGEN:"https:\/\/drive.google.com\/file\/d\/1aRlRe0YCt3mTgC4i9MF_eOYfvVJ_nhbQ\/view?usp=drive_link",NOMBRE:"LECHE DE TIGRE CROCANTE",CATEGORIA:"9",PRECIO:"24"},
        //     {ID:"48",DESCRIPCION:"Cebiche jugoso acompa\u00f1ado con chicharr\u00f3n de pota.",LINKIMAGEN:"https:\/\/drive.google.com\/file\/d\/1aRlRe0YCt3mTgC4i9MF_eOYfvVJ_nhbQ\/view?usp=drive_link",NOMBRE:"LECHE DE TIGRE CROCANTE",CATEGORIA:"3",PRECIO:"24"}
            
        // ]
        return JsonDePlatos;

    } catch (error) {
        console.log(error);
    }

}
async function obtenerPlatosDeAPI(){
    try {
        platosTotalObject = await consultarAPI();
        
    } catch (error) {
        console.log(error);
    }
    
}
async function main() {
    const pantallaCarga = document.getElementById('pantalla-carga');
    await obtenerPlatosDeAPI();

    setTimeout(() => {
        pantallaCarga.style.display = 'none';
      }, 1500);

    iniciarApp();
    window.addEventListener('scroll',scrollVentana);
}   

main();

let cuadroCarrito = document.getElementById('contenido-carrito');
let infoPedido = document.getElementById('info-pedido');
let botonCerrar = document.getElementById('boton-cerrar');
let fondoOscuro = document.getElementById('fondo-oscuro');

let arregloDePlatosStorageRecuperado = sessionStorage.getItem('Platos');
    arregloDePlatosStorageRecuperado = JSON.parse(arregloDePlatosStorageRecuperado); //convertir a arreglo


let arregloDePlatosStorage = (arregloDePlatosStorageRecuperado != null) ? arregloDePlatosStorageRecuperado : [] ;

function activarDesactivarCarrito(){ 
    if(cuadroCarrito.classList.contains('inactivo')){
        cuadroCarrito.classList.remove('inactivo');
    }else{
        cuadroCarrito.classList.add('inactivo');
    }
    fondoOscuro.classList.toggle('inactivo');
}

botonCerrar.addEventListener('click',()=>{
    cuadroCarrito.classList.toggle('inactivo');
    fondoOscuro.classList.toggle('inactivo');
});
document.querySelector('.boton--cerrarCarrito').addEventListener('click',()=>{
    cuadroCarrito.classList.toggle('inactivo');
    fondoOscuro.classList.toggle('inactivo');
})

function botonCarrito(){
    carrito.addEventListener('click',()=>{
        contenidoCarrito();
        botones_borrar();
        activarDesactivarCarrito();
    });
}

function contenidoCarrito(){
    vaciarCarrito();
    let precioTotal = 0;
    let i = 0; //contador para asignar id a cada plato

    arregloDePlatosStorageRecuperado = sessionStorage.getItem('Platos') ;
    if(arregloDePlatosStorageRecuperado != null) {
        arregloDePlatosStorageRecuperado = JSON.parse(arregloDePlatosStorageRecuperado);
        arregloDePlatosStorageRecuperado.forEach((platoRecuperado)=>{
            agregarPlatoAlCarrito(platoRecuperado, i);
            precioTotal+= Number(platoRecuperado.precio)*platoRecuperado.cantidad;
            i++;
        });
    }
    
    let total=document.createElement('P')
        total.classList.add('precioTotal');
        total.innerHTML = precioTotal;
    infoPedido.appendChild(total);

    let mensajeVacio = document.createElement('DIV')
        mensajeVacio.id = "carritoVacio"
        mensajeVacio.classList.add('alerta')
        mensajeVacio.classList.add('alerta--roja')
        mensajeVacio.classList.add('alerta--abajo')
        mensajeVacio.classList.add('inactivo')
    let p = document.createElement('P');
        p.textContent = "Carrito Vacio!";
    mensajeVacio.appendChild(p)
    infoPedido.appendChild(mensajeVacio)                    

}

function vaciarCarrito(){
    while(infoPedido.children[1]){
        infoPedido.removeChild(infoPedido.children[1]);
    }
}

function agregarPlatoAlCarrito(objeto, id){
    let platoCarrito = document.createElement('DIV');
    platoCarrito.classList.add("plato-carrito");
    platoCarrito.id = `${objeto.id}`;
    let nombre = document.createElement('P');
        nombre.classList.add('nombrePlatoEnCarrito');
    let cantidad = document.createElement('P');
        cantidad.classList.add('cantidadPlato')
        cantidad.textContent = objeto.cantidad;

    if(objeto.extra){
        nombre.innerHTML = `${objeto.nombre} <br>(
        Aji: ${objeto.extra["Aji "]},
        Cancha:${objeto.extra["Cancha "]},
        Chifles:${objeto.extra["Chifles "]},
        Limon:${objeto.extra["Limon "]} )`;    
    }else{
        nombre.innerHTML = objeto.nombre;
    }

    let precio = document.createElement('P');
        precio.innerHTML = Number(objeto.precio) * objeto.cantidad;
    let botonEliminarPlato = document.createElement('I');
        botonEliminarPlato.classList.add('botonEliminarPlato');
        botonEliminarPlato.innerHTML = "<span class='material-symbols-outlined'>delete</span>"; 

    platoCarrito.appendChild(nombre);
    platoCarrito.appendChild(cantidad)
    platoCarrito.appendChild(precio);
    platoCarrito.appendChild(botonEliminarPlato);

    infoPedido.appendChild(platoCarrito);   
}


function botonesAddPlato(){
    
    let botonesAdd = document.querySelectorAll(".boton--agregar--plato");
    
    let botonesAddRecomendados = document.querySelectorAll(".boton__agregar--recomendado");
    for(const boton of botonesAddRecomendados){
        boton.addEventListener('click',()=>{
            let info = boton.closest('.descripcion-recomendado')
            let nombre = info.querySelector('.nombre--recomendado').textContent;
            let precio = info.querySelector('.precio--recomendado').textContent;
            let id = Number(info.id);

            let seEncuentraEnStorage = comprobarExistencia(id);
            if(!seEncuentraEnStorage){
                let recomendadoDeOrden = {
                    nombre: nombre,
                    precio: precio,
                    id: id,
                    cantidad: 1,
                    modificado : false
                }
                arregloDePlatosStorage.push(recomendadoDeOrden);
            }
            
            sessionStorage.setItem('Platos',JSON.stringify(arregloDePlatosStorage))    
            mensajePlatoAgregado();

        })
    }

    for (const botonAdd of botonesAdd) {
        botonAdd.addEventListener('click',()=>{
            let infoPlato = botonAdd.closest('.detalles-plato'); //padre del boton donde estaran el nombre y precio
            let nombrePlato = infoPlato.querySelector('.titulo-plato').textContent;
            let precioPlato = infoPlato.querySelector('.precio--plato').textContent;
            let idDePlato = botonAdd.closest('.plato').dataset.idplato;
                idDePlato = Number(idDePlato);
            
            let seEncuentraEnStorage;
                seEncuentraEnStorage = comprobarExistencia(idDePlato);

            if(!seEncuentraEnStorage){
                var platoDeOrden = {
                    nombre: nombrePlato,
                    precio: precioPlato,
                    id: idDePlato,
                    cantidad: 1,
                    modificado: false
                }
                arregloDePlatosStorage.push(platoDeOrden);
            }

            sessionStorage.setItem('Platos',JSON.stringify(arregloDePlatosStorage));    
            mensajePlatoAgregado();
        })   
    }
}

function comprobarExistencia(idABuscar){
    for(const plato of arregloDePlatosStorage){
        if( plato.id == idABuscar && plato.modificado == false){
            plato.cantidad += 1;
            return true;
        }
    }
    return false;
}

function cambiarBebidasPlatos(){

    linkRecomendados.addEventListener('click',()=>{
        let textoActual = linkRecomendados.children[0].textContent;
        linkRecomendados.children[0].textContent = alternarTexto(textoActual);

        alternarTituloMain();
        alternarTituloRecomendados();

        let navBebidas = document.getElementById('nav-bebidas');
        let navPlatos = document.getElementById('nav-platos');

        setearInactivo(recomendados)

        if(navBebidas.classList.contains('inactivo')){ 
            //se activara nav de bebidas
            borrarSub();
            let p = document.getElementById('6');
                p.classList.add('nav-active');
            filtrarPlatos(6, platos, 1)
            navBebidas.classList.remove('inactivo');
            navPlatos.classList.add('inactivo');

            // se activaran los recomendados de Platos:
            for(let i=0; i<4; i++){
                recomendados[i].classList.remove('inactivo')
            }
        }else{
            //se activara nav de platos
            borrarSub();
            let p = document.getElementById('1');
                p.classList.add('nav-active');
            filtrarPlatos(1, platos, 1)
            navBebidas.classList.add('inactivo');
            navPlatos.classList.remove('inactivo')

            // se activaran los recomendados de Bebidas:
            for(let i=4; i<8; i++){
                recomendados[i].classList.remove('inactivo')
            }
        }
        window.scrollTo({
            top: 350,
            behavior: 'smooth'
        })
    });
}

function alternarTexto(texto){
    if(texto == 'PLATOS'){
        return 'BEBIDAS';
    }else{
        return 'PLATOS'
    }
}
function alternarTituloMain(){
    let tituloPlato = document.getElementById('titulo_platos');
    if(tituloPlato.textContent == 'Platos a la carta'){
        tituloPlato.textContent = 'Bebidas Disponibles'
    }else{
        tituloPlato.textContent = 'Platos a la carta';
    }
}
function alternarTituloRecomendados(){
    let tituloRecomendados = document.getElementById('titulo-recomendados')
    if(tituloRecomendados.textContent == 'Bebidas Recomendadas'){
        tituloRecomendados.textContent = 'Platos Recomendados';
    }else{
        tituloRecomendados.textContent = 'Bebidas Recomendadas'
    }
}


function botones_borrar(){
    let botonesBorrar = document.querySelectorAll(".botonEliminarPlato")
    botonesBorrar.forEach((botonBorrar)=>{
        botonBorrar.addEventListener('click', ()=>{
            let idAeliminar = botonBorrar.parentNode.id;
            let platoABorrar = botonBorrar.parentNode
            let nombre = platoABorrar.firstChild.textContent;
            let contieneExtras = false;

            if( nombre.includes("Aji") || nombre.includes("Cancha") || nombre.includes("Chifles") || nombre.includes("Limon")){
                console.log("Contiene Extras!");
                contieneExtras = true;
            }

            if(contieneExtras){
                for (let i = 0; i < arregloDePlatosStorage.length; i++) {
                    const plato = arregloDePlatosStorage[i];
                    if(plato.id == idAeliminar && plato.modificado == true){
                        if(plato.cantidad == 1){
                            arregloDePlatosStorage.splice(i,1);
                        }else{
                            plato.cantidad--;
                        }
                    }
                }
            }else{
                for (let i = 0; i < arregloDePlatosStorage.length; i++) {
                    const plato = arregloDePlatosStorage[i];
                    if(plato.id == idAeliminar && plato.modificado == false){
                        if(plato.cantidad == 1){
                            arregloDePlatosStorage.splice(i,1);
                        }else{
                            plato.cantidad--;
                        }
                    }
                }
            }
            
            sessionStorage.setItem('Platos',JSON.stringify(arregloDePlatosStorage))
            contenidoCarrito();
            botones_borrar();
        });
    })
}

function iniciarApp(){
    console.log("Iniciando APP");
    
    let listaDePlatos = generarTotalDePlatos(platosTotalObject);
    let listaDeRecomendados = generarRecomendados('bebidas');
    let sizeWindow = window.innerHeight/1.1;

    // se selecciona a todos los elementos con clase ".foto-plato"
    imagenesPlatos = document.querySelectorAll(".foto-plato");

    // hacemos que listaDePlatos pueda ser iterable, con children, se usara en las funciones de scroll
    platos = listaDePlatos.children;
    // recomendados = recomendados.children;
    recomendados = listaDeRecomendados.children;
     
    //!NUEVA FUNCION DE FILTRADO
    filtrarPlatos(1, platos, 1);
    scrollAnimation(platos,sizeWindow);
    scrollAnimation(recomendados,sizeWindow);
    popEffect(imagenesPlatos, sizeWindow);
    accionCategoriaPlatos();
    botonesAddPlato();
    botonAddPlatoMod();
    botonesModPlato();
    botonCarrito();
    cambiarBebidasPlatos()
}

function setearInactivo(platos){
    for(let i=0; i<platos.length;i++){
        if(!platos[i].classList.contains('inactivo')){
            platos[i].classList.add('inactivo');
        } 
    }
}

function filtrarPlatos( categoria, platos , slideActual, modSlides){
    
    let arregloPlatosMismaCat = [];
    slideActual = 4 * (slideActual - 1); 

    let contadorCategoria = 0;
    for(let i=0; i< platos.length; i++){
        if(Number(platos[i].dataset.categoria) == categoria) {
            contadorCategoria++;
            arregloPlatosMismaCat.push(platos[i]);
        }     
    } 
    
    setearInactivo(platos);
    
    for(let i=slideActual; i< slideActual+4; i++){   
        if(i == contadorCategoria) break; // despues de esto ya no existen mas platos
        if(arregloPlatosMismaCat[i].classList.contains('inactivo')){
            arregloPlatosMismaCat[i].classList.remove('inactivo');
        }
    }
    if(modSlides != false){
        borrarSlides();
        let numeroSlides = contadorCategoria/4;
        numeroSlides = Math.ceil(numeroSlides);
        navPlatos = slidesPlatos(numeroSlides);
        carta.appendChild(navPlatos);
        accionBotonesNavPlatos();
    }

}

function borrarSlides(){
    let navAborrar = document.querySelector(".nav--platos");
    if(navAborrar){
        navAborrar.remove();
    }
}

function generarRecomendados( seccion ){
    let tituloRecomendados;
    // let recomendados = document.querySelector(".lista-recomendados");

    let cat = ['1','3','2','4','6','7','8','9'];
    for(let i=0; i<8; i++){
        let recomendado = crearRecomendado( cat[i], platosTotalObject );
        recomendados.appendChild(recomendado);
        setearInactivo(recomendados.children)
    }
    if(seccion == 'bebidas'){
        for(let i=4; i<8; i++){
            recomendados.children[i].classList.remove('inactivo')
        }
    }

    return recomendados;
}

function crearRecomendado( categoria, arregloObjetos){
    let recomendadoACrear;

    for(const objeto of arregloObjetos ){
        if(objeto.CATEGORIA == categoria){
            recomendadoACrear = objeto;
            break;
        }
    }

    let tipo;
    if(recomendadoACrear.CATEGORIA == '6') tipo = 'BAR';
    if(recomendadoACrear.CATEGORIA == '7') tipo = 'INFUSIONES';
    if(recomendadoACrear.CATEGORIA == '8') tipo = 'REFRESCANTES';
    if(recomendadoACrear.CATEGORIA == '9') tipo = 'CERVEZAS';

    if(recomendadoACrear.CATEGORIA == '1') tipo = 'ENTRADAS';
    if(recomendadoACrear.CATEGORIA == '3') tipo = 'PERU';
    if(recomendadoACrear.CATEGORIA == '2') tipo = 'KIDS';
    if(recomendadoACrear.CATEGORIA == '4') tipo = 'AUTOR';

    
    let recomendado = document.createElement('DIV');
        recomendado.classList.add('recomendado');

    let titulo = document.createElement('H3');
        titulo.classList.add("titulo-recomendado");
        titulo.textContent = `${tipo}`;

    let cuadro = document.createElement('DIV'); 
        cuadro.classList.add('cuadro-recomendado');

    let img = document.createElement('IMG');
        src = `https://www.artenatur.com/wp-content/uploads/2017/02/proximamente.png`;
        img.setAttribute(`src`,src);  
    
    let descripcion = document.createElement('DIV');
        descripcion.classList.add('descripcion-recomendado');   
        descripcion.id = recomendadoACrear.ID;
    
    let h3 = document.createElement('H3')
        h3.classList.add('nombre--recomendado');
        h3.textContent = `${recomendadoACrear.NOMBRE}`;
    
    let p = document.createElement('P');
        p.classList.add('precio');
        p.classList.add('precio--recomendado');
        p.textContent= `${recomendadoACrear.PRECIO}` ;   
    
    let button = document.createElement('BUTTON');
        button.classList.add('boton');
        button.classList.add('boton--agregar');
        button.classList.add('boton__agregar--recomendado');
        button.textContent= 'Add';

    descripcion.appendChild(h3);
    descripcion.appendChild(p);
    descripcion.appendChild(button);

    cuadro.appendChild(img);
    cuadro.appendChild(descripcion);

    recomendado.appendChild(titulo);
    recomendado.appendChild(cuadro);

    return recomendado;
}

//* CUADRO MODIFICAR
let cuadroModificarPlato = document.querySelector(".cuadroModPlato");

let idPlatoMod = 1;
if(arregloDePlatosStorage != "[]"){
    for(const plato of arregloDePlatosStorage){
        if(plato.modificado == true) idPlatoMod++;
    }
}

function botonAddPlatoMod(){
    let botonAddModificado = document.querySelector(".boton--agregar--platoMod");
    botonAddModificado.addEventListener('click',()=>{
        let infoPlatoModificado =  botonAddModificado.closest(".cuadroModPlato");
        
        let nombrePlato = infoPlatoModificado.querySelector(".cuadroModPlato_nombre").textContent;
        let precioPlato = infoPlatoModificado.querySelector(".precioMod").textContent; 
        let extrasPlato = infoPlatoModificado.querySelectorAll(".nombre-extra");
        let cantidadesExtra = infoPlatoModificado.querySelectorAll(".cantidad");
        let idPlato = infoPlatoModificado.id;
            idPlato = Number(idPlato)
        let extras = {}

        for(let i = 0; i<extrasPlato.length; i++){
            extras[extrasPlato[i].firstChild.textContent] = cantidadesExtra[i].textContent;
        }
        
        let tokenPlatoMod = `MOD${idPlatoMod}`

        var platoDeOrden = {
            nombre: nombrePlato,
            precio: precioPlato,
            extra: extras,
            id : tokenPlatoMod,
            cantidad: 1,
            modificado : true
        }
        arregloDePlatosStorage.push(platoDeOrden);
            
        sessionStorage.setItem('Platos',JSON.stringify(arregloDePlatosStorage));


        cerrarAbrirCuadroDeModificar();
        cantidadesACero()
        mensajePlatoAgregado();
        idPlatoMod++;
    })
}

function botonesModPlato(){
    let botonMod = document.querySelectorAll(".boton--personalizar");
    botonMod.forEach((boton)=>{
        boton.addEventListener('click',()=>{
            cerrarAbrirCuadroDeModificar();
            
            detallesPlato = boton.closest(".detalles-plato");
            id = boton.closest(".plato").dataset.idplato;
            id = Number(id)
            nombre = detallesPlato.children[0].textContent;
            descripcion = detallesPlato.children[1].textContent;
            precio = detallesPlato.querySelector(".precio--plato").textContent;
            urlImagen = boton.closest(".plato").firstChild.firstChild.src;
            llenarCuadroModificarPlato(nombre,descripcion,precio,urlImagen, id);
        });
    });

    accionCancelarModificar();
}

function llenarCuadroModificarPlato(nombre,descripcion,precio,urlImagen, id){
    let cuadro = document.querySelector(".cuadroModPlato");
        cuadro.id = id;
    let imagen = document.querySelector(".img_cuadro")
        imagen.src = urlImagen
    let nombrePlato = document.querySelector(".cuadroModPlato_nombre")
        nombrePlato.textContent = nombre
    let descripcionPlato = document.querySelector(".cuadroModPlato_descripcion")
        descripcionPlato.textContent = descripcion
    let precioCuadro = document.querySelector(".cuadroModPlato_precio").firstChild
        precioCuadro.textContent = precio
    let precioModificado = document.querySelector(".precioMod");
        precioModificado.textContent = precio
}

let botonCancelarModificar = document.querySelector(".boton--cancelar")
function accionCancelarModificar(){
    botonCancelarModificar.addEventListener('click',()=>{
        cerrarAbrirCuadroDeModificar()
        cantidadesACero();
    })
}

function cantidadesACero(){
    let cantidades = document.querySelectorAll(".cantidad");
        cantidades.forEach((cantidad)=>{
            cantidad.textContent = 0;
        })
}

function cerrarAbrirCuadroDeModificar(){
    cuadroModificarPlato.classList.toggle("modPlato-inactivo");
    botonCerrar.classList.toggle("inactivo");
    fondoOscuro.classList.toggle("fondo-oscuro--modPlato");
    fondoOscuro.classList.toggle("inactivo");
}

function funcionalidadCantidad(){
    let botonMas = document.querySelectorAll(".mas");
    let botonMenos = document.querySelectorAll(".menos");
    botonMas.forEach((boton)=>{
        boton.addEventListener('click',()=>{
            let precioDelExtra = boton.closest(".extra").querySelector('SPAN')
                precioDelExtra = parseFloat(precioDelExtra.textContent)

            cantidad = parseInt(boton.parentElement.children[1].textContent)
            if(cantidad<10){
                cantidad++;
                actualizarPrecioNuevo( precioDelExtra);
            }
            boton.parentElement.children[1].textContent = cantidad;
        });
    })
    botonMenos.forEach((boton)=>{
        boton.addEventListener('click',()=>{
            let precioDelExtra = boton.closest(".extra").querySelector('SPAN')
                precioDelExtra = -1 * parseFloat(precioDelExtra.textContent)

            cantidad = parseInt(boton.parentElement.children[1].textContent)
            if(cantidad > 0) {
                cantidad--
                actualizarPrecioNuevo( precioDelExtra);
            };
            boton.parentElement.children[1].textContent = cantidad;
        });
    })

}
funcionalidadCantidad();

function actualizarPrecioNuevo( precioDelExtra ){
    let elementoPrecioModificado = document.querySelector(".precioMod");
    let precioModificado= parseFloat(elementoPrecioModificado.textContent)

    elementoPrecioModificado.textContent = precioModificado + precioDelExtra;
}


//FUNCIONES 

//?EFECTO DE SUBRAYADO Y ACCION DE CADA BOTON CATEGORIA DE CARTA
function accionCategoriaPlatos(){
    for(const p of navp ){
        p.addEventListener('click',()=>{
            borrarSub();
            p.classList.add('nav-active');
            let tipo = Number(p.id);
 
            //!NUEVA FUNCION FILTRAR PLATOS
            filtrarPlatos(tipo, platos,1);

            let sizeWindow = window.innerHeight/1.1 ;
            scrollAnimation(platos, sizeWindow);

            imagenesPlatos = document.querySelectorAll(".foto-plato");
            popEffect(imagenesPlatos, sizeWindow);
        })
    }
}

function popEffect(imagenesPlatos,sizeWindow){
        
    for (const elemento of imagenesPlatos) {
        let posElemento = elemento.getBoundingClientRect().top;
        if(posElemento < sizeWindow){
                elemento.classList.add('animacionPop');
        }
    }
}

function scrollAnimation(elementos, sizeWindow){
    for(let i=0; i<elementos.length;i++){
        let posElemento = elementos[i].getBoundingClientRect().top;
        if(posElemento < sizeWindow){
            elementos[i].classList.add('animacionAparecer');
        }
    }
}

function scrollBanner(e){ // scroll de banner
    if(e <93){
        header.classList.add("header-scroll");
        logo.classList.add("logo-scroll");
    }else{
        if(header.classList.contains("header-scroll")){
            header.classList.remove("header-scroll");
        }
        logo.classList.remove("logo-scroll");
    }
}

function scrollVentana(){
    //Efecto del scroll (grande-pequeño)
    vertical=  banner.getBoundingClientRect() ;
    scrollBanner(vertical.top); // de banner

    let sizeWindow = window.innerHeight/1.2;
    imagenesPlatos = document.querySelectorAll(".foto-plato");
   
    scrollAnimation(platos,sizeWindow);
    scrollAnimation(recomendados,sizeWindow);
    popEffect(imagenesPlatos, sizeWindow) ;
}

function borrarSub(){
    for(const p of navp ){
        if(p.classList.contains('nav-active')){
            p.classList.remove('nav-active');
        }
    }
}
//}

//?GENERACION TOTAL DE PLATOS
function generarTotalDePlatos(platosObject){
    let platos = document.createElement('DIV');
        platos.classList.add('platos');
    
        for(let i=0; i< Object.keys(platosObject).length; i++){
            const nombre = platosObject[i]["NOMBRE"];
            const precio = platosObject[i]["PRECIO"];
            const descripcion = platosObject[i]["DESCRIPCION"];
            const foto = platosObject[i]["LINKIMAGEN"];
            const categoria = platosObject[i]["CATEGORIA"];
            const idPlato = platosObject[i]["ID"];
            platoNuevo = crearPlato(nombre,precio,descripcion,foto,categoria, idPlato);
            platos.appendChild(platoNuevo);
        }
    carta.appendChild(platos);
    return platos;
}

function slidesPlatos(numeroSlides){
    let navPlatos = document.createElement('NAV');
        navPlatos.classList.add('nav--platos');

    for(let i=1; i<=numeroSlides; i++){
        let slide = document.createElement('BUTTON');
            slide.classList.add('boton-nav--platos');
            slide.innerHTML = `${i}`;

        navPlatos.appendChild(slide);
    }
    return navPlatos;
}

//! CODIGO PARA GENERAR HMTL Y SUS CLASES CSS
function crearPlato(nombre, precio, descripcion, photo, categoria, idPlato){
    const platoCreado = document.createElement('DIV');
    platoCreado.classList.add("plato");
    platoCreado.classList.add("inactivo");
    platoCreado.dataset.categoria = categoria;
    platoCreado.dataset.idplato = idPlato;

    //-----IMAGEN DE PLATO
    const fotoPlato = document.createElement('DIV');
    fotoPlato.classList.add('foto-plato');
    
    const imgPlato = document.createElement('IMG');
    //const src = `build/img/svgs-platos/${photo}.svg`;
    const link = `${photo}`;
    //console.log(link);
    var regex = /\/filee\/d\/(.*?)\/view/;
    let match = link.match(regex);
    let id;
    let src ;
    // Verifica si hay una coincidencia y si hay una captura
    if (match && match[1]) {
        id = match[1];
        src = `http://drive.google.com/uc?export=view&id=${id}`;
    } else {
        id = "";
        src = `https://www.artenatur.com/wp-content/uploads/2017/02/proximamente.png`;
    }
    //src = `http://drive.google.com/uc?export=view&id=${id}`;
    imgPlato.setAttribute(`src`,src);
    
    fotoPlato.appendChild(imgPlato);
    //-----FIN IMAGEN DE PLATO
    
    //*-----DETALLES PLATO
    const detallesPlato = document.createElement('DIV');
    detallesPlato.classList.add('detalles-plato');
    
        const tituloPlato = document.createElement('H3');
        tituloPlato.classList.add('titulo-plato');
        tituloPlato.innerHTML= `${nombre}`;
    
        const descripcionPlato = document.createElement('P');
        descripcionPlato.classList.add('descripcion');
        descripcionPlato.innerHTML= `${descripcion}`;
    
        //-----DIV SEPARAR A BORDES
    
        const divSeparar = document.createElement('DIV');
        divSeparar.classList.add('separar-a-bordes');
    
            // -----------------------------------DIV TO ORDER
            const divToOrder = document.createElement('DIV');
            divToOrder.classList.add('to-order');
    
            const boton_agregar = document.createElement('BUTTON');
            boton_agregar.classList.add('boton');
            boton_agregar.classList.add('boton--agregar');
            boton_agregar.classList.add('boton--agregar--plato');
            boton_agregar.innerHTML = `Add`;
    
            const boton_personalizar = document.createElement('BUTTON');
            boton_personalizar.classList.add('boton');
            boton_personalizar.classList.add('boton--personalizar');
            boton_personalizar.innerHTML = `Mod`;
    
            divToOrder.appendChild(boton_agregar);
            const categoriaDeBebidas = [6,7,8,9];
            if( !categoriaDeBebidas.includes( Number(categoria) ) ){
                divToOrder.appendChild(boton_personalizar);
            }
            // -----------------------------------FIN TO ORDER
    
        const precioPlato = document.createElement('P');
        precioPlato.classList.add('precio');
        precioPlato.classList.add('precio--plato');
        precioPlato.innerHTML= `${precio}`;
    
        divSeparar.appendChild(divToOrder);
        divSeparar.appendChild(precioPlato);
        //-----FIN SEPARAR A BORDES
    
    detallesPlato.appendChild(tituloPlato);
    detallesPlato.appendChild(descripcionPlato);
    detallesPlato.appendChild(divSeparar);
    //*-----FIN DETALLES PLATO
    
    //Agregado todo a un Plato
    platoCreado.appendChild(fotoPlato);
    platoCreado.appendChild(detallesPlato);

    return platoCreado;
}

//? Se usa para vaciar los platos y slides.
function vaciarPlatos(elemento) {
    while(elemento.children[2]){
        elemento.removeChild(elemento.children[2]);
    }
}

//? EVENTOS A CADA BOTON DEL SLIDE
function accionBotonesNavPlatos(){
    for (const boton of navPlatos.children) {
        boton.addEventListener('click',()=>{
            let slideActual = Number(boton.innerHTML);
    
            let sizeWindow = window.innerHeight/1.1;
            imagenesPlatos = document.querySelectorAll(".foto-plato");
            let tipo;
            for(const p of navp ){
                if(p.classList.contains('nav-active')){
                    tipo = Number(p.id);
                }
            }
            filtrarPlatos(tipo,platos,slideActual, false);
            popEffect(imagenesPlatos, sizeWindow);

            window.scrollTo({
                top: 400,
                behavior: 'smooth'
            })
        })
    }
}

function mensajePlatoAgregado(){
    const mensajeAgregado=Swal.mixin({
        toast: true,
        width:400,
        position: "bottom",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
    })
    
    mensajeAgregado.fire({
        icon: "success",
        title: "Plato Agregado a la Orden",
    });
}

function mensajeCarritoVacio(){
    let divMensaje = document.getElementById("carritoVacio");
        divMensaje.classList.toggle("inactivo");

    setTimeout(() => {
        divMensaje.classList.toggle("inactivo");
    }, 2000);

}

//*FUNCIONALIDAD WHATSAPP

async function FuncionalidadOrdenar(){
    let botonOrdenar = document.getElementById("boton__ordenar")
    let botonCerrarForm = document.querySelector(".cerrarForm");
        botonCerrarForm.addEventListener('click', ()=>{
            const formDatos = document.querySelector(".formulario__datos");
                  formDatos.classList.toggle("inactivo");
        });
    
    botonOrdenar.addEventListener('click',  ()=>{

        if( sessionStorage.getItem('Platos') == "[]" || sessionStorage.getItem('Platos') == null){
            mensajeCarritoVacio();
        }else{
            solicitarDatos();
        }
    })
}

FuncionalidadOrdenar();

function solicitarDatos(){
    const formDatos = document.querySelector(".formulario__datos");
          formDatos.classList.toggle("inactivo");
    
    let botonConfirmar = document.querySelector(".boton__confirmar")
    botonConfirmar.addEventListener('click',validarDatos)
    
}

function validarDatos(){
    let alertaRoja = document.getElementById("errorForm")
    let alertaVerde = document.querySelector(".alerta--verde")

    let datos = document.getElementById("nombre").value;
    let telefono = document.getElementById("telefono").value;
    let distrito = document.getElementById("distrito").value;
    let direccion = document.getElementById("direccion").value;
    let pago = document.getElementById("metodoPago").value;

    let info = [datos, telefono, distrito, direccion, pago];
    if( datos && telefono && distrito && direccion && pago ){
        alertaVerde.classList.toggle("inactivo");
        
        setTimeout(() => {
            alertaVerde.classList.toggle("inactivo")
          }, 1500);
        setTimeout(() => {
            enviarOrdenPorWhatsApp(info);
            const formDatos = document.querySelector(".formulario__datos");
            formDatos.classList.toggle("inactivo");
        }, 2000);
        
    }else{
        alertaRoja.classList.toggle("inactivo");
        
        setTimeout(() => {
            alertaRoja.classList.toggle("inactivo")
          }, 2500);
    }

}

function enviarOrdenPorWhatsApp( info ) {
    // info de la orden del carrito
    const orden = obtenerOrden();

    // Construye el mensaje 
    const mensajeWhatsApp = construirMensajeWhatsApp(orden, info);

    const numeroWhatsApp = '+51975384320';
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensajeWhatsApp)}`;

    window.open(urlWhatsApp, '_blank');
    
}

// Esta función obtiene la información de la orden desde el sessionStorage
function obtenerOrden() {
    const ordenRecuperada = sessionStorage.getItem('Platos');
    return JSON.parse(ordenRecuperada) || [];
}

function convertirATipoOracion(oracion) {
    // Dividir la oración en palabras
  const palabras = oracion.split(' ');

  // Aplicar la lógica para cada palabra
  const palabrasConvertidas = palabras.map(palabra => {
    // Verificar si la palabra no está vacía
    if (palabra.length > 0) {
      // Convertir la palabra: primer carácter a mayúscula, el resto a minúscula
      return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
    } else {
      return ''; // Mantener palabras vacías como están
    }
  });

  // Unir las palabras convertidas en una nueva oración
  const oracionConvertida = palabrasConvertidas.join(' ');

  return oracionConvertida;
}

// Esta función construye el mensaje de la orden para WhatsApp
function construirMensajeWhatsApp(orden, info) {
    let mensaje = '¡Hola Quiero realizar la siguiente orden:\n';

    orden.forEach((plato, index) => {
        mensaje += `${index + 1}. ${convertirATipoOracion(plato.nombre)} (${plato.cantidad}ud.) - S/.${plato.precio}\n`;

        if (plato.extra) {
            mensaje += 'Extras:\n';
            for (const extra in plato.extra) {
                mensaje += `- ${extra}: ${plato.extra[extra]}\n`;
            }
        }
    });
    // Calcula el total de la orden
    const total = orden.reduce((acc, plato) => acc + parseFloat(plato.precio), 0);

    mensaje += `\nTotal: ${total.toFixed(2)}`; // Muestra el total en el mensaje
    mensaje += `\nDatos Para Envio:`
    mensaje += `\n- Nombre: ${info[0]}`
    mensaje += `\n- Telefono: ${info[1]}`
    mensaje += `\n- Distrito:${info[2]}, `
    mensaje += `\n- Direccion:${info[3]}.`
    mensaje += `\n- Pagare por ${info[4]}.`
                ;
    return mensaje;
}

function validarNumero(input) {
    input.value = input.value.replace(/\D/g, ''); // Eliminar caracteres no numéricos
  }