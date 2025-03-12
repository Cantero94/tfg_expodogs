document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Evita la recarga de la página

        // Resetear mensajes de error previos
        emailError.textContent = "";
        passwordError.textContent = "";
        emailInput.classList.remove("is-invalid");
        passwordInput.classList.remove("is-invalid");

        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData.entries());

        try {
            console.log("📡 Enviando datos al servidor:", data);
            const response = await fetch("/loginUsuario", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log("📥 Respuesta JSON:", result);

            if (!response.ok) {
                // Aquí usamos result.errores (un array) en lugar de result.error
                result.errores.forEach(error => {
                    if (error.includes("correo no está registrado")) {
                        emailError.textContent = "❌ Este correo no está registrado.";
                        emailInput.classList.add("is-invalid");
                    }
                    if (error.includes("Contraseña incorrecta")) {
                        passwordError.textContent = "❌ La contraseña es incorrecta.";
                        passwordInput.classList.add("is-invalid");
                    }
                    if (error.includes("aún no está activada")) {
                        emailError.textContent = "❌ Tu cuenta aún no está activada, comprueba la bandeja de entrada de tu correo electrónico y haz click en el enlace para activarla.";
                    }
                });
                return;
            }

            console.log("✅ Inicio de sesión exitoso, recargando página...");
            window.location.reload();

        } catch (error) {
            console.error("❌ Error en la petición al servidor:", error);
            passwordError.textContent = "❌ Error de conexión. Inténtalo nuevamente.";
        }
    });
});
