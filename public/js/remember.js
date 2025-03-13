document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formRecordarPassword");
    const emailInput = document.getElementById("emailRecuperacion");
    const emailError = document.getElementById("emailRecuperacionError");

    // Obtener el modal de confirmación
    const rememberModal = new bootstrap.Modal(document.getElementById("rememberModal"));
    const mensajeConfirmacionModal = new bootstrap.Modal(document.getElementById("mensajeConfirmacionModal"));
    const mensajeConfirmacionTitulo = document.getElementById("mensajeConfirmacionTitulo");
    const mensajeConfirmacionTexto = document.getElementById("mensajeConfirmacionTexto");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // 🔹 Evitar la recarga de la página

        emailError.textContent = ""; // 🔹 Limpiar mensajes anteriores

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("/recordarPassUsuario", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                emailError.textContent = "❌ " + result.error; // 🔹 Mostrar error debajo del input
                emailInput.classList.add("is-invalid");
                return;
            } else {
                // 🔹 Si el email se envió correctamente:
                form.reset();
                emailInput.classList.remove("is-invalid");

                // 🔹 Cerrar el modal de recuperación
                rememberModal.hide();

                // 🔹 Mostrar el modal de confirmación
                mensajeConfirmacionTitulo.textContent = "Correo de recuperación enviado";
                mensajeConfirmacionTexto.textContent = "Se ha enviado un correo con instrucciones para restablecer tu contraseña. Revisa tu bandeja de entrada.";
                mensajeConfirmacionModal.show();
            }
            
        } catch (error) {
            emailError.textContent = "❌ Error de conexión. Inténtalo nuevamente.";
        }
    });
});
