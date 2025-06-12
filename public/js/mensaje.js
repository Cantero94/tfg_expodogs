// Lógica para el mensaje modal de /partials/mensajeModal.pug
document.addEventListener("DOMContentLoaded", function () {
    const mensajeModal = document.getElementById("mensajeModal");
    const mensajeTexto = document.getElementById("mensajeTexto");

    if (window.mensaje && window.mensaje.trim() !== "") {
        mensajeTexto.textContent = window.mensaje;
        
        const modal = new bootstrap.Modal(mensajeModal);
        modal.show();
    }
});

  