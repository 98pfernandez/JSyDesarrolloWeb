const body = document.querySelector("body");

//Numero de items del carrito
const nodoCarrito = document.querySelector("#contadorCarrito");

body.onload = () => {
    //CUANDO CARGA EL HTML OBTIENE LA CANTIDAD DE ITEMS QUE HAY EN EL CARRITO. SI ES LA PRIMERA VEZ QUE SE EJECUTA SE CREA EL ITEM
    let numeroDeItemsCarrito = localStorage.getItem("cantidadItemCarrito");

    //USO DE OPERADOR AND
    (numeroDeItemsCarrito == null || numeroDeItemsCarrito == '') && localStorage.setItem("cantidadItemCarrito", "0");

    nodoCarrito.innerText = localStorage.getItem("cantidadItemCarrito");
}