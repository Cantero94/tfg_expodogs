// Script para partials/registerModal.pug
document.addEventListener('DOMContentLoaded', function() {
    var condicionesCheckbox = document.getElementById('condiciones');
    var propietarioFields = document.getElementById('propietarioFields');

    condicionesCheckbox.addEventListener('change', function() {
      if (this.checked) {
        propietarioFields.removeAttribute('disabled');
      } else {
        propietarioFields.setAttribute('disabled', '');
      }
    });

    const formRegistro = document.getElementById('formRegistro');
    const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
    const mensajeConfirmacionModal = new bootstrap.Modal(document.getElementById('mensajeConfirmacionModal'));
    const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));  // ✅ Modal de error
    const modalErrorList = document.getElementById('modalErrorList');  // ✅ Contenedor de errores

    formRegistro.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(formRegistro);
        const data = Object.fromEntries(formData.entries());
        // ✅ Validación de datos
        let errores = [];
        // 🔹 Validar número de teléfono antes de enviar la petición
        const telefonoRegex = /^\+?\d{1,4}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{3,5}[-.\s]?\d{3,5}$/;
  
        if (!telefonoRegex.test(data.telefono1)) {
            errores.push("❌ El número de Teléfono 1 no es válido.");
        }
        if (data.telefono2 && !telefonoRegex.test(data.telefono2)) {
            errores.push("❌ El número de Teléfono 2 no es válido.");
        }
        
        // 🔹 Validar DNI/NIE/Pasaporte
        const dniRegex = /^\d{8}[A-Z]$/;  // DNI Español
        const nieRegex = /^[XYZ]\d{7}[A-Z]$/; // NIE Español
        const extranjeroRegex = /^[A-Z0-9]{6,20}$/i;  // Pasaporte o ID extranjero

        if (!dniRegex.test(data.dni) && !nieRegex.test(data.dni) && !extranjeroRegex.test(data.dni)) {
            errores.push("❌ El DNI/NIE/Pasaporte no es válido.");
        }

        if (errores.length > 0) {
            modalErrorList.innerHTML = ""; // Limpiar errores previos

            errores.forEach(error => {
                let li = document.createElement("li");
                li.textContent = error;
                modalErrorList.appendChild(li);
            });

            errorModal.show();  // 🔹 Mostrar modal de error y detener envío
            return;
        }

        try {
            const response = await fetch('/registrarUsuario', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                // 🔹 Si el registro fue exitoso, cerrar el modal de registro y abrir el de confirmación
                registerModal.hide();
                mensajeConfirmacionModal.show();

                formRegistro.reset();
                propietarioFields.setAttribute('disabled', '');
            } else {
                // 🔹 Si hay errores, mostrarlos en el modal de errores
                modalErrorList.innerHTML = ""; // Limpiar errores previos
                
                if (result.error) {
                    let li = document.createElement("li");
                    li.textContent = result.error;
                    modalErrorList.appendChild(li);
                }

                errorModal.show();  // 🔹 Mostrar modal de error sin cerrar el de registro
            }
        } catch (error) {
            console.error('Error en el registro:', error);
            modalErrorList.innerHTML = ""; // Limpiar errores previos

            let li = document.createElement("li");
            li.textContent = "Error inesperado. Inténtalo nuevamente.";
            modalErrorList.appendChild(li);
            
            errorModal.show();  // 🔹 Mostrar modal de error en caso de fallo en la petición
        }
    });
});
