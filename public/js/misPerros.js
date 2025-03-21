document.addEventListener("DOMContentLoaded", function () {
    const toggleAllButton = document.getElementById("toggleAll");
    const accordions = document.querySelectorAll(".accordion-collapse");

    let allExpanded = false;

    toggleAllButton.addEventListener("click", function () {
        accordions.forEach(accordion => {
            if (allExpanded) {
                accordion.classList.remove("show"); // Oculta todos
            } else {
                accordion.classList.add("show"); // Muestra todos
            }
        });

        allExpanded = !allExpanded;
        toggleAllButton.textContent = allExpanded ? "Colapsar Todas" : "Expandir Todas";
    });
});
