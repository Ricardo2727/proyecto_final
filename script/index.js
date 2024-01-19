
export const BBDD = JSON.parse(localStorage.getItem("BBDD")) || [
    {
        nombre: "Ricardo",
        usuario: "rich",
        contraseña: "123",
        email: "r@gmail.com"
    },
    {
        nombre: "Sol",
        usuario: "s@gmail.com",
        contraseña: "456",
        email: "s@gmail.com"
    }
]

export const isLog = JSON.parse(localStorage.getItem("isLog")) ?? {}

const botonIngresar = document.querySelector("#btn-ingresar");
const contenedor = document.querySelector("#contenedorUsuario");
const inputs = document.querySelectorAll("input");
const botonUnirme = document.querySelector("#btn-unirme");
const botonCerrarSesion = document.querySelector("#btn-cerrarSesion");


const rellenar = (nombre) => {
    if (contenedor !== null) {
        contenedor.innerHTML = `<h2 id="contenedorUsuario" class="colorCrema tamGrande focus-in-contract-bck"> ${nombre}, Bienvenido a Club KOP nuevamente!</h2> 
                            <ul class="clubkop__padNone clubkop__flex">
                                <li>
                                    <div class="boton  txtBoton vibrate-1 ">
                                        <a class="colorCrema " href="./paginas/clubkop.html">IR A CLUB KOP </a>
                                    </div>
                                </li>
                            </ul>`}
}
isLog.usuario && rellenar(isLog.usuario);


const usuarioALoguear = {
    usuario: '',
    password: '',
    nombre: '',
    email: ''

}

inputs.forEach((input) => {
    input.addEventListener("input", (event) => {
        const { name, value } = event.target
        usuarioALoguear[name] = value

    })
})

console.log(usuarioALoguear);
if (botonIngresar !== null) {

    botonIngresar.addEventListener("click", () => {

        const siExiste = BBDD.find((persona) => {
            return persona.usuario === usuarioALoguear.usuario && persona.contraseña === usuarioALoguear.password
        })

        if (siExiste !== undefined) {
            localStorage.setItem("isLog", JSON.stringify({ usuario: usuarioALoguear.usuario }))
            console.log(usuarioALoguear);
            contenedor.innerHTML = `<h2 id="contenedorUsuario" class="colorCrema tamGrande focus-in-contract-bck"> ${siExiste.usuario}, Bienvenido a Club KOP nuevamente!</h2> 
            <ul class="clubkop__padNone clubkop__flex">
                <li>
                    <div class="boton  txtBoton vibrate-1 ">
                        <a class="colorCrema " href="./paginas/clubkop.html">IR A CLUB KOP </a>
                    </div>
                </li>
            </ul>`
        } else {
            console.log("Usuario no registrado")
            Swal.fire({
                title: "¡Usuario no registrado!",
                text: "Registrate y disfruta de los beneficios de Club KOP",
                icon: "error"
            });
        }

    })
}

//boton unirme al clubkop
if (botonUnirme !== null) {
    botonUnirme.addEventListener("click", () => {
        localStorage.setItem("BBDD", JSON.stringify(BBDD));
        window.location.href = "./paginas/clubkop.html#clubkopform";
    })
}

//boton para cerrar sesion
if (botonCerrarSesion !== null) {
    botonCerrarSesion.addEventListener("click", () => {
        localStorage.removeItem("isLog");
        window.location.href = "./index.html";
    })
}


console.log(BBDD);

