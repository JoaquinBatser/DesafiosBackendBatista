import { Router } from 'express'
import ProductManager from '../classes/ProductManager.js'

const router = Router()
const productManager = new ProductManager()

router.get('/', async (req, res) => {
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

router.get('/:pId', async (req, res) => {
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

router.post('/', async (req, res) => {
    const { title, description, price, thumbnail, code, status, category, stock } = req.body

    const newProduct = {
        title,
        description,
        price,
        thumbnail,
        code,
        status,
        category,
        stock,
    }

    try {
        const result = await productManager.addProduct(newProduct)
        res.json({ message: 'Product added successfully', data: result })
    } catch (err) {
        res.status(500).json({
            message: 'error',
            data: err,
        })
    }
})

router.put('/:pId', async (req, res) => {
    const { pId } = req.params
    const { title, description, price, thumbnail, status, category, code, stock } = req.body

    const newData = {
        title,
        description,
        price,
        thumbnail,
        status,
        category,
        code,
        stock,
    }

    try {
        const productToUpdate = await productManager.getProductById(Number(pId))
        await productManager.updateProduct(Number(pId), newData)
        const updatedProduct = await productManager.getProductById(Number(pId))

        res.json({
            message: 'Product updated successfully',
            data: {
                oldProduct: productToUpdate,
                newProduct: updatedProduct,
            },
        })
    } catch (err) {
        res.json({
            message: 'Error updating product',
            data: err,
        })
    }
})

router.delete('/:pId', (req, res) => {
    const { pId } = req.params
    try {
        productManager.deleteProduct(Number(pId))
        res.json({
            message: `Product with ID ${pId} deleted successfully`,
        })
    } catch {
        console.log('Product not found')
    }
})

export default router
