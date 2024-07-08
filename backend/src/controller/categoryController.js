const db = require('../db/db')
const { get } = require('../routes/roleRoutes')

const getAllCategories = (req, res) => {

    const sql = 'SELECT * FROM Categoria';
    db.query(sql, (err,result) => 
    {
        if(err) throw err;
        res.json(result);

    });
}

const getCategoryById = (req, res) => {

    const { id } = req.params;
    const sql = 'SELECT * FROM categoria WHERE id = ?';
    db.query(sql, [id], (err, result) => 
        {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener la categoria' });
              }
              if (result.length === 0) {
                return res.status(404).json({ message: 'Categoria no encontrada' });
              } 
            res.json(result[0]);
        });
}

const createCategory = (req, res) => {

    const { id, nombre } =req.body;
    
    if (!Number.isInteger(id)) {
        return res.status(400).json({ mensaje: 'El valor de id debe ser un número entero válido' });
    }

    const sql = 'INSERT INTO Categoria (id, nombre) VALUES (?,?)';

    
    db.query(sql, [id, nombre], (err, result) => {
        if (err) {
            console.error('Error al crear la categoria:', err);
            return res.status(500).json({ mensaje: 'Error al crear la categoria' });
        }

        
        res.json({
            mensaje: 'categoría Creada con Éxito',
            idProducto: result.insertId
        });
    });
}

const updateCategory = (req, res) => {

    const {id} = req.params;
    const {nombre} = req.body;

    const sql = 'UPDATE Categoria SET  nombre = ? WHERE id = ?'
    db.query(sql,[nombre, id], (err, result) => 
    {
        if(err) throw err;

        res.json(
            {
                message : 'Categoría editado con éxito'
            }
        );
    });
}

const deleteCategory = (req, res) => {

    const {id} = req.params;
    const sql = 'DELETE FROM Categoria WHERE id= ?';
    db.query(sql, [id], (err, result) => 
        {
            if(err) throw err;

            res.json(
                {
                    message: 'Categoría Eliminada XD'
                }
            );
        });
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}