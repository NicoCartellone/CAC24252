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

  let error = false;
  if (nombre.value === "" || apellido.value === "" || email.value === "") {
    error = true;
    errorDiv.textContent = "Ninguno de los campos pueden estar vacíos.";
  } else if (nombre.value.length < 3 || apellido.value.length < 3) {
    error = true;
    errorDiv.textContent =
      "El nombre y el apellido tienen que tener 3 caracteres o más.";
  } else if (!regexEmail(email.value)) {
    error = true;
    errorDiv.textContent = "Por favor ingrese un email válido.";
  } else if (!checkBox.checked) {
    error = true;
    errorDiv.textContent = "Debes aceptar las políticas de privacidad. ";
    return;
  }
  if (!error) {
    alert("Gracias por suscribirte");
  }
});
