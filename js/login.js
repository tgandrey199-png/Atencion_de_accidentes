
const formulario = document.getElementById("form-login");
const mensaje = document.getElementById("mensaje");

formulario.addEventListener("submit", function(evento) {

    evento.preventDefault();

    const correo = document.getElementById("correo").value.trim();
    const contrasena = document.getElementById("contrasena").value.trim();

    if (correo === "" || contrasena === "") {
        mensaje.textContent = "Completa todos los campos.";
        return;
    }

    // Acceso de demostración
    window.location.href = "home.html";

});
