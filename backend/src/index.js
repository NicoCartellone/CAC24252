const express = require('express')
const db = require('../src/db/db')
const app = express()
const PORT = process.env.PORT

app.use(express.json())

app.get('/', (req, res) => {
    db.query('SELECT * FROM Usuario', (err, results) => {
        if (err) {
            console.log(err)
            return res.status(500).send('An error occurred')
        }
        res.json(results)
    })
})

app.listen(PORT || 3000, () => {
    console.log(`Server is running on port ${PORT}`)
})