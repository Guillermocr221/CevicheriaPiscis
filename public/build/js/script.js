
let header = document.querySelector("header")
let logo = document.querySelector(".logo")
let banner = document.querySelector(".banner")
let carrito = document.getElementById("carrito")

let platos = document.createElement('DIV')
    platos.classList.add('platos')

let imagenesPlatos = document.querySelectorAll(".foto-plato")

let bebidas = document.querySelectorAll(".bebida")

let navp = document.querySelectorAll(".nav-p")
let carta = document.getElementById('carta')
let vertical ;

let platosTotalObject = null;
let platosObject = null;
let numeroPlatos = null;
let numeroSlides = null;
let navPlatos = null;

async function consultarAPI(){
    try {
        const url = '/api/productos';
        const resultado = await fetch(url);
        const JsonDePlatos = await resultado.json();
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

    platosObject = platosTotalObject.filter((plato)=>plato.CATEGORIA === "1"); // convertimos el json a un objeto JS
    numeroPlatos = Object.keys(platosObject).length; // numero de elementos del objeto
    numeroSlides = numeroPlatos/4;
    numeroSlides =  Math.ceil(numeroSlides);

    navPlatos = slidesPlatos(numeroSlides);
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


let arregloDePlatosStorage = (arregloDePlatosStorageRecuperado != null) ?arregloDePlatosStorageRecuperado : [] ;

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

function botonCarrito(){
    carrito.addEventListener('click',()=>{
        contenidoCarrito();
        botones_borrar();
        activarDesactivarCarrito();
    });
}
botonCarrito();

function contenidoCarrito(){
    vaciarCarrito();
    let precioTotal = 0;
    let i = 0; //contador para asignar id a cada plato
    arregloDePlatosStorageRecuperado = sessionStorage.getItem('Platos');
    arregloDePlatosStorageRecuperado = JSON.parse(arregloDePlatosStorageRecuperado);
    
    arregloDePlatosStorageRecuperado.forEach((platoRecuperado)=>{
        agregarPlatoAlCarrito(platoRecuperado, i);
        precioTotal+= Number(platoRecuperado.precio);
        i++;
    });
    
    let total=document.createElement('P')
        total.classList.add('precioTotal');
        total.innerHTML = precioTotal;
    infoPedido.appendChild(total);
}

function vaciarCarrito(){
    while(infoPedido.children[1]){
        infoPedido.removeChild(infoPedido.children[1]);
    }
}

function agregarPlatoAlCarrito(objeto, id){
    let platoCarrito = document.createElement('DIV');
    platoCarrito.classList.add("plato-carrito");
    platoCarrito.id = `${id}`;

    let nombre = document.createElement('P');
        nombre.classList.add('nombrePlatoEnCarrito');
        nombre.innerHTML = objeto.nombre;
    let precio = document.createElement('P');
        precio.innerHTML = objeto.precio;
    let botonEliminarPlato = document.createElement('I');
        botonEliminarPlato.classList.add('botonEliminarPlato');
        botonEliminarPlato.innerHTML = "<span class='material-symbols-outlined'>delete</span>"; 

    platoCarrito.appendChild(nombre);
    platoCarrito.appendChild(precio);
    platoCarrito.appendChild(botonEliminarPlato);

    infoPedido.appendChild(platoCarrito);

    
}


function botonesAddPlato(){
    
    let botonesAdd = document.querySelectorAll(".boton--agregar--plato");
    for (const botonAdd of botonesAdd) {
        botonAdd.addEventListener('click',()=>{
            let infoPlato = botonAdd.closest('.detalles-plato'); //padre del boton donde estaran el nombre y precio
            let nombrePlato = infoPlato.querySelectorAll('.titulo-plato')[0].textContent;
            let precioPlato = infoPlato.querySelectorAll('.precio--plato')[0].textContent;

            var platoDeOrden = {
                nombre: nombrePlato,
                precio: precioPlato
            }

            arregloDePlatosStorage.push(platoDeOrden);
            
            sessionStorage.setItem('Platos',JSON.stringify(arregloDePlatosStorage))    

            mensajePlatoAgregado();
        })   
    }
}

botonesAddPlato()

function botones_borrar(){
    let botonesBorrar = document.querySelectorAll(".botonEliminarPlato")
    botonesBorrar.forEach((botonBorrar)=>{
        botonBorrar.addEventListener('click', ()=>{
            let idAeliminar = botonBorrar.parentNode.id;
            arregloDePlatosStorage.splice(idAeliminar,1);
            sessionStorage.setItem('Platos',JSON.stringify(arregloDePlatosStorage))
            contenidoCarrito();
            botones_borrar();
        });
    })
}


function iniciarApp(){
    console.log("Iniciando APP");
    //llenado de platos (en slide 1 por defecto)
    let listaDePlatos = llenarPlatos(platosObject, numeroPlatos,1);

    //se agrega el nav de platos(slides)
    carta.appendChild(navPlatos);

    let sizeWindow = window.innerHeight/1.1;

    // se selecciona a todos los elento con clase .foto-plato
    imagenesPlatos = document.querySelectorAll(".foto-plato");

    // hacemos que listaDePlatos pueda ser iterable, con childen, se usara en las funciones de scroll
    platos = listaDePlatos.children;

    
    scrollAnimation(platos,sizeWindow);
    scrollAnimation(bebidas,sizeWindow);
    popEffect(imagenesPlatos, sizeWindow);
    accionBotonesNavPlatos();
    accionCategoriaPlatos();
    botonesAddPlato();
}

//FUNCIONES 

//?EFECTO DE SUBRAYADO Y ACCION DE CADA BOTON CATEGORIA DE CARTA
function accionCategoriaPlatos(){
    for(const p of navp ){
        p.addEventListener('click',()=>{
            borrarSub();
            p.classList.add('nav-active');
            let tipo = p.id;
            platosObject = platosTotalObject.filter((plato)=>plato.CATEGORIA == tipo);
            numeroPlatos = platosObject.length;
            
            vaciarPlatos(carta); // vaciamos carta para rellenarla
            let listaDePlatos = llenarPlatos(platosObject, numeroPlatos,1);
            platos = listaDePlatos.children; //children para poder iterar sobre los elementos como si fuera un arreglo
            
            let sizeWindow = window.innerHeight/1.1 ;
            scrollAnimation(listaDePlatos.children,sizeWindow);
            imagenesPlatos = document.querySelectorAll(".foto-plato");
            popEffect(imagenesPlatos, sizeWindow);

            numeroSlides = numeroPlatos/4;
            numeroSlides =  Math.ceil(numeroSlides);
            navPlatos = slidesPlatos(numeroSlides);
            
            accionBotonesNavPlatos();
            botonesAddPlato(); // actualizamos los botones Add de los platos
            carta.appendChild(navPlatos); // agregamos todo el nuevo contenido nuevamente a la carta
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
    scrollAnimation(bebidas,sizeWindow);
    popEffect(imagenesPlatos, sizeWindow) ;
}

function borrarSub(){
    for(const p of navp ){
        if(p.classList.contains('nav-active')){
            p.classList.remove('nav-active');
        }
    }
}

//?GENERACION DE PLATOS A PARTIR DE JSON*/
function llenarPlatos(platosObject, numeroPlatos, slideActual){
    let platos = document.createElement('DIV');
        platos.classList.add('platos');

    // El slide tomara los 4 primeros elementos del total de platos, y luego los 4 siguientes 
    slideActual = 4 * (slideActual - 1);

    for(let i=slideActual; i<slideActual+4; i++){
        if(i == numeroPlatos) break; // despues de esto ya no existen mas platos
        const nombre = platosObject[i]["NOMBRE"];
        const precio = platosObject[i]["PRECIO"];
        const descripcion = platosObject[i]["DESCRIPCION"];
        const foto = platosObject[i]["foto"];
        platoNuevo = crearPlato(nombre,precio,descripcion,nombre);
        platos.appendChild(platoNuevo);
    }
    carta.appendChild(platos);
    return platos;
}

function slidesPlatos(numeroSlides){
    const navPlatos = document.createElement('NAV');
        navPlatos.classList.add('nav--platos');

    for(let i=1; i<=numeroSlides; i++){
        const slide = document.createElement('BUTTON');
            slide.classList.add('boton-nav--platos');
            slide.innerHTML = `${i}`;

        navPlatos.appendChild(slide);
    }
    return navPlatos;
}

//! tremenda chorreada de codigo :v, funciona pero no se como hacerlo mas corto xd
function crearPlato(nombre, precio, descripcion, photo){
    const platoCreado = document.createElement('DIV');
    platoCreado.classList.add("plato");
    
    //-----IMAGEN DE PLATO
    const fotoPlato = document.createElement('DIV');
    fotoPlato.classList.add('foto-plato');
    
    const imgPlato = document.createElement('IMG');
    const src = `build/img/svgs-platos/${photo}.svg`;
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
            divToOrder.appendChild(boton_personalizar);
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
            let slideActual = boton.innerHTML;
            
            vaciarPlatos(carta);
            let listaDePlatos = llenarPlatos(platosObject, numeroPlatos,slideActual);
    
            let sizeWindow = window.innerHeight/1.1;
            scrollAnimation(listaDePlatos.children,sizeWindow);
            imagenesPlatos = document.querySelectorAll(".foto-plato");
            popEffect(imagenesPlatos, sizeWindow);
    
            carta.appendChild(navPlatos);

            /*Cada vez que se accione el boton de navegacion de platos, se llama a la
            funcion scrollVentana() para que cargue todas las animaciones.*/
            scrollVentana();
            botonesAddPlato();//actualizamos la lista de botones Add y su funcionalidad
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