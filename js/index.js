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
        email: "s@gmail,com"
    }
]

const botonIniciar = document.querySelector("#btn-iniciar");
const contenedor = document.querySelector("#contenedorUsuario");
const inputs = document.querySelectorAll("input");

const isLog = JSON.parse (localStorage.getItem ("isLog")) ?? {}

const pintar = (nombre) => {contenedor.innerHTML = `<h2 id="contenedorUsuario" class="colorCrema posH2"> ${nombre}, Bienvenido a Club KOP nuevamente!</h2>`}
isLog.usuario && pintar(" " + isLog.usuario)
    

const usuarioALoguear = {
    usuario:'',
    password: '',
    confirmarPassword: ''
}

inputs.forEach((input) => {
    input.addEventListener("input", (event)=>{
        const {name, value} = event.target
        usuarioALoguear[name] = value
        
    })
})

botonIniciar.addEventListener("click", () => {
    
    const siExiste = BBDD.find((persona)=> {
        return persona.usuario === usuarioALoguear.usuario && persona.contraseña === usuarioALoguear.password
    })
    
    if(siExiste !== undefined){
        localStorage.setItem("isLog", JSON.stringify({usuario:usuarioALoguear.usuario}))
        console.log(usuarioALoguear);
        contenedor.innerHTML =  `<h2 id="contenedorUsuario" class="colorCrema posH2"> ${siExiste.usuario}, Bienvenido a Club KOP nuevamente!</h2>`
    }else{
        console.log("Usuario no registrado")
    }

})