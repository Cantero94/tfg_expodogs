/* document.addEventListener("DOMContentLoaded", function () {
    const mensajeModal = document.getElementById("mensajeModal");
    const mensajeTexto = document.getElementById("mensajeTexto");

    if (window.mensaje && window.mensaje.trim() !== "") {
        mensajeTexto.textContent = window.mensaje;
        
        const modal = new bootstrap.Modal(mensajeModal);
        modal.show();
    }
}); */
document.addEventListener("DOMContentLoaded", function () {
    const mensajeModal = document.getElementById("mensajeModal");
    const mensajeTexto = document.getElementById("mensajeTexto");
  
    // ✅ Creamos la instancia solo una vez al inicio
    const modalInstancia = new bootstrap.Modal(mensajeModal);
  
    if (window.mensaje && window.mensaje.trim() !== "") {
      mensajeTexto.textContent = window.mensaje;
  
      // ✅ Mostramos el modal con la instancia única
      modalInstancia.show();
    }
  });
  