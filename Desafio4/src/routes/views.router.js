import { Router } from 'express'
import ProductManager from '../classes/ProductManager.js'

const router = Router()
const productManager = new ProductManager()

router.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts()
    res.render('index', {
      title: 'Products List',
      products: products,
      style: '/css/products.css',
    })
  } catch (err) {
    console.log(err)
  }
})

router.get('/realtimeproducts', async (req, res) => {
  try {
    const products = await productManager.getProducts()
    res.render('realtimeproducts', {
      title: 'Products List in real time',
      products: products,
      style: '/css/products.css',
    })
  } catch (err) {
    console.log(err)
  }
})

export default router
