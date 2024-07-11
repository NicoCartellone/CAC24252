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
        const response = await fetch('http://localhost:8080/categorias');
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

            // Agregar la fila al cuerpo de la tabla
            table.querySelector('tbody').appendChild(row);
        });
    }
    
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
    };

    btnCategorias.addEventListener("click", () => {
        getCategories();
        createBtnOpenModalCategorias(); // Crear el botón y modal de Categorías
    });

});