import { Router } from 'express'
import CartManager from '../classes/CartManager.js'

const router = Router()
const cartManager = new CartManager()

router.get('/', async (req, res) => {
  try {
    const cart = await cartManager.getCarts()

    res.json(cart)
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching cart',
      error: error.message,
    })
  }
})

router.get('/:cId', async (req, res) => {
  try {
    const { cId } = req.params
    const cart = await cartManager.getCartById(Number(cId))
    const products = cart.products
    res.json(products)
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching cart',
      error: error.message,
    })
  }
})

router.post('/', async (req, res) => {
  try {
    await cartManager.newCart()
    res.json({
      message: 'Successful new Cart',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error creating cart',
      error: error.message,
    })
  }
})

router.post('/:cId/product/:pId', async (req, res) => {
  try {
    const { cId } = req.params
    const { pId } = req.params

    await cartManager.addProductToCart(cId, pId)

    res.json({
      message: 'Product updated or added successfully',
    })
  } catch (error) {
    console.log(error)
  }
})

export default router
