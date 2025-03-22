document.addEventListener("DOMContentLoaded", function () {
    const toggleAllButton = document.getElementById("toggleAll");
    const accordions = document.querySelectorAll(".accordion-collapse");
  
    let allExpanded = false;
  
    toggleAllButton.addEventListener("click", function () {
      accordions.forEach(accordion => {
        accordion.classList.toggle("show", !allExpanded);
      });
  
      allExpanded = !allExpanded;
      toggleAllButton.textContent = allExpanded ? "Colapsar Todos" : "Expandir Todos";
    });
  });
  