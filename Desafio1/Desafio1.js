class ProductManager {
  constructor() {
    this.products = []
    this.productsIdCounter = 1
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (this.products.some((product) => product.code === code)) {
      console.log(`Products with code ${code} already exists`)
      return
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
  }

  getProducts() {
    return this.products
  }

  getProductById(id) {
    try {
      const productById = this.products.find((product) => product.id === id)
      if (productById) {
        return productById
      } else {
        throw new Error('Product not found')
      }
    } catch (error) {
      return error.message
    }
  }
}

const productManager = new ProductManager()

//TESTS

console.log(productManager.getProducts())

// // productManager.addProduct(
// //   'producto prueba',
// //   'Este es un producto prueba',
// //   200,
// //   'Sin imagen',
// //   'abc123',
// //   25
// // )

// // productManager.addProduct(
// //   'producto prueba',
// //   'Este es un producto prueba',
// //   200,
// //   'Sin imagen',
// //   'abc123',
// //   25
// // )
// console.log(productManager.getProducts())

console.log(productManager.getProductById(2))
