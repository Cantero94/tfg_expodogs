// Lógica para la vista de exposiciones de exposiciones.pug
document.addEventListener("DOMContentLoaded", function () {
  const nameSearch = document.getElementById("nameSearch");
  const organizerFilter = document.getElementById("organizerFilter");
  const filterYear = document.getElementById("filterYear");
  const itemsPerPage = document.getElementById("itemsPerPage");
  // const searchButton = document.getElementById("searchButton");
  const clearFilters = document.getElementById("clearFilters");
  const tableBody = document.getElementById("expoTableBody");
  const paginationContainer = document.querySelector(".pagination");

  function fetchExposiciones(page = 1) {
    let limit = itemsPerPage.value; // Obtener valor del selector
    if (!limit || isNaN(limit)) limit = 5; // Fallback si no hay valor

    const nameValue = nameSearch.value;
    const organizerValue = organizerFilter.value;
    const yearValue = filterYear.value;

    const url = `/exposiciones?page=${page}&limit=${limit}&search=${nameValue}&organizador=${organizerValue}&year=${yearValue}`;

    fetch(url)
      .then((response) => response.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Reemplazar contenido de la tabla
        tableBody.innerHTML = doc.querySelector("#expoTableBody").innerHTML;

        // Reemplazar paginación
        paginationContainer.innerHTML = doc.querySelector(".pagination").innerHTML;

        paginationEvents();
      })
      .catch((error) => console.error("Error al actualizar exposiciones:", error));
  }

  function paginationEvents() {
    document.querySelectorAll(".pagination a").forEach((link) => {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        const urlParams = new URLSearchParams(this.getAttribute("href").split("?")[1]);
        const page = urlParams.get("page");

        fetchExposiciones(page);
      });
    });
  }

  // Eventos
  // searchButton.addEventListener("click", () => fetchExposiciones());
  nameSearch.addEventListener("input", () => fetchExposiciones());
  organizerFilter.addEventListener("change", () => fetchExposiciones());
  filterYear.addEventListener("input", () => fetchExposiciones());

  itemsPerPage.addEventListener("change", function () {
    fetchExposiciones(1); // Reiniciar en la primera página al cambiar el tamaño
  });

  clearFilters.addEventListener("click", () => {
    nameSearch.value = "";
    organizerFilter.value = "";
    filterYear.value = "";
    fetchExposiciones();
  });

  paginationEvents();
});
