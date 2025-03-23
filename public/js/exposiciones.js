document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search");
  const filterOrganizador = document.getElementById("filterOrganizador");
  const filterYear = document.getElementById("filterYear");
  const itemsPerPage = document.getElementById("itemsPerPage");
  // const searchButton = document.getElementById("searchButton");
  const clearFilters = document.getElementById("clearFilters");
  const tableBody = document.getElementById("expoTableBody");
  const paginationContainer = document.querySelector(".pagination");

  function fetchExposiciones(page = 1) {
    let limit = itemsPerPage.value; // Obtener valor del selector
    if (!limit || isNaN(limit)) limit = 5; // Fallback si no hay valor

    const searchValue = searchInput.value;
    const organizadorValue = filterOrganizador.value;
    const yearValue = filterYear.value;

    const url = `/exposiciones?page=${page}&limit=${limit}&search=${searchValue}&organizador=${organizadorValue}&year=${yearValue}`;

    fetch(url)
      .then((response) => response.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Reemplazar contenido de la tabla
        tableBody.innerHTML = doc.querySelector("#expoTableBody").innerHTML;

        // Reemplazar paginación
        paginationContainer.innerHTML = doc.querySelector(".pagination").innerHTML;

        attachPaginationEvents();
      })
      .catch((error) => console.error("Error al actualizar exposiciones:", error));
  }

  function attachPaginationEvents() {
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
  searchInput.addEventListener("input", () => fetchExposiciones());
  filterOrganizador.addEventListener("change", () => fetchExposiciones());
  filterYear.addEventListener("input", () => fetchExposiciones());

  itemsPerPage.addEventListener("change", function () {
    fetchExposiciones(1); // Reiniciar en la primera página al cambiar el tamaño
  });

  clearFilters.addEventListener("click", () => {
    searchInput.value = "";
    filterOrganizador.value = "";
    filterYear.value = "";
    fetchExposiciones();
  });

  attachPaginationEvents();
});
