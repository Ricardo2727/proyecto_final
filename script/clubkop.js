import { BBDD } from "./index.js";
import { isLog } from "./index.js";
console.log(isLog.usuario);


const contenedor2 = document.querySelector("#userOffLog");
const formularioInscripcion = document.getElementById("formularioInscripcion");


if (isLog.usuario === undefined) {
    if (contenedor2) {
        contenedor2.innerHTML = `<div id="userOffLog"></div>`;
    } else {
        console.error("El contenedor2 no se encontró en el DOM");
    }
}



document.getElementById("btn-inscribirse").addEventListener("click", function () {
    // Obtener valores del formulario
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const usuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("contrasena").value;

    // Verificar si el usuario ya existe en la base de datos
    const usuarioExistente = BBDD.find((persona) => persona.usuario === usuario);

    if (usuarioExistente) {
        console.log("El nombre de usuario ya está en uso. Por favor, elige otro.");
        Swal.fire({
            title: "¡Usuario existente!",
            text: "El nombre de usuario ya está en uso. Por favor, elige otro.",
            icon: "warning"
        });
    } else {
        // Crear un nuevo objeto de usuario
        const nuevoUsuario = {
            nombre: nombre,
            usuario: usuario,
            contraseña: contrasena,
            email: correo
        };

        // Agregar el nuevo usuario a la base de datos
        BBDD.push(nuevoUsuario);

        // Puedes almacenar la base de datos actualizada en localStorage si lo necesitas
        localStorage.setItem("BBDD", JSON.stringify(BBDD));

        // Puedes redirigir a otra página, mostrar un mensaje, etc.
        console.log("Usuario inscrito exitosamente:", nuevoUsuario);

        Swal.fire({
            title: "¡Usuario inscrito exitosamente!",
            text: "Bienvenido a Club KOP!! Ahora solo te toca disfrutar de todos nuestros beneficios.",
            icon: "success"
        });

        // Limpiar el formulario
        formularioInscripcion.reset();
    }
});






const productos = [
    {
        nombre: 'Bolsa reutilizable',
        precio: 2000,
        imagen: "../img/kopshop/bolsa.png"
    },
    {
        nombre: 'Cafe Naranjo',
        precio: 5000,
        imagen: "../img/kopshop/cafenar.png"
    },
    {
        nombre: 'Cafe Verde',
        precio: 5000,
        imagen: "../img/kopshop/cafeverde.png"
    },
    {
        nombre: 'Cafe Tarrito',
        precio: 10000,
        imagen: "../img/kopshop/cafetarro.png"
    },
    {
        nombre: 'Remera',
        precio: 7000,
        imagen: "../img/kopshop/remeras.png"
    },
]






let carrito = []
const productosCont = document.querySelector("#productosContenedor")
const carritoCont = document.querySelector("#carritoContenedor")
const verCarrito = document.querySelector("#verCarrito")
const tienda = document.querySelector("#tienda")

// Cargar los elementos del carrito desde el localStorage
if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'));
}
// verCarrito.addEventListener('click', () => {


//     if (carrito.length === 0) {
//         // carritoContenido.innerHTML = '<p>Carrito vacío</p>';
//         Swal.fire({
//             title: "¡"+ isLog.usuario + ",  tu Carrito de compras está vacío!",
//             text: "Hacé click en 'Agregar Producto' segun tu preferencia",
//             icon: "warning"
//         });
//     } else {
//         carritoCont.innerHTML = '';
//         carrito.forEach((prodCarrito) => {
//             carritoCont.innerHTML += `
//                 <div>
//                     <img src="${prodCarrito.imagen}">
//                     <p>Nombre: ${prodCarrito.nombre}</p>
//                     <p>Precio: ${prodCarrito.precio}</p>
//                 </div>`;
//         });
//     }
// });

verCarrito.addEventListener('click', () => {
    if (carrito.length === 0) {
        Swal.fire({
            title: "¡" + isLog.usuario + ",  tu Carrito de compras está vacío!",
            text: "Hacé click en 'Agregar Producto' según tu preferencia",
            icon: "warning"
        });
    } else {
        carritoCont.innerHTML = '';
        // agrego título al carrito
        carritoCont.innerHTML += '<h2 class= "tamMediano colorCafe">Carrito de Compras</h2>';

        carrito.forEach((prodCarrito) => {
            carritoCont.innerHTML += `
                <div class="cardCarrito">
                    <img class="imgCard" src="${prodCarrito.imagen}">
                    <div class="prodCarrito">
                        <p>Nombre: ${prodCarrito.nombre}</p>
                        <p>Precio: ${prodCarrito.precio}</p>
                        <p>Cantidad: ${prodCarrito.cantidad}</p>
                    </div>
                    <hr>
                </div>`;
        });

        // total de la compra
        const totalCompra = carrito.reduce((total, prod) => total + (prod.precio * prod.cantidad), 0);
        carritoCont.innerHTML += `<p class= "prodCarrito tamMediano">Total de la compra: $${totalCompra}</p>`;

        // botón cerrar
        carritoCont.innerHTML += '<button class="btnProd" id="cerrarCarrito">CERRAR CARRITO</button>';

        // botón vaciar carrito
        carritoCont.innerHTML += '<button class="btnProd" id="vaciarCarrito">VACIAR CARRITO</button>';

        // click para botón cerrar
        const cerrarCarritoBtn = document.getElementById('cerrarCarrito');
        cerrarCarritoBtn.addEventListener('click', () => {
            carritoCont.innerHTML = '';
        });
        // click para botón vaciar
        const vaciarCarritoBtn = document.getElementById('vaciarCarrito');
        vaciarCarritoBtn.addEventListener('click', () => {
            carritoCont.innerHTML = '';
            // Limpiar el carrito y el localStorage
            carrito = [];
            localStorage.removeItem('carrito');
        });
    }
});




console.log(productosCont);
console.log(carritoCont);
productos.forEach((producto) => {

    const div = document.createElement('div')
    div.innerHTML =
        `   <div class="prod">
            <img class="imgCard" src="${producto.imagen}">
            <p> ${producto.nombre}</p>
            <p> Precio: $ ${producto.precio}</p>
            </div>
    `

    // boton para producto
    const boton = document.createElement('div');
    boton.innerHTML = `
    <div class="centrar">
        <input type="number" id="cantidad-${producto.nombre}" value="1" min="1" max="10">
        <button class="btnProd">Agregar producto</button>
    </div>
`;

    // solo el resultado del botón dentro del div
    const btnAgregarProducto = boton.querySelector('.btnProd');
    
    // agrego el evento de click al botón para mandar al carrito
    btnAgregarProducto.addEventListener('click', () => {
        const cantidad = parseInt(document.getElementById(`cantidad-${producto.nombre}`).value);
        const productoExistente = carrito.find(item => item.nombre === producto.nombre);
        if (productoExistente) {
            // si el producto ya está en el carrito, sumar la cantidad
            productoExistente.cantidad += cantidad;
        } else {
            // sino esta el producto, agregar al carrito
            const nuevoProducto = {
                nombre: producto.nombre,
                precio: producto.precio,
                imagen: producto.imagen,
                cantidad: cantidad
            };
            carrito.push(nuevoProducto);
        }
        // guardar el carrito actualizado en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));
        // mensaje agregado ok
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Se agregó el producto al carrito!",
            showConfirmButton: false,
            timer: 1500
        });
    });



    div.appendChild(boton)

    productosCont.appendChild(div)
})



if (isLog.usuario === undefined) {
    // si no hay usuario definido, ocultar la sección tienda
    tienda.style.display = "none";
} else {
    // Si hay usuario definido, mostrar la sección tienda
    tienda.style.display = "block";

}


