// mostrar modal
const showModal = (title, message) => {
  document.getElementById("titulo-modal").innerHTML = title;
  document.getElementById("descripcion-modal").innerHTML = message;
  document.getElementById("modal").style.display = "flex";
};

// cerrar modal
document.getElementById("btn-cerrar").onclick = () => {
  document.getElementById("modal").style.display = "none";
  formulario.reset();
};

// validacion email
const regexEmail = (email) => {
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const errorDiv = document.querySelector(".error");

let inputs = document.querySelectorAll("input");
inputs.forEach((input) => {
  input.addEventListener("click", (event) => {
    errorDiv.textContent = "";
  });
});

const formulario = document.querySelector(".formulario");
formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  const checkBox = document.querySelector(".inputCheckBox");
  const nombre = document.querySelector(".nombre");
  const apellido = document.querySelector(".apellido");
  const email = document.querySelector(".email");
  const select = document.querySelector("#seleccion");
  const archivo = document.querySelector("#imagenPerfil");

  const errorNombre = document.querySelector(".error-nombre");
  const errorApellido = document.querySelector(".error-apellido");
  const errorEmail = document.querySelector(".error-email");
  const errorPrivacidad = document.querySelector(".error-privacidad");
  const errorSelect = document.querySelector(".error-select");
  const errorArchivo = document.querySelector(".error-archivo");

  let error = false;

    // resetear errores
    errorNombre.textContent = "";
    errorApellido.textContent = "";
    errorEmail.textContent = "";
    errorPrivacidad.textContent = "";
    errorSelect.textContent = "";
    errorArchivo.textContent = "";

  // validacion
  if (nombre.value === "") {
    error = true;
    errorNombre.textContent = "El nombre no puede estar vacío.";
  } else if (nombre.value.length < 3) {
    error = true;
    errorNombre.textContent = "El nombre tiene que tener 3 caracteres o más.";
  }

  if (apellido.value === "") {
    error = true;
    errorApellido.textContent = "El apellido no puede estar vacío.";
  } else if (apellido.value.length < 3) {
    error = true;
    errorApellido.textContent = "El apellido tiene que tener 3 caracteres o más.";
  }

  if (email.value === "") {
    error = true;
    errorEmail.textContent = "El email no puede estar vacío.";
  } else if (!regexEmail(email.value)) {
    error = true;
    errorEmail.textContent = "Por favor ingrese un email válido.";
  }

  if (!checkBox.checked) {
    error = true;
    errorPrivacidad.textContent = "Debes aceptar las políticas de privacidad.";
  }

  if (select.value === "value5") {
    error = true;
    errorSelect.textContent = "Debes seleccionar una opción.";
  }

  if (archivo.value === "") {
    error = true;
    errorArchivo.textContent = "Debes seleccionar un archivo.";
  }

  if (!error) {
    showModal("¡Gracias por suscribirte!", "Tu suscripción ha sido exitosa.");
  }
});