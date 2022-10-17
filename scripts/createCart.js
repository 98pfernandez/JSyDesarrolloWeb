const body = document.querySelector("body");
const listaCarrito = document.querySelector("#listaCarrito");
const listaCambio = document.querySelector("#cambio-select")

//CUANDO CARGA LA PAGINA SE GENERA EL CARRITO
body.onload = () => {
    localStorage.getItem("cantidadItemCarrito");
    const nodoCarrito = document.querySelector("#contadorCarrito");

    nodoCarrito.innerText = localStorage.getItem("cantidadItemCarrito");

    const productos = JSON.parse(localStorage.getItem("producto"));

    let divProductos = '';
    let precioTotal = 0;
    let cantidadTotal = 0;
    let moneda = productos[0].moneda;

    listaCambio.value=moneda;

    productos.forEach(element => {
        cantidadTotal += element.cantidad;
        precioTotal += element.precio * element.cantidad;

        let { nombre: nombreConDesestructuracion } = element;

        divProductos += "<div class='fila'><div class='imagenCarrito'><img class='imgCurso' src=" + element.img + "></div><div class='nombreCarrito'>" + nombreConDesestructuracion + "</div>  <div class='cantidadCarrito'>" + element.cantidad + "</div> <div class='precioCarrito'>" + element.precio.toFixed(2) + " "+moneda + "</div> <div class='totalCarrito'>" + (element.precio * element.cantidad).toFixed(2) + " " +moneda + "</div></div>";

    });
    //AGREGAMOS TOTALES DE CANTIDAD Y EFECTIVO
    divProductos += "<div class='fila'><div class='imagenCarrito'><img style=width:200px src='../assets/img/Transparent.gif'></div><div class='nombreCarrito'></div>  <div class='cantidadCarrito'>" + cantidadTotal + "</div> <div class='precioCarrito'></div> <div class='totalCarrito'>" + precioTotal.toFixed(2) + " "+moneda + "</div></div>";

    //AGREGAMOS BOTON
    divProductos += "<div><button id='botonComprar'>Comprar</button></div>"
    listaCarrito.innerHTML += divProductos;


    const bttComprar = document.querySelector("#botonComprar");

    bttComprar.onclick = () => {
        swal({
            title: "¿Desea comprar estos productos?",
            text: "Una vez que compre perdera sus items del carrito",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Gracias por su compra!", {
                        icon: "success",
                    });
                    setTimeout(() => {
                        (
                            localStorage.clear(),
                            location.replace("../index.html")
                        )
                    }, 2000);

                } else {
                    swal("Cancelo su compra");
                }
            });
    }
}





listaCambio.onchange = () => {
    const productos = JSON.parse(localStorage.getItem("producto"));
    const monedaBase = productos[0].moneda;
    const monedaDestino = listaCambio.value;

    var myHeaders = new Headers();
    myHeaders.append("apikey", "nof5YTvKprOOqQoEjMK7Kmw9UDKD5BXI");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    //Se implementa fetch con una API Rest de divisas para poder cambiar el tipo de moneda
    fetch("https://api.apilayer.com/exchangerates_data/convert?to=" + monedaDestino + "&from="+monedaBase+"&amount=1", requestOptions)
        .then(response => response.json())
        .then(result => {
            let montoDeCambio = result.result

            productos.forEach(element => {
                element.moneda = monedaDestino
                element.precio = element.precio * montoDeCambio
            });

            localStorage.setItem("producto", JSON.stringify(productos))
            location.reload();
        })
        .catch(error => console.log('error', error));
    }