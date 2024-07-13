document.addEventListener("DOMContentLoaded", function () {
    const btnProductos = document.getElementById("btn-productos");
    const newTable = document.getElementById("admin-table");
    const baseURL = "https://cac-ecommerce.vercel.app/"
    const localURL = "http://localhost:8080/"

    // Función para obtener y mostrar productos
    const getProducts = async () => {
        // Limpiar contenido actual
        newTable.innerHTML = "";

        // Crear una sola tabla
        const table = document.createElement("table");
        table.className = "table user-list";

        // Crear el encabezado de la tabla
        table.innerHTML = `
            <thead>
                <tr>
                    <th class="text-center"><span>Producto</span></th>
                    <th class="text-center"><span>Descripción</span></th>
                    <th class="text-center"><span>Categoría</span></th>
                    <th class="text-center"><span>Precio</span></th>
                    <th class="text-center"><span>Acciones</span></th>
                </tr>
            </thead>
            <tbody></tbody> <!-- Cuerpo de la tabla donde se añadirán las filas -->
        `;

        // Agregar la tabla al contenedor
        newTable.appendChild(table);

        // Obtener productos desde el servidor
        const response = await fetch(`${baseURL}productos`);
        const products = await response.json();

        // Iterar sobre cada producto y agregarlos como filas a la tabla
        products.forEach(async (product) => {
            const categoryResponse = await fetch(`${baseURL}categorias/${product.id_categoria}`);
            const category = await categoryResponse.json();

            // Crear una nueva fila
            const row = document.createElement("tr");

            // Añadir celdas con los datos del producto
            row.innerHTML = `
                    <td class="text-center">${product.nombre}</td>
                    <td class="text-center">${product.descripcion}</td>
                    <td class="text-center">${category[0].nombre}</td>
                    <td class="text-center">${product.precio}</td>
                    <td class="text-center">
                        <a href="#" class="table-link">
                            <span class="fa-stack">
                                <i class="fa fa-square fa-stack-2x"></i>
                                <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
                            </span>
                        </a>
                        <a href="#" class="table-link danger btn-eliminar" data-producto-id="${product.id}">
                            <span class="fa-stack">
                                <i class="fa fa-square fa-stack-2x"></i>
                                <i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                            </span>
                        </a>
                    </td>
                `;

            // Agregar listener para el botón de eliminar producto
            const btnEliminar = row.querySelector(".btn-eliminar");
            btnEliminar.addEventListener("click", () => {
                const productId = btnEliminar.getAttribute("data-producto-id");
                eliminarProducto(productId);
            });

            // Agregar listener para el botón de actualizar producto
            const btnActualizar = row.querySelector(".fa-pencil");
            btnActualizar.addEventListener("click", () => {
                mostrarModalActualizar(product);
            });

            // Agregar la fila al cuerpo de la tabla
            table.querySelector("tbody").appendChild(row);
        });
    };

    // Función para crear un producto
    const crearProducto = async () => {
        const form = document.getElementById("form-crear-producto");
        const formData = new FormData(form);

        const nuevoProducto = {
            nombre: formData.get("nombre-producto"),
            descripcion: formData.get("descripcion-producto"),
            precio: parseFloat(formData.get("precio-producto")), // Convertir a número flotante
            id_categoria: parseInt(formData.get("categoria-producto")), // Convertir a número entero
        };

        try {
            const response = await fetch(`${baseURL}productos/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(nuevoProducto),
            });

            if (!response.ok) {
                throw new Error("Error al crear el producto");
            }

            // Actualizar la tabla de productos
            getProducts();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Función para eliminar un producto
    const eliminarProducto = async (productoId) => {
        try {
            const response = await fetch(`${baseURL}productos/${productoId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Error al eliminar producto");
            }

            // Actualizar la tabla de productos después de eliminar
            getProducts();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const actualizarProducto = async (productoId) => {
        const form = document.getElementById("form-crear-producto");
        const formData = new FormData(form);

        const productoActualizado = {
            nombre: formData.get("nombre-producto"),
            descripcion: formData.get("descripcion-producto"),
            precio: parseFloat(formData.get("precio-producto")),
            id_categoria: parseInt(formData.get("categoria-producto")),
        }

        try {
            const response = await fetch(`${baseURL}productos/${productoId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productoActualizado),
            });

            if (!response.ok) {
                throw new Error("Error al actualizar producto");
            }

            // Actualizar la tabla de productos después de actualizar
            getProducts();
            form.reset();
        } catch (error) {
            console.error("Error:", error);
        }
    }

    // Función para crear el botón y modal de Productos
    const createBtnOpenModalProductos = async () => {
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
                                <div class="mb-3">
                                    <label for="nombre-producto" class="form-label">Nombre del Producto</label>
                                    <input type="text" class="form-control" id="nombre-producto" name="nombre-producto" placeholder="Nombre del Producto" required>
                                </div>
                                <div class="mb-3">
                                    <label for="descripcion-producto" class="form-label">Descripción</label>
                                    <input type="text" class="form-control" id="descripcion-producto" name="descripcion-producto" placeholder="Descripción" required>
                                </div>
                                <div class="mb-3">
                                    <label for="precio-producto" class="form-label">Precio</label>
                                    <input type="number" step="0.01" class="form-control" id="precio-producto" name="precio-producto" placeholder="Precio" required>
                                </div>
                                <div class="mb-3">
                                    <label for="categoria-producto" class="form-label">Categoría</label>
                                    <select id="categoria-producto" name="categoria-producto" class="form-select" required>
                                        <!-- Opciones de categorías cargadas dinámicamente -->
                                    </select>
                                </div>
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

        try {
            const response = await fetch(`${baseURL}categorias`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (!response.ok) {
                throw new Error("Error al cargar las categorías");
            }
            const categorias = await response.json();
            const selectCategoria = document.getElementById("categoria-producto");
            selectCategoria.innerHTML = '';
            categorias.forEach((categoria) => {
                const option = document.createElement("option");
                option.value = categoria.id;
                option.textContent = categoria.nombre;
                selectCategoria.appendChild(option);
            })
        } catch (error) {
            console.error("Error:", error);
        }

        // Cargar opciones de categorías en el formulario de crear producto

        const btnSaveProducto = document.getElementById("btn-guardar-producto");
        btnSaveProducto.addEventListener("click", crearProducto);

        // await loadCategoriasOptions();
    };

    const mostrarModalActualizar = async (producto) => {
        const modalProducto = new bootstrap.Modal(document.getElementById("modal-producto"), {
            backdrop: "static",
            keyboard: false,
        });
        modalProducto.show();

        const form = document.getElementById("form-crear-producto");
        form.reset();

        form.querySelector("#nombre-producto").value = producto.nombre;
        form.querySelector("#descripcion-producto").value = producto.descripcion;
        form.querySelector("#precio-producto").value = producto.precio;
        form.querySelector("#categoria-producto").value = producto.id_categoria;

        const btnSaveProducto = document.getElementById("btn-guardar-producto");
        btnSaveProducto.innerHTML = "Actualizar";
        btnSaveProducto.removeEventListener("click", crearProducto);
        btnSaveProducto.addEventListener("click", () => {
            actualizarProducto(producto.id);
            modalProducto.hide();
        });
    }

    // Evento para mostrar la tabla de productos al hacer clic en Productos
    btnProductos.addEventListener("click", () => {
        getProducts();
        createBtnOpenModalProductos(); // Actualizar el botón y modal de Productos
    });
});
