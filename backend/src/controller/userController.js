const db = require('../db/db')

const getAllUsers = (req, res) => {
    const sql = 'SELECT * FROM Usuario';
    db.query(sql, (err,result) => 
    {
        if(err) throw err;
        res.json(result);

    });
}

const getUserById = (req, res) => {
    const {id} = req.params;
    const sql = 'SELECT * FROM Usuario WHERE ID = ?';
    db.query(sql,[id], (err, result) => 
        {
            if(err) throw err; 
            res.json(result);
        });

}

const createUser = (req, res) => {
    const {nombre, apellido, mail, contraseña} = req.body;

    const sql = 'INSERT INTO Usuario (nombre,apellido,mail,contraseña) VALUES (?,?,?,?)';

    db.query(sql,[nombre, apellido, mail, contraseña], (err, result) => 
        {
            if(err) throw err;

            res.json({
                mensaje : 'Usuario Creado con Éxito',
                idUsuario: result.insertId
            });
        })

}

const updateUser = (req, res) => {
    const {id} = req.params;
    const {nombre,apellido,mail} = req.body;

    const sql = 'UPDATE Usuario SET nombre = ?, apellido = ?, mail = ? WHERE id = ?'
    db.query(sql,[nombre,apellido,mail,id], (err, result) => 
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