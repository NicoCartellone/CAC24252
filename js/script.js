function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  if (navLinks.style.display === "flex") {
    navLinks.style.display = "none";
  } else {
    navLinks.style.display = "flex";
  }
}

// Selecciona todos los enlaces de navegación
const navLinks = document.querySelectorAll(".nav-link");
const navbarHeight = document.querySelector("header").offsetHeight;

// Añade un evento click a cada enlace de navegación
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    // Previene el comportamiento por defecto
    event.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    const targetPosition = targetElement.offsetTop - navbarHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });

    const navLinksContainer = document.getElementById("navLinks");
    if (navLinksContainer.style.display === "flex") {
      navLinksContainer.style.display = "none";
    }
  });
});

//slider
let slider = document.querySelector(".slider-contenedor");
let sliderIndividual = document.querySelectorAll(".contenido-slider");
let contador = 1;
let width = sliderIndividual[0].clientWidth;
let intervalo = 3000;

window.addEventListener("resize", function () {
  width = sliderIndividual[0].clientWidth;
});

setInterval(function () {
  slides();
}, intervalo);

function slides() {
  slider.style.transform = "translate(" + -width * contador + "px)";
  slider.style.transition = "transform .8s";
  contador++;

  if (contador == sliderIndividual.length) {
    setTimeout(function () {
      slider.style.transform = "translate(0px)";
      slider.style.transition = "transform 0s";
      contador = 1;
    }, 1500);
  }
}
//articulos

/*Evento*/

document.addEventListener("DOMContentLoaded", async function () {
  try {
    let response = await fetch("productos.json");
    let data = await response.json();

    const contenedorProductos = document.getElementById("contenedor-productos");
    data.forEach((producto) => {
      const productoHTML = `
              <article class="col-lg-4 col-md-6 col-sm-12 mb-5 text-center articulo">
                <div>
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="img-producto">
                    <div class="card-body">
                        <div id="contenedor-productos"></div>   
                        <h2>${producto.nombre}</h2>
                        <p class="fs-4">${producto.precio} €</p>
                        <button class="btn btn-success" onclick= "mostrarProducto('${producto.nombre}','${producto.descripcion}')">
                            Detalle
                        </button>
                    </div>
                </div>
              </article>
              `;
      contenedorProductos.innerHTML += productoHTML;
    });
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
});

function mostrarProducto(nombre,descripcion) {
  document.getElementById("descripcionProducto").innerHTML = descripcion;
  document.getElementById("titulo-producto").innerHTML = nombre;
  document.getElementById("modal").style.display = "flex";
}

document.getElementById("btn-cerrar").onclick = function () {
  document.getElementById("modal").style.display = "none";
};
