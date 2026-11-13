
const informacionHome = {
    titulo: "Bienvenido a Atención de Accidentes",
    descripcion: "Estamos aquí para ayudarte a reportar y dar seguimiento a situaciones de accidentes de manera rápida y sencilla.",
    boton: "Comenzar"
};

// Información de los módulos
const modulos = [
    {
        titulo: "Reportar un accidente",
        descripcion: "Registra un accidente para que pueda recibir atención y seguimiento.",
        enlace: "login.html",
        boton: "Reportar"
    },
    {
        titulo: "Seguimiento de accidentes",
        descripcion: "Consulta información y actualizaciones relacionadas con los accidentes registrados.",
        enlace: "login.html",
        boton: "Consultar"
    }
];

// Cargar información del Home
document.addEventListener("DOMContentLoaded", () => {

    const titulo = document.getElementById("titulo-home");
    const descripcion = document.getElementById("descripcion-home");
    const boton = document.getElementById("boton-home");
    const contenedor = document.getElementById("contenedor-modulos");

    if (titulo) {
        titulo.textContent = informacionHome.titulo;
    }

    if (descripcion) {
        descripcion.textContent = informacionHome.descripcion;
    }

    if (boton) {
        boton.textContent = informacionHome.boton;
    }

    // Crear módulos desde JavaScript
    if (contenedor) {
        modulos.forEach(modulo => {

            const tarjeta = document.createElement("article");
            tarjeta.classList.add("tarjeta");

            tarjeta.innerHTML = `
                <h3>${modulo.titulo}</h3>
                <p>${modulo.descripcion}</p>
                <a href="${modulo.enlace}" class="boton-modulo">
                    ${modulo.boton}
                </a>
            `;

            contenedor.appendChild(tarjeta);
        });
    }

});

