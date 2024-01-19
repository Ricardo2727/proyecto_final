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


