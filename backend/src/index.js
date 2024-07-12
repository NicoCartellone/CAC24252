const express = require('express')
const roleRouter = require('./routes/roleRoutes')
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')
const categoryRouter = require('./routes/categoryRoutes')
const loginRouter = require('./routes/loginRoutes')
const path = require('path')
const cors = require('cors');

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    // mostrar un simple html con un mensaje de bienvenida y las rutas disponibles a modo de documentacion para el usuario
    res.send(`
        <h1>Bienvenido a la API de CAC Ecommerce</h1>
        <h2>Rutas disponibles:</h2>
        <ul>
            <li><a href="/roles">/roles</a></li>
            <li><a href="/usuarios">/usuarios</a></li>
            <li><a href="/productos">/productos</a></li>
            <li><a href="/categorias">/categorias</a></li>
            <li><a href="/login">/login</a></li>
        </ul>
    `)
})
app.use('/roles', roleRouter)
app.use('/usuarios', userRouter)
app.use('/productos', productRouter)
app.use('/categorias', categoryRouter)
app.use('/login', loginRouter)

app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})