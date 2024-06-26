const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: process.env.HOST,
    user:  process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  });

  connection.connect((err) => {
    if (err) {
        console.log('Error conectando a la Db');
        return;
    }
    console.log('Conexión establecida');
  })

  connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE}`, (err, results) => {
    if(err){
      console.log('Error creando la base de datos', err)
      return
    }
  })

  module.exports = connection;
