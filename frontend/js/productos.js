document.addEventListener("DOMContentLoaded", function () {
    const btnProductos = document.getElementById('btn-productos');
    const newTable = document.getElementById('admin-table');

    // Función para obtener y mostrar productos
    const getProducts = async () => {
        // Limpiar contenido actual
        newTable.innerHTML = '';

        // Crear una sola tabla
        const table = document.createElement('table');
        table.className = 'table product-list';

        // Crear el encabezado de la tabla
        table.innerHTML = `
            <thead>
                <tr>
                    <th class="text-center"><span>Producto</span></th>
                    <th class="text-center"><span>Descripcion</span></th>
                    <th class="text-center"><span>Categoría</span></th>
                    <th class="text-center"><span>Precio</span></th>
                    <th class="text-center"><span>Acciones</span></th>
                </tr>
            </thead>
            <tbody></tbody> <!-- Cuerpo de la tabla donde se añadirán las filas -->
        `;

        // Agregar la tabla al contenedor
        newTable.appendChild(table);

        // Obtener productos
        const response = await fetch('http://localhost:3000/productos/');
        const products = await response.json();

        // Iterar sobre cada producto y agregarlos como filas a la tabla
        products.forEach(async product => {
            const categoryResponse = await fetch(`http://localhost:3000/categorias/${product.id_categoria}`);
            const category = await categoryResponse.json();
            // Crear una nueva fila
            const row = document.createElement('tr');
            
            // Añadir celdas con los datos del producto
            row.innerHTML = `
                <td class="text-center">${product.nombre}</td>
                <td class="text-center">${product.descripcion}</td>
                <td class="text-center">${product.precio}</td>
                <td class="text-center">${category.nombre}</td>
                
                <td class="text-center">
                    <a href="#" class="table-link">
                        <span class="fa-stack">
                            <i class="fa fa-square fa-stack-2x"></i>
                            <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
                        </span>
                    </a>
                    <a href="#" class="table-link danger">
                        <span class="fa-stack">
                            <i class="fa fa-square fa-stack-2x"></i>
                            <i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                        </span>
                    </a>
                </td>
            `;

            const btnEliminar = row.querySelector(".btn-eliminar");
      btnEliminar.addEventListener("click", () => {
        const productId = btnEliminar.getAttribute("data-product-id");
        eliminarProducto(productId);
      });

      // Agregar el EventListener al botón de actualizar
      const btnActualizar = row.querySelector(".fa-pencil");
      btnActualizar.addEventListener("click", () => {
        mostrarModalActualizar(category);
      });

            // Agregar la fila al cuerpo de la tabla
            table.querySelector('tbody').appendChild(row);
        });
    };


    // Función para crear el producto
  const crearProducto = async () => {
    const form = document.getElementById("form-crear-producto");
    const formData = new FormData(form);

    const nuevoProducto = {
      nombre: formData.get("nombre"),
      descripcion: formData.get("descripcion"),
      precio: formData.get("precio"),      
      id_categoria: parseInt(formData.get("categoria-producto")), // Convertir a número entero
    };

    try {
      const response = await fetch("http://localhost:3000/productos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoProducto),
      });

      if (!response.ok) {
        throw new Error("Error al crear el usuario");
      }

      // Actualizar la tabla de productos
      getProducts();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Función para eliminar el producto
  const eliminarProductos = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3000/productos/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar producto");
      }

      // Actualizar la tabla de producto después de eliminar
      getProducts();
    } catch (error) {
      console.error("Error:", error);
      // Manejar el error según tu necesidad (por ejemplo, mostrar un mensaje al usuario)
    }
  };

  const actualizarProducto = async (productId) => {
    const form = document.getElementById("form-crear-producto");
    const formData = new FormData(form);

    const productoActualizado = {
        nombre: formData.get("nombre"),
        descripcion: formData.get("descripcion"),
        precio: formData.get("precio"),      
        id_categoria: parseInt(formData.get("categoria-producto")) // Convertir a número entero
    };

    try {
        const response = await fetch(`http://localhost:3000/productos/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productoActualizado)
        });

        if (!response.ok) {
            throw new Error("Error al actualizar producto");
        }

        // Actualizar la tabla de usuarios después de actualizar
        getProducts();
    } catch (error) {
        console.error("Error:", error);
        // Manejar el error según tu necesidad (por ejemplo, mostrar un mensaje al usuario)
    }
};//hasta aca

     // Función para crear el botón y modal de Productos
     const createBtnOpenModalProductos = () => {
        const btnOpenModal = document.getElementById("btn-open-modal");
        btnOpenModal.innerHTML = `
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-producto">
                Crear producto
            </button>

            <!-- Modal de Crear Producto -->
            <div class="modal fade" id="modal-producto" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5">Crear Producto</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <!-- Aquí va el formulario para crear producto -->
                            <form id="form-crear-producto">
                                <!-- Campos del formulario -->
                                <input type="text" id="nombre-producto" name="nombre-producto" placeholder="Nombre del producto" required>
                                <input type="number" id="precio-producto" name="precio-producto" placeholder="Precio del producto" required>
                                <select id="categoria-producto" name="categoria-producto" required>
                                    <!-- Opciones de categorías cargadas dinámicamente -->
                                </select>
                                <!-- Otros campos según necesidad -->
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-primary" id="btn-guardar-producto">Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Cargar opciones de categorías en el formulario de crear producto
        loadCategoriasOptions();

        const btnSaveProducto = document.getElementById("btn-guardar-producto");
        btnSaveProducto.addEventListener("click", crearProducto);
    };
    const mostrarModalActualizar = async (product) => {
        const modalProducto = new bootstrap.Modal(document.getElementById("modal-producto"));
        modalProducto.show();
    
        // Rellenar el formulario con los datos del usuario a actualizar
        const form = document.getElementById("form-crear-producto");
        form.reset(); // Limpiar el formulario antes de rellenarlo
    
        form.querySelector("#nombre").value = product.nombre;
        form.querySelector("#descripcion").value = product.descripcion;
        form.querySelector("#precio").value = user.precio;
        form.querySelector("#categoria-producto").value = user.id_categoria;
    
        // Cambiar el botón "Guardar" por "Actualizar" y actualizar el EventListener
        const btnGuardar = document.getElementById("btn-guardar-producto");
        btnGuardar.innerHTML = "Actualizar";
        btnGuardar.removeEventListener("click", crearProducto); // Remover el EventListener anterior
        btnGuardar.addEventListener("click", () => {
            actualizarUsuario(product.id);
        });
    };

    // Función para cargar las opciones de categorías en el formulario de crear producto
    const loadCategoriasOptions = async () => {
        const selectCategoria = document.getElementById("categoria-producto");
        selectCategoria.innerHTML = ""; // Limpiar opciones actuales

        // Obtener categorías
        const response = await fetch("http://localhost:3000/categorias");
        const categorias = await response.json();

        // Iterar sobre las categorías y agregarlas como opciones al select
        categorias.forEach((categoria) => {
            const option = document.createElement("option");
            option.value = categoria.id;
            option.textContent = categoria.nombre;
            selectCategoria.appendChild(option);
        });
    };

    // Evento para mostrar la tabla de productos al hacer clic en Productos
    btnProductos.addEventListener("click", () => {
        getProducts();
        createBtnOpenModalProductos(); // Crear el botón y modal de Productos
    });
});