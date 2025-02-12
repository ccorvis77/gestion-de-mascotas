const formMascota = document.getElementById("form-mascota");
const listaMascotas = document.getElementById("lista-mascotas");

let mascotas = JSON.parse(localStorage.getItem("mascotas")) || [];

function mostrarMascotas() {
  listaMascotas.innerHTML = ""; 

  if (mascotas.length === 0) {
    listaMascotas.innerHTML = "<p>No hay mascotas registradas.</p>";
    return;
  }

  mascotas.forEach((mascota, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${mascota.nombre}</strong> - ${mascota.tipo}, ${mascota.edad} años
      <br>Propietario: ${mascota.propietario}
      <br>Última vacuna: ${mascota.fechaVacuna ? mascota.fechaVacuna : "No registrada"}
      <button id="asignarbtn" >Asignar cita</button>
      <button class="btn-eliminar" data-index="${index}">❌ Eliminar</button>
    `;
    listaMascotas.appendChild(li);
  });
}

 
listaMascotas.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-eliminar")) {
    const index = Number(event.target.getAttribute("data-index")); 
    eliminarMascota(index);
  }
});

function registrarMascota(event) {
  event.preventDefault(); 

  const nombre = document.getElementById("nombre").value.trim();
  const tipo = document.getElementById("tipo").value;
  const edad = Number(document.getElementById("edad").value.trim());
  const propietario = document.getElementById("propietario").value.trim();
  const fechaVacuna = document.getElementById("vacuna").value.trim();  // Obtener la fecha de vacuna

  if (!nombre || !tipo || isNaN(edad) || edad <= 0 || !propietario) {
    alert("Por favor, complete todos los campos correctamente.");
    return;
  }

  const nuevaMascota = { nombre, tipo, edad, propietario, fechaVacuna };

  mascotas.push(nuevaMascota);

  localStorage.setItem("mascotas", JSON.stringify(mascotas));

  mostrarMascotas();

  formMascota.reset();
}

function eliminarMascota(index) {
  if (confirm("¿Seguro que deseas eliminar esta mascota?")) {
    mascotas.splice(index, 1);

    localStorage.setItem("mascotas", JSON.stringify(mascotas));

    mostrarMascotas();
  }
}

formMascota.addEventListener("submit", registrarMascota);


document.addEventListener("DOMContentLoaded", mostrarMascotas);


