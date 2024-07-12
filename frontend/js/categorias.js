document.addEventListener("DOMContentLoaded", function () {
    const btnCategorias = document.getElementById('btn-categorias');
    const newTable = document.getElementById('admin-table');

    // Función para obtener y mostrar categorias
    const getCategories = async () => {
        // Limpiar contenido actual
        newTable.innerHTML = '';

        // Crear una sola tabla
        const table = document.createElement('table');
        table.className = 'table user-list';

        // Crear el encabezado de la tabla
        table.innerHTML = `
            <thead>
                <tr>
                    <th class="text-center"><span>Id</span></th>
                    <th class="text-center"><span>Categoría</span></th>
                    <th class="text-center"<span>Acciones</span></th>
                </tr>
            </thead>
            <tbody></tbody> <!-- Cuerpo de la tabla donde se añadirán las filas -->
        `;

        // Agregar la tabla al contenedor
        newTable.appendChild(table);

        // Obtener categorias
        const response = await fetch('http://localhost:3000/categorias');
        const categories = await response.json();

        // Iterar sobre cada categoria y agregarlos como filas a la tabla
        categories.forEach(category => {
            // Crear una nueva fila
            const row = document.createElement('tr');
            
            // Añadir celdas con los datos de la categoria
            row.innerHTML = `
                <td class="text-center">${category.id}</td>
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
                const userId = btnEliminar.getAttribute("data-category-id");
                eliminarCategpria(categoryId);
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
    const crearCategoria = async () => {
        const form = document.getElementById("form-crear-categoria");
        const formData = new FormData(form);
    
        const nuevaCategoria = {
          id: formData.get("id"),
          nombre: formData.get("nombre")
          
        };
    
        try {
          const response = await fetch("http://localhost:3000/categorias/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevaCategoria),
          });
    
          if (!response.ok) {
            throw new Error("Error al crear la categoría");
          }
    
          // Actualizar la tabla de categorias
          getCategories();
        } catch (error) {
          console.error("Error:", error);
        }
    };
    const eliminarCategoria = async (categoryId) => {
        try {
            const response = await fetch(`http://localhost:3000/usuarios/${categoryId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Error al eliminar usuario");
            }

            // Actualizar la tabla de usuarios después de eliminar
            getCategories();
        } catch (error) {
            console.error("Error:", error);
            // Manejar el error según tu necesidad (por ejemplo, mostrar un mensaje al usuario)
        }
    };

    const actualizarCategoria = async (categoryId) => {
        const form = document.getElementById("form-crear-categoria");
        const formData = new FormData(form);
    
        const categoriaActualizada = {
            id: formData.get("id"),
            nombre: formData.get("nombre")
        };
    
        try {
            const response = await fetch(`http://localhost:3000/usuarios/${categoryId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(categoriaActualizada)
            });
    
            if (!response.ok) {
                throw new Error("Error al actualizar categoria");
            }
    
            // Actualizar la tabla de usuarios después de actualizar
            getCategories();
        } catch (error) {
            console.error("Error:", error);
            // Manejar el error según tu necesidad (por ejemplo, mostrar un mensaje al usuario)
        }
    };
    
    // Función para crear el botón y modal de Categorías
    const createBtnOpenModalCategorias = () => {
        const btnOpenModal = document.getElementById("btn-open-modal");
        btnOpenModal.innerHTML = `
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-categoria">
                Crear categoría
            </button>

            <!-- Modal de Crear Categoría -->
            <div class="modal fade" id="modal-categoria" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5">Crear Categoría</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <!-- Aquí va el formulario para crear categoría -->
                            <form id="form-crear-categoria">
                                <!-- Campos del formulario -->
                                
                                <input type="number" id="id-categoria" name="id-categoria" placeholder="Numero de la categoria" required>
                                <input type="text" id="nombre-categoria" name="nombre-categoria" placeholder="Nombre de la categoría" required>
                                <!-- Otros campos según necesidad -->
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-primary" id="btn-guardar-categoria">Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        const btnSaveUsuario = document.getElementById("btn-guardar-usuario");
        btnSaveUsuario.addEventListener("click", crearUsuario);
    };
    
    const mostrarModalActualizar = async (category) => {
        const modalCategoria = new bootstrap.Modal(document.getElementById("modal-categoria"));
        modalCategoria.show();
    
        // Rellenar el formulario con los datos del usuario a actualizar
        const form = document.getElementById("form-crear-categoria");
        form.reset(); // Limpiar el formulario antes de rellenarlo
    
        form.querySelector("#id").value = category.id;
        form.querySelector("#nombre").value = category.nombre;
        
        // Cambiar el botón "Guardar" por "Actualizar" y actualizar el EventListener
        const btnGuardar = document.getElementById("btn-guardar-categoria");
        btnGuardar.innerHTML = "Actualizar";
        btnGuardar.removeEventListener("click", crearCategoria); // Remover el EventListener anterior
        btnGuardar.addEventListener("click", () => {
            actualizarCategoria(category.id);
        });
    };
    
      
      // Cargar la tabla de usuarios al cargar la página
      getCategories();
      createBtnOpenModalCategorias();


        btnCategorias.addEventListener("click", () => {
          getCategories();
          createBtnOpenModalCategorias(); // Crear el botón y modal de Categorías
        });

});