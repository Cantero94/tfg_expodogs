document.addEventListener('DOMContentLoaded', function () {
    var condicionesCheckbox = document.getElementById('condiciones');
    var propietarioFields = document.getElementById('propietarioFields');

    condicionesCheckbox.addEventListener('change', function () {
        if (this.checked) {
            propietarioFields.removeAttribute('disabled');
        } else {
            propietarioFields.setAttribute('disabled', '');
        }
    });

    const formRegistro = document.getElementById('formRegistro');
    const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
    const mensajeModal = new bootstrap.Modal(document.getElementById('mensajeModal'));
    const mensajeTitulo = document.getElementById("mensajeTitulo");
    const mensajeTexto = document.getElementById("mensajeTexto");
    const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
    const modalErrorList = document.getElementById('modalErrorList');
    const registerBtn = document.getElementById('registerBtn');
    let estaRegistrando = false;

    formRegistro.addEventListener('submit', async function (event) {
        
        if (estaRegistrando) return; // ⚠️ Evita doble envío
        estaRegistrando = true;
        registerBtn.disabled = true;
        registerBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Procesando...`;
        
        event.preventDefault();

        const formData = new FormData(formRegistro);
        const data = Object.fromEntries(formData.entries());

        // ✅ Limpiar errores previos
        document.querySelectorAll(".text-danger").forEach(e => e.textContent = "");
        document.querySelectorAll(".form-control").forEach(e => e.classList.remove("is-invalid"));

        let errores = {};

        // 🔹 Validación de campos obligatorios
        const camposObligatorios = ["nombre", "apellidos", "dni", "email", "password", "password2", "telefono1", "direccion", "cp", "ciudad", "provincia", "pais"];
        camposObligatorios.forEach(campo => {
            if (!data[campo] || data[campo].trim() === "") {
                errores[campo] = `El campo ${campo} es obligatorio.`;
            }
        });

        // 🔹 Validar contraseñas
        if (data.password !== data.password2) {
            errores["password2"] = "Las contraseñas no coinciden.";
        }
        if (data.password.length < 6) {
            errores["password"] = "La contraseña debe tener al menos 6 caracteres.";
        }

        // 🔹 Validar teléfono
        const telefonoRegex = /^\+?\d{1,4}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{3,5}[-.\s]?\d{3,5}$/;
        if(data.telefono1 === data.telefono2) {
            errores["telefono2"] = "El Teléfono 2 no puede ser igual al Teléfono 1.";
        }

        if (!telefonoRegex.test(data.telefono1)) {
            errores["telefono1"] = "El número de Teléfono 1 no es válido.";
        }
        if (data.telefono2 && !telefonoRegex.test(data.telefono2)) {
            errores["telefono2"] = "El número de Teléfono 2 no es válido.";
        }

        // 🔹 Validar DNI/NIE/Pasaporte
        const dniRegex = /^\d{8}[A-Z]$/;  // DNI Español
        const nieRegex = /^[XYZ]\d{7}[A-Z]$/; // NIE Español
        const extranjeroRegex = /^[A-Z0-9]{6,20}$/i;  // Pasaporte o ID extranjero
        const dni = data.dni.toUpperCase().trim();
        if (dniRegex.test(dni)) {
            // Si es un DNI, validar la letra
            const numero = dni.slice(0, -1);
            const letraUsuario = dni.slice(-1);
            const letrasValidas = "TRWAGMYFPDXBNJZSQVHLCKE";
            const letraCalculada = letrasValidas[numero % 23];

            if (letraUsuario !== letraCalculada) {
                errores["dni"] = "La letra del DNI no es válida.";
            }
        } else if (nieRegex.test(dni)) {
            // Si es un NIE, convertir la letra inicial y validar
            let numero = dni.slice(1, -1);
            let letraUsuario = dni.slice(-1);
            const letraInicial = dni[0];

            if (letraInicial === "X") numero = "0" + numero;
            if (letraInicial === "Y") numero = "1" + numero;
            if (letraInicial === "Z") numero = "2" + numero;

            const letrasValidas = "TRWAGMYFPDXBNJZSQVHLCKE";
            const letraCalculada = letrasValidas[parseInt(numero) % 23];

            if (letraUsuario !== letraCalculada) {
                errores["dni"] = "La letra del NIE no es válida.";
            }
        } else if (!extranjeroRegex.test(dni)) {
            // Si no es ni DNI, ni NIE, ni pasaporte válido, mostrar error
            errores["dni"] = "El DNI/NIE/Pasaporte no es válido.";
        }


        // 🔹 Mostrar errores debajo de los inputs
        if (Object.keys(errores).length > 0) {
            Object.keys(errores).forEach(campo => {
                let errorElement = document.getElementById(`error-${campo}`);
                let inputElement = document.getElementById(campo);
                if (errorElement) errorElement.textContent = `❌ ${errores[campo]}`;
                if (inputElement) inputElement.classList.add("is-invalid");
            });
            return;
        }

        // 🔹 Enviar datos al servidor si no hay errores
        try {
            const response = await fetch('/registrarUsuario', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) { // response.status === 200 OK
                registerModal.hide();
                mensajeTitulo.textContent = "Registro completado!";
                mensajeTexto.textContent = "Hemos enviado un correo electrónico con un enlace para activar tu cuenta. Por favor, revisa tu bandeja de entrada.";
                mensajeModal.show();

                formRegistro.reset();
                propietarioFields.setAttribute('disabled', '');
            } else {
                modalErrorList.innerHTML = "";
                if (result.error) {
                    let li = document.createElement("li");
                    li.textContent = result.error;
                    modalErrorList.appendChild(li);
                }
                errorModal.show();
            }
        } catch (error) {
            console.error('Error en el registro:', error);
            modalErrorList.innerHTML = "";
            let li = document.createElement("li");
            li.textContent = "Error inesperado. Inténtalo nuevamente.";
            modalErrorList.appendChild(li);
            errorModal.show();
        } finally {
            estaRegistrando = false;
            registerBtn.innerHTML = "Registrarme";
            registerBtn.disabled = false;
        }
    });
});
