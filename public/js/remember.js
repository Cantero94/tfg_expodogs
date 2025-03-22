document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formRecordarPassword");
    const emailInput = document.getElementById("emailRecuperacion");
    const emailError = document.getElementById("emailRecuperacionError");

    // Obtener el modal de confirmación
    const rememberModal = new bootstrap.Modal(document.getElementById("rememberModal"));
    const mensajeModal = new bootstrap.Modal(document.getElementById("mensajeModal"));
    const mensajeTitulo = document.getElementById("mensajeTitulo");
    const mensajeTexto = document.getElementById("mensajeTexto");

    const rememberBtn = document.getElementById('rememberBtn');
    let estaRecordando = false;

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (estaRecordando) return; // ⚠️ Evita doble envío
        estaRecordando = true;
        rememberBtn.disabled = true;
        rememberBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Procesando...`;

        emailError.textContent = "";

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
                mensajeTitulo.textContent = "Correo de recuperación enviado";
                mensajeTexto.textContent = "Se ha enviado un correo con instrucciones para restablecer tu contraseña. Revisa tu bandeja de entrada.";
                mensajeModal.show();
            }
            
        } catch (error) {
            emailError.textContent = "❌ Error de conexión. Inténtalo nuevamente.";
        } finally {
            estaRecordando = false;
            rememberBtn.innerHTML = "Enviar correo electrónico";
            rememberBtn.disabled = false;
        }
    });
});
