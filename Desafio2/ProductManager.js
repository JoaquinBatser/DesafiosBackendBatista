import fs from 'fs'

class ProductManager {
  constructor() {
    this.path = './products.json'
    this.products = this.loadProducts()
    if (this.products.length === 0) {
      this.productsIdCounter = 1
    } else {
      const lastProduct = this.products[this.products.length - 1]
      this.productsIdCounter = lastProduct.id + 1
    }
  }

  loadProducts() {
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, '[]')
    } else {
      try {
        const fileContent = fs.readFileSync(this.path, 'utf-8')
        return JSON.parse(fileContent)
      } catch (error) {
        return []
      }
    }
  }
  addProduct({ title, description, price, thumbnail, code, stock }) {
    if (this.products.some((product) => product.code === code)) {
      throw new Error(`Products with code ${code} already exists`)
    }

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error(
        'Every product must have a title, description, price, thumbnail, code and stock'
      )
    }

    const product = {
      id: this.productsIdCounter++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    }

    this.products.push(product)

    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2))

    console.log('Product added successfully')
  }

  updateProduct(id, updatedProduct) {
    try {
      const parsedId = parseInt(id)
      const productIndex = this.products.findIndex((product) => product.id === parsedId)
      if (productIndex === -1) {
        throw new Error('Product not found')
      }
      const updatedProductWithId = { id: parsedId, ...updatedProduct }
      this.products[productIndex] = updatedProductWithId

      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2))
    } catch (error) {
      return error.message
    }
  }

  getProducts() {
    return this.products
  }

  getProductById(id) {
    try {
      const parsedId = parseInt(id)
      const productById = this.products.find((product) => product.id === parsedId)
      if (productById) {
        return productById
      } else {
        throw new Error('Product not found')
      }
    } catch (error) {
      return error.message
    }
  }

  deleteProduct(id) {
    try {
      const productIndex = this.products.findIndex((product) => product.id === id)
      if (productIndex !== -1) {
        this.products.splice(productIndex, 1)
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2))
        console.log('Product deleted successfully')
      } else {
        throw new Error('Product not found')
      }
    } catch (error) {
      return error.message
    }
  }
}
