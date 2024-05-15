let menu_responsive = document.querySelector(".checkbtn");

//asigna funcion a evento onclick
menu_responsive.onclick = function () {
    let navBar = document.querySelector(".navbar");
    navBar.classList.toggle("active");
};

//slider
let slider = document.querySelector(".slider-contenedor")
let sliderIndividual = document.querySelectorAll(".contenido-slider")
let contador = 1;
let width = sliderIndividual[0].clientWidth;
let intervalo = 3000;

window.addEventListener("resize", function(){
    width = sliderIndividual[0].clientWidth;
})

setInterval(function(){
    slides();
},intervalo);



function slides(){
    slider.style.transform = "translate("+(-width*contador)+"px)";
    slider.style.transition = "transform .8s";
    contador++;

    if(contador == sliderIndividual.length){
        setTimeout(function(){
            slider.style.transform = "translate(0px)";
            slider.style.transition = "transform 0s";
            contador=1;
        },1500)
    }
}
//articulos

/*Evento*/

document.addEventListener("DOMContentLoaded", function() {
    fetch('productos.json')
      .then(response => response.json())
      .then(data => {
        const contenedorProductos = document.getElementById('contenedor-productos');
        data.forEach(producto => {
          const productoHTML = `
          <div class="articulo" data-aos="zoom-in-right">
          <img src="${producto.imagen}" alt="${producto.nombre}" class="img-producto">
          <div id="contenedor-productos"></div>
          <i class="fas fa-chart-bar"></i>
          <p>Descripción</p>
          <h2>${producto.nombre}</h2>
          <h3>Precio</h3>
          <p>${producto.precio} €</p>
          <div class="boton-modal" onclick= "mostrarProducto('${producto.descripcion}')">
            Read more
        </div>
          `;
          contenedorProductos.innerHTML += productoHTML;
        });
      })
      .catch(error => console.error('Error al obtener los datos:', error));
  });

  function mostrarProducto(descripcion) {
    document.getElementById("descripcionProducto").innerHTML = descripcion;
    document.getElementById("modal").style.display = "flex";

}

    document.getElementById("btn-cerrar").onclick = function(){
       document.getElementById("modal").style.display = "none";

    }

  