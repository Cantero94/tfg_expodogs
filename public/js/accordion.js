// Función para expandir o colapsar todas las secciones de un accordion de Mis Perros, Inscribir y Mis Inscripciones y Pagos
document.addEventListener("DOMContentLoaded", function () {
    const toggleAllButton = document.getElementById("toggleAll");
    const accordions = document.querySelectorAll(".accordion-collapse");
    const buttons = document.querySelectorAll(".accordion-button");
    let allExpanded = false;
    
    toggleAllButton.addEventListener("click", function () {
        accordions.forEach(accordion => {
            if (allExpanded) {
                accordion.classList.remove("show"); // Oculta todos
            } else {
                accordion.classList.add("show"); // Muestra todos
            }
        });

        buttons.forEach(button => {
            if (allExpanded) {
                button.classList.remove("show"); // Oculta todos
            } else {
                button.classList.add("show"); // Muestra todos
            }
        });

        allExpanded = !allExpanded;
        toggleAllButton.textContent = allExpanded ? "Colapsar Todas" : "Expandir Todas";
    });
});