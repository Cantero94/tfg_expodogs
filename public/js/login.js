// Lógica para el formulario de login en /partials/loginModal.pug y asidePanel.pug
document.addEventListener("DOMContentLoaded", function () {
    const loginForms = document.querySelectorAll("#loginForm"); // Manejar múltiples formularios
    const emailInputs = document.querySelectorAll("#email");
    const passwordInputs = document.querySelectorAll("#password");
    const emailErrors = document.querySelectorAll("#emailError");
    const passwordErrors = document.querySelectorAll("#passwordError");

    loginForms.forEach((loginForm, index) => {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault(); // Evita la recarga de la página

            // Resetear mensajes de error previos
            emailErrors[index].textContent = "";
            passwordErrors[index].textContent = "";
            emailInputs[index].classList.remove("is-invalid");
            passwordInputs[index].classList.remove("is-invalid");

            // Almacenar los datos del formulario en un objeto
            const formData = new FormData(loginForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch("/loginUsuario", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });
                
                const result = await response.json();

                if (!response.ok) {
                    result.errores.forEach(error => {
                        if (error.includes("correo no está registrado")) {
                            emailErrors[index].textContent = result.errores;
                            emailInputs[index].classList.add("is-invalid");
                        }
                        if (error.includes("Contraseña incorrecta")) {
                            passwordErrors[index].textContent = result.errores;
                            passwordInputs[index].classList.add("is-invalid");
                        }
                        if (error.includes("aún no está activada")) {
                            emailErrors[index].textContent = result.errores;
                        }
                        if (error.includes("bloqueada")) {
                            emailErrors[index].textContent = result.errores;
                        }
                    });

                    return; // Detiene el proceso aquí para evitar que el modal se cierre
                }

                window.location.reload();

            } catch (error) {
                console.error("❌ Error en la petición al servidor:", error);
                passwordErrors[index].textContent = "Error de conexión. Inténtalo nuevamente.";
            }
        });
    });
});
