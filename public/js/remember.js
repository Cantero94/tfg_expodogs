// Lógica para el formulario de recordar contraseña en /partials/rememberModal.pug
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formRecordarPassword");
    const emailInput = document.getElementById("emailRecuperacion");
    const emailError = document.getElementById("emailRecuperacionError");
    const rememberModal = new bootstrap.Modal(document.getElementById("rememberModal"));
    const mensajeModal = new bootstrap.Modal(document.getElementById("mensajeModal"));
    const mensajeTitulo = document.getElementById("mensajeTitulo");
    const mensajeTexto = document.getElementById("mensajeTexto");
    const rememberBtn = document.getElementById('rememberBtn');
    let estaRecordando = false;

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        // 🔹 Evitamos el doble envío
        if (estaRecordando) return;
        estaRecordando = true;
        rememberBtn.disabled = true;
        rememberBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Procesando...`;

        emailError.textContent = "";

        // 🔹 Obtenemos los datos del formulario
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("/recordarPassUsuario", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            // 🔹 Si hay un error lo muestra debajo del input
            if (!response.ok) {
                emailError.textContent = "❌ " + result.errores; 
                emailInput.classList.add("is-invalid");
                return;
            } else { // Respuesta válida (200 OK), limpiamos el formulario y mostramos mensaje
                form.reset();
                emailInput.classList.remove("is-invalid");

                rememberModal.hide();

                mensajeTitulo.textContent = "Correo de recuperación enviado";
                mensajeTexto.textContent = result.mensaje;
                mensajeModal.show();
            }
            
        } catch (error) {
            emailError.textContent = "❌ Error de conexión. Inténtalo nuevamente.";
        } finally {
            // 🔹 Restaurar el botón de restablecer contraseña
            estaRecordando = false;
            rememberBtn.innerHTML = "Enviar correo electrónico";
            rememberBtn.disabled = false;
        }
    });
});
