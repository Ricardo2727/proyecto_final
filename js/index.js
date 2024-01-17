const BBDD = [
    {
        nombre: "Ricardo",
        usuario: "rich",
        contraseña: "123",
        email: "r@gmail,com"
    },
    {
        nombre: "Sol",
        usuario: "s@gmail.com",
        contraseña: "456",
        email: "s@gmail.com"
    }
]

const botonIniciar = document.querySelector("#btn-iniciar");
const contenedor = document.querySelector("#contenedorUsuario");
const inputs = document.querySelectorAll("input");
const contenedor2 = document.querySelector("#userOffLog");
const isLog = JSON.parse(localStorage.getItem("isLog")) ?? {}

const pintar = (nombre) => {
    contenedor.innerHTML = `<h2 id="contenedorUsuario" class="colorCrema tamGrande focus-in-contract-bck"> ${nombre}, Bienvenido a Club KOP nuevamente!</h2> 
                            <ul class="clubkop__padNone">
                            <li>
                                <div class="boton txtBoton vibrate-1 ">
                                    <a class="colorCrema" href="./paginas/clubkop.html">IR A CLUB KOP</a>
                                </div>
                            </li>
                            </ul>`}
isLog.usuario && pintar(isLog.usuario)

console.log(isLog.usuario);
if (isLog.usuario === undefined) {
    if (contenedor2) {
        contenedor2.innerHTML = `<div id="userOffLog"></div>`;
    } else {
        console.error("El contenedor2 no se encontró en el DOM");
    }
}


const usuarioALoguear = {
    usuario: '',
    password: '',
    confirmarPassword: '',
    nombre: '',
    email: ''
    
}

inputs.forEach((input) => {
    input.addEventListener("input", (event) => {
        const { name, value } = event.target
        usuarioALoguear[name] = value

    })
})

botonIniciar.addEventListener("click", () => {

    const siExiste = BBDD.find((persona) => {
        return persona.usuario === usuarioALoguear.usuario && persona.contraseña === usuarioALoguear.password
    })

    if (siExiste !== undefined) {
        localStorage.setItem("isLog", JSON.stringify({ usuario: usuarioALoguear.usuario }))
        console.log(usuarioALoguear);
        contenedor.innerHTML = `<h2 id="contenedorUsuario" class="colorCrema tamGrande focus-in-contract-bck"> ${siExiste.usuario}, Bienvenido a Club KOP nuevamente!</h2> 
                            <ul class="clubkop__padNone">
                            <li>
                                <div class="boton txtBoton vibrate-1 ">
                                    <a class="colorCrema" href="./paginas/clubkop.html">IR A CLUB KOP</a>
                                </div>
                            </li>
                            </ul>`
    } else {
        console.log("Usuario no registrado")
    }

})