import fs from 'fs/promises'

const FILE_PATH = './src/products/products.json'

class ProductManager {
  constructor() {
    this.path = FILE_PATH
    this.products = this.loadProducts()
    this.loadLastId()
  }

  async loadLastId() {
    try {
      if (this.products.length === 0) {
        this.productsIdCounter = 1
      } else {
        const lastProduct = this.products[this.products.length - 1]
        this.productsIdCounter = lastProduct ? lastProduct.id + 1 : 1
      }
    } catch (error) {
      console.log(error)
    }
  }
  async loadProducts() {
    try {
      try {
        await fs.access(this.path)
      } catch (error) {
        await fs.writeFile(this.path, '[]')
      }

      const fileContent = await fs.readFile(this.path, 'utf-8')
      try {
        const parsedProducts = JSON.parse(fileContent)
        console.log('parsedProducts:', parsedProducts)
        return parsedProducts
      } catch (error) {
        console.error('Error parsing products:', error)
        return []
      }
    } catch (error) {
      console.error('Error loading products:', error)
      return []
    }
  }

  async addProduct(newProduct) {
    try {
      if (this.products.some(product => product.code === newProduct.code)) {
        throw new Error(`Products with code ${newProduct.code} already exists`)
      }

      if (
        !newProduct.title ||
        !newProduct.description ||
        !newProduct.price ||
        !newProduct.thumbnail ||
        !newProduct.code ||
        !newProduct.stock
      ) {
        throw new Error(
          'Every product must have a title, description, price, thumbnail, code and stock'
        )
      }

      newProduct.id = this.productsIdCounter++
      this.products.push(newProduct)

      await fs.writeFile(this.path, JSON.stringify(this.products, null, 2))

      console.log('Product added successfully')
    } catch (error) {
      console.log(error)
    }
  }

  async updateProduct(id, updatedProduct) {
    try {
      const parsedId = parseInt(id)
      const productIndex = this.products.findIndex(product => product.id === parsedId)
      if (productIndex === -1) {
        throw new Error('Product not found')
      }
      const updatedProductWithId = { id: parsedId, ...updatedProduct }
      this.products[productIndex] = updatedProductWithId

      await fs.writeFile(this.path, JSON.stringify(this.products, null, 2))
    } catch (error) {
      console.log(error)
    }
  }

  async getProducts() {
    return this.products
  }

  async getProductById(id) {
    try {
      const parsedId = parseInt(id)
      const productById = this.products.find(product => product.id === parsedId)
      if (productById) {
        return productById
      } else {
        throw new Error('Product not found')
      }
    } catch (error) {
      console.log(error)
    }
  }

  async deleteProduct(id) {
    try {
      const productIndex = this.products.findIndex(product => product.id === id)
      if (productIndex !== -1) {
        this.products.splice(productIndex, 1)
        await fs.writeFile(this.path, JSON.stringify(this.products, null, 2))
        console.log('Product deleted successfully')
      } else {
        throw new Error('Product not found')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export default ProductManager
