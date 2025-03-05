const muestraCantidadCaracteres = document.getElementById('muestra-cantidad-caracteres');
const cantidadCaracteresUsuario = document.getElementById('cantidad-caracteres-usuario');

const uppercaseInput = document.getElementById('uppercase-input');
const lowercaseInput = document.getElementById('lowercase-input');
const numbersInput = document.getElementById('numbers-input');
const symbolsInput = document.getElementById('symbols-input');

const btnGenerarPassword = document.getElementById('btn-generar-password');
const contenedorPassword = document.getElementById('password-generado');
const btnCopiarPassword = document.getElementById('btn-copiar-password');

// Muestra la cantidad de caracteres seleccionada en tiempo real
muestraCantidadCaracteres.textContent = cantidadCaracteresUsuario.value;

cantidadCaracteresUsuario.addEventListener("input", function (event) {
  muestraCantidadCaracteres.textContent = event.target.value;
});

// Obtiene las opciones seleccionadas
function obtenerOpcionesSeleccionadas() {
  return {
    mayusculas: uppercaseInput.checked,
    minusculas: lowercaseInput.checked,
    numeros: numbersInput.checked,
    simbolos: symbolsInput.checked,
  };
}

// Genera una contraseña aleatoria basada en la configuración del usuario
function generarPassword(longitud, opciones) {
  const caracteres = {
    mayusculas: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    minusculas: "abcdefghijklmnopqrstuvwxyz",
    numeros: "0123456789",
    simbolos: "!@#$%^&*()_+-=[]{}|;:,.<>/?",
  };

  let caracteresPermitidos = "";
  let passwordGenerado = "";

  if (opciones.mayusculas) caracteresPermitidos += caracteres.mayusculas;
  if (opciones.minusculas) caracteresPermitidos += caracteres.minusculas;
  if (opciones.numeros) caracteresPermitidos += caracteres.numeros;
  if (opciones.simbolos) caracteresPermitidos += caracteres.simbolos;

  if (caracteresPermitidos.length === 0) {
    return "Select at least one option";
  }

  for (let i = 0; i < longitud; i++) {
    const randomIndex = Math.floor(Math.random() * caracteresPermitidos.length);
    passwordGenerado += caracteresPermitidos[randomIndex];
  }

  return passwordGenerado;
}

// Maneja el evento de clic en el botón Generate
function manejarGeneracionPassword() {
  const opcionesSeleccionadas = obtenerOpcionesSeleccionadas();
  const longitud = parseInt(cantidadCaracteresUsuario.value, 10);
  const password = generarPassword(longitud, opcionesSeleccionadas);
  
  contenedorPassword.textContent = password;

  if (password !== "Select at least one option") {
    btnCopiarPassword.textContent = "Copy";
    btnCopiarPassword.style.cursor = "pointer";
  } else {
    btnCopiarPassword.textContent = "";
  }
}

// Maneja el evento de copiado de la contraseña
function manejarCopiadoPassword() {
  if (contenedorPassword.textContent && contenedorPassword.textContent !== "Select at least one option") {
    navigator.clipboard.writeText(contenedorPassword.textContent)
      .then(function () {
        btnCopiarPassword.textContent = "Copied!";
        setTimeout(function () {
          btnCopiarPassword.textContent = "Copy";
        }, 1500);
      })
      .catch(function () {
        alert("Failed to copy password");
      });
  }
}

// Agregar eventos a los botones
btnGenerarPassword.addEventListener("click", manejarGeneracionPassword);
btnCopiarPassword.addEventListener("click", manejarCopiadoPassword);
