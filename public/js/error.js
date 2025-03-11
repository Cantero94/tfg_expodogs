//Script para partials/errorModal.pug
document.addEventListener("DOMContentLoaded", function () {
    if (window.errores.length > 0) {
        let modalErrorList = document.getElementById("modalErrorList");
        modalErrorList.innerHTML = ""; // Limpia el contenido anterior

        window.errores.forEach(error => {
            let li = document.createElement("li");
            li.textContent = error;
            modalErrorList.appendChild(li);
        });

        // Mostrar el modal de errores
        let errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
        errorModal.show();
    }
});
