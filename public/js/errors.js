// Lógica para modalError de /partials/errorModal.pug
document.addEventListener("DOMContentLoaded", function () {
    if (window.errores && window.errores.length > 0) {
        let modalErrorList = document.getElementById("modalErrorList");
        modalErrorList.innerHTML = ""; // Limpiar contenido anterior

        window.errores.forEach(error => {
            let li = document.createElement("li");
            li.textContent = error;
            li.classList.add("list-group-item", "text-danger");
            modalErrorList.appendChild(li);
        });

        // Mostrar el modal de errores
        let errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
        errorModal.show();
    }
});
