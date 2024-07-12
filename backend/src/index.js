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

const whitelist = ['https://66917e8f05661b48c2f62356--cozy-sawine-48f526.netlify.app/']

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('No permitido por CORS'))
        }
    }
}

app.use(cors(corsOptions));
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
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