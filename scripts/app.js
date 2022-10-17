const body = document.querySelector("body");
const carrito = document.querySelector("#bttCarrito");

//Botones de comprar por cada producto
const buttonProject1 = document.querySelector("#bttProyecto1");
const buttonProject2 = document.querySelector("#bttProyecto2");
const buttonProject3 = document.querySelector("#bttProyecto3");
const buttonProject4 = document.querySelector("#bttProyecto4");

//Numero de items del carrito
const nodoCarrito = document.querySelector("#contadorCarrito");

const productosComprados = JSON.parse(localStorage.getItem("producto")) == null ? [] : JSON.parse(localStorage.getItem("producto"));

//DIV DONDE SE MUESTRA MENSAJE DE producto COMPRADOS
const msjProductoComprado = document.querySelector("#msjProductoComprado");


body.onload = () => {
    //CUANDO CARGA EL HTML OBTIENE LA CANTIDAD DE ITEMS QUE HAY EN EL CARRITO. SI ES LA PRIMERA VEZ QUE SE EJECUTA SE CREA EL ITEM
    let numeroDeItemsCarrito = localStorage.getItem("cantidadItemCarrito");

    //USO DE OPERADOR AND
    (numeroDeItemsCarrito == null || numeroDeItemsCarrito == '') && localStorage.setItem("cantidadItemCarrito", "0");

    nodoCarrito.innerText = localStorage.getItem("cantidadItemCarrito");
}

carrito.onclick = () => {
    localStorage.setItem("producto", JSON.stringify(productosComprados))

    //ALMACENAMOS EN LA SESSION STORAGEe EL NUMERO DE ITEMS DEL CARRITO 
    localStorage.setItem("cantidadItemCarrito", nodoCarrito.textContent);
}

buttonProject1.onclick = () => {
    //Mostramos el mensaje 2 segundos
    msjProductoComprado.style.visibility = "visible";
    msjProductoComprado.innerHTML = "<h2>Agregaste Software de Finanzas al carrito</h2>"
    setTimeout(() => {(msjProductoComprado.style.visibility = "hidden")}, 2500);
    sumarItemCarrito(nodoCarrito);

    agregarItemCarrito(1, "Software de Finanzas", 200, "../assets/img/project1.png")
}


buttonProject2.onclick = () => {
    //Mostramos el mensaje 2 segundos
    msjProductoComprado.style.visibility = "visible";
    msjProductoComprado.innerHTML = "<h2>Agregaste ECommerce al carrito</h2>"
    setTimeout(() => {(msjProductoComprado.style.visibility = "hidden")}, 2500);
    sumarItemCarrito(nodoCarrito)
    
    agregarItemCarrito(2, "ECommerce", 500, "../assets/img/project2.png")

}

buttonProject3.onclick = () => {
    //Mostramos el mensaje 2 segundos
    msjProductoComprado.style.visibility = "visible";
    msjProductoComprado.innerHTML = "<h2>Agregaste portal de noticias al carrito</h2>"
    setTimeout(() => {(msjProductoComprado.style.visibility = "hidden")}, 2500);
    
    sumarItemCarrito(nodoCarrito)
    agregarItemCarrito(3, "Portal de noticias", 150, "../assets/img/project3.png")
}

buttonProject4.onclick = () => {
    //Mostramos el mensaje 2 segundos
    msjProductoComprado.style.visibility = "visible";
    msjProductoComprado.innerHTML = "<h2>Agregaste el caja registradora al carrito</h2>"
    setTimeout(() => {(msjProductoComprado.style.visibility = "hidden")}, 2500);
    
    sumarItemCarrito(nodoCarrito)
    agregarItemCarrito(4, "Cajas registradora", 450, "../assets/img/project4.png")
}

function agregarItemCarrito(idProducto, nombreProducto, precioProducto, imagenProducto) {
    if (productosComprados.some(curso => curso.id === idProducto)) {
        //Si ya existe el producto con ID=x, para esa posicion le sumamos uno a la cantidad
        productosComprados.forEach(curso => {
            if (curso.id === idProducto) {
                curso.cantidad ++ ;
            }
        });
    } else {
        //Si no existe el producto con ID=x lo creamos y lo pusheamos al Array
        productosComprados.push(new Producto(idProducto, nombreProducto, precioProducto, imagenProducto))
    }
}

function sumarItemCarrito(carritoNumero) {
    //Aumenta en 1 la cantidad de items del carrito.
    carritoNumero.innerText = parseInt(carritoNumero.textContent) + 1
}

class Producto {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
        this.moneda= "USD";
    }
}