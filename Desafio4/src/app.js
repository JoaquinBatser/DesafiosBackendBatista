import express from 'express'
import { engine } from 'express-handlebars'
import { __dirname } from './utils.js'
import { Server } from 'socket.io'

import ProductManager from './classes/ProductManager.js'

import productRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'

const app = express()
const PORT = 8080
const productManager = new ProductManager()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/', viewsRouter)

const httpServer = app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})

const socketServer = new Server(httpServer)

socketServer.on('connection', socket => {
  console.log('New client connected')
  socket.on('addProduct', async product => {
    const title = product.title
    const description = product.description
    const price = product.price
    const thumbnail = product.thumbnail
    const code = product.code
    const category = product.category
    const stock = product.stock

    try {
      const addedProduct = await productManager.addProduct({
        title,
        description,
        price,
        thumbnail,
        code,
        category,
        stock,
      })

      const products = await productManager.getProducts()
      addedProduct.success && socketServer.emit('updateProducts', products)
    } catch (error) {
      console.log(error)
    }
  })

  socket.on('deleteProduct', async id => {
    try {
      const deletedProduct = await productManager.deleteProduct(Number(id))
      const products = await productManager.getProducts()
      deletedProduct.success && socketServer.emit('updateProducts', products)
    } catch (error) {
      console.log(error)
    }
  })
})
