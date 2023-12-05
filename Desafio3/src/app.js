import express from 'express'
import ProductManager from './js/ProductManager.js'

const app = express()
const PORT = 8080

const productManager = new ProductManager()

console.log(await productManager.loadProducts())

app.get('/products', async (req, res) => {
  try {
    const products = await productManager.getProducts()
    const { limit } = req.query
    let productsShown = products
    if (limit) {
      productsShown = products.slice(0, Number(limit))
    }
    res.json(productsShown)
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching products',
      error: error.message,
    })
  }
})

app.get('/products/:pId', async (req, res) => {
  try {
    const { pId } = req.params
    const products = await productManager.getProducts()
    const matchingProduct = products.find(product => product.id === Number(pId))
    if (!matchingProduct) {
      throw new Error('Product not found')
    }
    res.json(matchingProduct)
  } catch (error) {
    res.status(404).json({
      message: error.message,
      data: null,
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/products`)
})
