const muestraCantidadCaracteres = document.getElementById('muestra-cantidad-caracteres');
const cantidadCaracteresUsuario = document.getElementById('cantidad-caracteres-usuario');


muestraCantidadCaracteres.textContent = cantidadCaracteresUsuario.value;

cantidadCaracteresUsuario.addEventListener("input", (event) => {
  muestraCantidadCaracteres.textContent = event.target.value;
});

