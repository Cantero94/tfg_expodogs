document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("selectExposicion");
    const container = document.getElementById("perrosContainer");
    const accordion = document.getElementById("accordionPerros");
    const confirmCheck = document.getElementById("confirmCheck");
    const inscribirBtn = document.getElementById("inscribirBtn");
    const toggleAll = document.getElementById("toggleAll");
  
    let allExpanded = false;
  
    const clases = [
      "Muy Cachorros", "Cachorros", "Jóvenes", "Campeones Jóvenes", "Intermedia",
      "Trabajo", "Abierta", "Campeones", "Veteranos", "Campeones Veteranos"
    ];
  
    select.addEventListener("change", async () => {
      const expoId = select.value;
      if (!expoId) return (container.style.display = "none");
  
      const res = await fetch(`/obtenerPerrosParaInscripcion?expoId=${expoId}`);
      const perros = await res.json();
  
      const agrupados = perros.reduce((acc, perro) => {
        (acc[perro.raza] = acc[perro.raza] || []).push(perro);
        return acc;
      }, {});
  
      accordion.innerHTML = "";
  
      Object.entries(agrupados).forEach(([raza, perros], i) => {
        const collapseId = `collapse-${raza.replace(/\s+/g, '-')}`;
        const headingId = `heading-${raza.replace(/\s+/g, '-')}`;
  
        const perrosHTML = perros.map(p => `
          <div class="perro-item d-flex justify-content-between align-items-center my-1 border-bottom">
            <label class="d-flex align-items-center">
              <input class="me-2" type="checkbox" name="perrosSeleccionados"
                value="${p.id_perro}" data-raza="${raza}" ${p.inscrito ? "disabled" : ""}>
              <span><b>${p.nombre}</b></span>
            </label>
            <div class="d-flex align-items-center">
              <select class="form-select form-select-sm ms-2" name="clase" disabled
                data-id="${p.id_perro}" ${p.inscrito ? "disabled" : ""}>
                <option value="">Seleccionar clase</option>
                ${clases.map(c => `<option ${p.clase === c ? "selected" : ""}>${c}</option>`).join("")}
              </select>
              ${p.inscrito ? `<span class="badge bg-secondary ms-2">Ya inscrito</span>` : ""}
            </div>
          </div>
        `).join("");
  
        accordion.innerHTML += `
          <div class="accordion-item">
            <h2 class="accordion-header" id="${headingId}">
              <button class="accordion-button" type="button" data-bs-toggle="collapse"
                data-bs-target="#${collapseId}" aria-expanded="${i === 0}" aria-controls="${collapseId}">
                Raza: ${raza}
              </button>
            </h2>
            <div id="${collapseId}" class="accordion-collapse collapse ${i === 0 ? "show" : ""}" aria-labelledby="${headingId}" data-bs-parent="#accordionPerros">
              <div class="accordion-body">${perrosHTML}</div>
            </div>
          </div>`;
      });
  
      attachEvents();
      container.style.display = "block";
    });
  
    function attachEvents() {
      const checkboxes = document.querySelectorAll('input[name="perrosSeleccionados"]');
      const selects = document.querySelectorAll('select[name="clase"]');
  
      checkboxes.forEach(cb => {
        cb.addEventListener("change", () => {
            const select = document.querySelector(`select[data-id="${cb.value}"]`);
            const row = cb.closest(".perro-item");
            select.disabled = !cb.checked;
          
            if (cb.checked) {
              row.classList.add("bg-warning-subtle");
            } else {
              row.classList.remove("bg-warning-subtle");
            }
          
            updateBtn();
          });
      });
  
      selects.forEach(s => s.addEventListener("change", updateBtn));
    }
  
    function updateBtn() {
      const checked = Array.from(document.querySelectorAll('input[name="perrosSeleccionados"]:checked'));
      const allSelected = checked.every(cb =>
        document.querySelector(`select[data-id="${cb.value}"]`)?.value !== ""
      );
      inscribirBtn.disabled = !(checked.length && allSelected && confirmCheck.checked);
    }
  
    confirmCheck.addEventListener("change", updateBtn);
  
    toggleAll.addEventListener("click", () => {
      document.querySelectorAll(".accordion-collapse").forEach(acc =>
        acc.classList.toggle("show", !allExpanded)
      );
      allExpanded = !allExpanded;
      toggleAll.textContent = allExpanded ? "Colapsar Todas" : "Expandir Todas";
    });
  
    inscribirBtn.addEventListener("click", async () => {
      const expoId = select.value;
      const perros = Array.from(document.querySelectorAll('input[name="perrosSeleccionados"]:checked')).map(cb => {
        const select = document.querySelector(`select[data-id="${cb.value}"]`);
        return {
          id_perro: cb.value,
          clase: select.value,
          raza: cb.dataset.raza
        };
      });
  
      const res = await fetch("/inscribirPerros", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expoId, perros })
      });
  
      if (res.ok) location.reload();
      else alert("❌ Error al inscribir perros");
    });
  });
  