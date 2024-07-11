const db = require('../db/db')
const bcrypt = require('bcrypt');

const getAllUsers = (req, res) => {
    const sql = 'SELECT * FROM Usuario';
    db.query(sql, (err,result) => 
    {
        if(err) throw err;
        res.json(result);

    });
}

const getUserById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM Usuario WHERE id = ?';
    db.query(sql,[id], (err, result) => 
        {
            if(err) throw err; 
            res.json(result[0]);
        });

}

const createUser = (req, res) => {
    const { nombre, apellido, email, contraseña, id_rol } = req.body;

    // Validación de id_rol
    if (!Number.isInteger(id_rol)) {
        return res.status(400).json({ mensaje: 'El valor de id_rol debe ser un número entero válido' });
    }

    // Encriptar la contraseña
    bcrypt.hash(contraseña, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error al encriptar la contraseña:', err);
            return res.status(500).json({ mensaje: 'Error al crear usuario' });
        }

        // Query para insertar usuario con contraseña encriptada
        const sql = 'INSERT INTO Usuario (nombre,apellido,email,contraseña,id_rol) VALUES (?,?,?,?,?)';
        db.query(sql, [nombre, apellido, email, hashedPassword, id_rol], (err, result) => {
            if (err) {
                console.error('Error al crear usuario:', err);
                return res.status(500).json({ mensaje: 'Error al crear usuario' });
            }

            res.json({
                mensaje: 'Usuario Creado con Éxito',
                idUsuario: result.insertId
            });
        });
    });
};


const updateUser = (req, res) => {
    const {id} = req.params;
    const {nombre, apellido, email, id_rol} = req.body;

    const sql = 'UPDATE Usuario SET nombre = ?, apellido = ?, email = ?, id_rol = ? WHERE id = ?'
    db.query(sql,[nombre,apellido,email,id_rol, id], (err, result) => 
    {
        if(err) throw err;

        res.json(
            {
                message : 'Usuario editado con éxito'
            }
        );
    });

};

const deleteUser = (req, res) => {
    const {id} = req.params;
    const sql = 'DELETE FROM Usuario WHERE id= ?';
    db.query(sql, [id], (err, result) => 
        {
            if(err) throw err;

            res.json(
                {
                    message: 'Usuario Eliminado XD'
                }
            );
        });
    

};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}