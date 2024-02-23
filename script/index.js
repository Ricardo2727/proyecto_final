



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

// rellena si usuario logeado 
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

// ingresar para buscar usuario existente
if (botonIngresar !== null) {

    botonIngresar.addEventListener("click", () => {

        const siExiste = BBDD.find((persona) => {
            return persona.usuario === usuarioALoguear.usuario && persona.contraseña === usuarioALoguear.password
        })

        if (siExiste !== undefined) {
            localStorage.setItem("isLog", JSON.stringify({ usuario: usuarioALoguear.usuario }))
            
            contenedor.innerHTML = `<h2 id="contenedorUsuario" class="colorCrema tamGrande focus-in-contract-bck"> ${siExiste.usuario}, Bienvenido a Club KOP nuevamente!</h2> 
            <ul class="clubkop__padNone clubkop__flex">
                <li>
                    <div class="boton  txtBoton vibrate-1 ">
                        <a class="colorCrema " href="./paginas/clubkop.html">IR A CLUB KOP </a>
                    </div>
                </li>
            </ul>`
        } else {
            //si no existe popup
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
        localStorage.removeItem('carrito');
        window.location.href = "./index.html";
    })
}

// aplicacion de API
// Fn para obtener los datos de clima por coordenadas
async function obtenerDatosClima(latitud, longitud, apiKey) {
    try {
        // Construir la URL de la solicitud
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${apiKey}&lang=es`;

        // Realizar la solicitud a la API de OpenWeatherMap
        const response = await fetch(apiUrl);
        
        // Verificar si la solicitud fue exitosa
        if (response.ok) {
            // Convertir la respuesta a formato JSON y retornar los datos de clima
            return await response.json();
        } else {
            // Si la solicitud no es exitosa, retornar null
            return null;
        }
    } catch (error) {
        console.error('Hubo un error:', error);
        // En caso de error, retornar null
        return null;
    }
}


// Llamar a la función para obtener los datos de clima utilizando las coordenadas de Buenos Aires
obtenerDatosClima(-34.6132, -58.3772, 'bb76530cf57b347736e163adc36c0b8e')
    .then(data => {
        console.log('Datos de clima de Buenos Aires:', data);

        const contenedorClima = document.querySelector("#contenedorClima")
        const ciudad = data.name;
        const temp = (data.main.temp / 10).toFixed(1);
        

        data.weather.forEach((clima)=> {

            const div = document.createElement("div")
            const img = document.createElement("img")
            const h4 = document.createElement ("h4")
            const h5 = document.createElement ("h5")
            const h6 = document.createElement ("h6")
            const icon = clima.icon
            
            
            const imgURL = "https://openweathermap.org/img/wn/"+ icon + "@2x.png"
            
           
            img.src = imgURL
            div.className = "Clima"
            h4.innerText = temp + "°"
            h5.innerText= ciudad
            h6.innerText= FirstLetter(clima.description);
            div.appendChild(img)
            div.appendChild(h6)
            div.appendChild(h4)
            div.appendChild(h5)
            
            contenedorClima.appendChild(div)
            
        })

        // Aquí puedes realizar cualquier operación con los datos de clima que hayas obtenido
    })
    .catch(error => {console.error('Hubo un error al obtener los datos de clima:', error)});

// Fn para la primera letra de una cadena
function FirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}