const platosJson = `[
    {
       "nombre": "Ceviche de Calamar",
       "precio": 21,
       "descripcion": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
       "foto": "ceviche"
   },
    {
       "nombre": "Ceviche De Javier",
       "precio": 24,
       "descripcion": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
       "foto": "ceviche de javier"
   },
    {
       "nombre": "Jalea",
       "precio": 17,
       "descripcion": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
       "foto": "leche de tigre"
   },
    {
       "nombre": "Pizza",
       "precio": 19,
       "descripcion": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
       "foto": "conchitas"
   },
    {
       "nombre": "Pollo",
       "precio": 28,
       "descripcion": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
       "foto": "ceviche"
   },
    {
       "nombre": "Jalea",
       "precio": 22,
       "descripcion": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
       "foto": "conchitas"
   },
    {
       "nombre": "Pollo2",
       "precio": 22,
       "descripcion": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
       "foto": "ceviche"
   },
    {
       "nombre": "Chicharron",
       "precio": 19,
       "descripcion": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
       "foto": "conchitas"
   },
    {
       "nombre": "Ceviche de pescado",
       "precio": 20,
       "descripcion": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
       "foto": "ceviche de javier"
   },
    {
       "nombre": "Ceviche de pota",
       "precio": 26,
       "descripcion": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
       "foto": "leche de tigre"
   }
   
   
   ]`

const platosObject = JSON.parse(platosJson) // convertimos el json a un objeto JS
const numeroPlatos = Object.keys(platosObject).length // numero de elementos del objeto
let numeroSlides = numeroPlatos/4
    numeroSlides =  Math.ceil(numeroSlides)

let footer = document.querySelector("footer")
let header = document.querySelector("header")
let logo = document.querySelector(".logo")
let banner = document.querySelector(".banner")

let platos = document.createElement('DIV')
    platos.classList.add('platos')
// let platos = document.querySelectorAll(".plato") //lista de platos
    // platos = Array.from(platos); // Convertir a un arreglo

let imagenesPlatos = document.querySelectorAll(".foto-plato")


let bebidas = document.querySelectorAll(".bebida")

let navp = document.querySelectorAll(".nav-p")
let carta = document.getElementById('carta')

let vertical ;

let seguirAnimaciones=true;

let navPlatos = slidesPlatos(numeroSlides)
// console.log(navPlatos)


//* EVENTOS A CADA BOTON DEL SLIDE
for (const boton of navPlatos.children) {
    boton.addEventListener('click',()=>{
        let slideActual = boton.innerHTML

        vaciarPlatos(carta)
        let listaDePlatos = llenarPlatos(platosObject, numeroPlatos,slideActual)

        let sizeWindow = window.innerHeight/1.1
        scrollAnimation(listaDePlatos.children,sizeWindow)
        imagenesPlatos = document.querySelectorAll(".foto-plato")
        popEffect(imagenesPlatos, sizeWindow)

        carta.appendChild(navPlatos)
    })
}



window.addEventListener('load',()=>{

    //llenado de platos (en slide 1 por defecto)
    let listaDePlatos = llenarPlatos(platosObject, numeroPlatos,1)

    //se agrega el nav de platos(slides)
    carta.appendChild(navPlatos)

    let sizeWindow = window.innerHeight/1.1

    // se selecciona a todos los elento con clase .foto-plato
    imagenesPlatos = document.querySelectorAll(".foto-plato")

    // hacemos que listaDePlatos pueda ser iterable, con childen, se usara en las funciones de scroll
    platos = listaDePlatos.children

    scrollAnimation(platos,sizeWindow)
    scrollAnimation(bebidas,sizeWindow)
    popEffect(imagenesPlatos, sizeWindow)
})


window.addEventListener('scroll',()=>{
    
    //Efecto del scroll (grande-pequeño)
    vertical=  banner.getBoundingClientRect() ;
    scrollBanner(vertical.top) // de banner

    let sizeWindow = window.innerHeight/1.2
    imagenesPlatos = document.querySelectorAll(".foto-plato")   


    var scrollVertical = footer.getBoundingClientRect().top ;
    if(scrollVertical > 600  && seguirAnimaciones == true){ // Si se llega al fondo ya no se seguiran ejecutando las funciones siguientes, porque continuarion calculando la posicion de los elementos platos y bebidas,inncesario.
        scrollAnimation(platos,sizeWindow)
        scrollAnimation(bebidas,sizeWindow)
        popEffect(imagenesPlatos, sizeWindow)
    }else{
        seguirAnimaciones=false
    }
})

function scrollBanner(e){ // scroll de banner
    if(e <93){
        header.classList.add("header-scroll")
        logo.classList.add("logo-scroll")
    }else{
        if(header.classList.contains("header-scroll")){
            header.classList.remove("header-scroll")
        }
        logo.classList.remove("logo-scroll")
    }
}

function scrollAnimation(elementos, sizeWindow){
    for(let i=0; i<elementos.length;i++){
        let posElemento = elementos[i].getBoundingClientRect().top;
        if(posElemento < sizeWindow){
           elementos[i].style.animation = 'aparecer .5s ease-out 0s forwards, moverPlato .5s ease-out 0s forwards'
        }
    }
}
   
function popEffect(imagenesPlatos,sizeWindow){
    
    for (const elemento of imagenesPlatos) {
        // console.log(plato)
        let posElemento = elemento.getBoundingClientRect().top;
        // console.log(posElemento)
        if(posElemento < sizeWindow){
                elemento.style.animation = `pop .5s ease .3s forwards`
        }

    }
}

//*EFECTO DE SUBRAYADO EN CADA CATEGORIA DE CARTA
for(const p of navp ){
    p.addEventListener('click',()=>{
        borrarSub()
        p.classList.add('nav-active')
    })
}

function borrarSub(){
    for(const p of navp ){
        if(p.classList.contains('nav-active')){
            p.classList.remove('nav-active')
        }
    }
}


//*GENERACION DE PLATOS A PARTIR DE JSON*/

function slidesPlatos(numeroSlides){
    const navPlatos = document.createElement('NAV')
          navPlatos.classList.add('nav--platos')

    for(let i=1; i<=numeroSlides; i++){
        const slide = document.createElement('BUTTON')
              slide.classList.add('boton-nav--platos')
              slide.innerHTML = `${i}`

        navPlatos.appendChild(slide)
    }
    return navPlatos
}

function llenarPlatos(platosObject, numeroPlatos, slideActual){
    let platos = document.createElement('DIV')
        platos.classList.add('platos')

    // El slide tomara los 4 primeros elementos del total de platos, y luego los 4 siguientes 
    slideActual = 4 * (slideActual - 1)

    for(let i=slideActual; i<slideActual+4; i++){
        if(i == numeroPlatos) break; // despues de esto ya no existen mas platos
        const nombre = platosObject[i]["nombre"]
        const precio = platosObject[i]["precio"]
        const descripcion = platosObject[i]["descripcion"]
        const foto = platosObject[i]["foto"]
        platoNuevo = crearPlato(nombre,precio,descripcion,foto)
        platos.appendChild(platoNuevo)
    }
    // console.log(platos.childNodes[2])
    carta.appendChild(platos)
    return platos
}


//! tremenda chorreada de codigo :v, funciona pero no se como hacerlo mas corto xd
function crearPlato(nombre, precio, descripcion, photo){
    const platoCreado = document.createElement('DIV')
    platoCreado.classList.add("plato")
    
    //-----IMAGEN DE PLATO
    const fotoPlato = document.createElement('DIV')
    fotoPlato.classList.add('foto-plato')
    
    const imgPlato = document.createElement('IMG')
    const src = `svgs-platos/${photo}.svg`
    imgPlato.setAttribute(`src`,src)
    
    fotoPlato.appendChild(imgPlato)
    //-----FIN IMAGEN DE PLATO
    
    //*-----DETALLES PLATO
    const detallesPlato = document.createElement('DIV')
    detallesPlato.classList.add('detalles-plato')
    
        const tituloPlato = document.createElement('H3')
        tituloPlato.innerHTML= `${nombre}`
    
        const descripcionPlato = document.createElement('P')
        descripcionPlato.classList.add('descripcion')
        descripcionPlato.innerHTML= `${descripcion}`
    
    
        //-----DIV SEPARAR A BORDES
    
        const divSeparar = document.createElement('DIV')
        divSeparar.classList.add('separar-a-bordes')
    
    
    
            // -----------------------------------DIV TO ORDER
            const divToOrder = document.createElement('DIV')
            divToOrder.classList.add('to-order')
    
            const boton_agregar = document.createElement('BUTTON')
            boton_agregar.classList.add('boton')
            boton_agregar.classList.add('boton--agregar')
            boton_agregar.innerHTML = `Add`
    
            const boton_personalizar = document.createElement('BUTTON')
            boton_personalizar.classList.add('boton')
            boton_personalizar.classList.add('boton--personalizar')
            boton_personalizar.innerHTML = `Mod`
    
            divToOrder.appendChild(boton_agregar)
            divToOrder.appendChild(boton_personalizar)
            // -----------------------------------FIN TO ORDER
    
        const precioPlato = document.createElement('P')
        precioPlato.classList.add('precio')
        precioPlato.classList.add('precio--plato')
        precioPlato.innerHTML= `${precio}`
    
        divSeparar.appendChild(divToOrder)
        divSeparar.appendChild(precioPlato)
        //-----FIN SEPARAR A BORDES
    
    
    detallesPlato.appendChild(tituloPlato)
    detallesPlato.appendChild(descripcionPlato)
    detallesPlato.appendChild(divSeparar)
    //*-----FIN DETALLES PLATO
    
    
    //Agregado todo a un Plato
    platoCreado.appendChild(fotoPlato)
    platoCreado.appendChild(detallesPlato)

    return platoCreado
}


//* Se usa para vacias los platos y slides.
function vaciarPlatos(elemento) {
    // elemento.removeChild(elemento.childNodes[2]);
    elemento.removeChild(elemento.children[2])
    elemento.removeChild(elemento.children[2])

}