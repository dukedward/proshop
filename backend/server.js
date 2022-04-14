import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import products from './data/products.js'

dotenv.config()
connectDB()
const app = express()

app.get('/', (req, res) => {
    res.send('API is running ')
})

app.get('/api/products', (req, res) => {
    res.json(products)
})

app.get('/api/products/:id', (req, res) => {
    const product = find((p) => p._id === req.params.id)
    res.json(product)
})

const port = process.env.PORT || 5000

app.listen(
    port,
    console.log(
        `Server running in ${process.env.NODE_ENV} on port ${port}`.yellow.bold
    )
)
