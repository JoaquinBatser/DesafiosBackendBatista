import fs from 'fs'

class ProductManager {
  constructor() {
    this.path = './products.json'
    this.products = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
    this.productsIdCounter = 1
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

    fs.readFile(this.path, 'utf8', (err, data) => {
      if (err) {
        throw new Error('Error reading products file')
      }

      let products = []
      if (data) {
        try {
          products = JSON.parse(data)
        } catch (err) {
          throw new Error('Error parsing products file')
        }
      }

      products.push(product)

      fs.writeFile(this.path, JSON.stringify(products), (err) => {
        if (err) {
          throw new Error('Error writing products file')
        }

        console.log('Product added successfully')
      })
    })
  }

  // addProduct({ title, description, price, thumbnail, code, stock }) {
  //   if (this.products.some((product) => product.code === code)) {
  //     console.log(`Products with code ${code} already exists`)
  //     return
  //   }

  //   if (!title || !description || !price || !thumbnail || !code || !stock) {
  //     throw new Error(
  //       'Every product must have a title, description, price, thumbnail, code and stock'
  //     )
  //   }

  //   const product = {
  //     id: this.productsIdCounter++,
  //     title,
  //     description,
  //     price,
  //     thumbnail,
  //     code,
  //     stock,
  //   }

  //   fs.appendFile(this.getProducts, JSON.stringify(product) + '\n', (err) => {
  //     if (err) {
  //       console.log(err)
  //     }
  //     console.log('Product added successfully')
  //   })
  // }

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

  updateProduct(id, field) {}

  deleteProduct(id) {
    try {
      const productById = this.products.find((product) => product.id === id)
      const indexOfItem = this.products.indexOf(productById)
      if (productById) {
        this.products.splice(indexOfItem, 1)
      } else {
        throw new Error('Product not found')
      }
    } catch (error) {
      return error.message
    }
  }
}

const productManager = new ProductManager()

console.log(productManager.getProducts())

productManager.addProduct({
  title: 'Product 1',
  description: 'Description 1',
  price: 100,
  thumbnail: 'thumbnail 1',
  code: 'code 1',
  stock: 10,
})

console.log(productManager.getProducts())
