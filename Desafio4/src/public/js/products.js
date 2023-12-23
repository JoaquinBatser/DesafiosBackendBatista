const socket = io()

const addProductBtn = document.getElementById('addProductBtn')
const deleteProductBtn = document.getElementById('deleteProductBtn')
const productList = document.getElementById('productList')

addProductBtn.addEventListener('click', e => {
  e.preventDefault()

  const title = document.getElementById('title')
  const description = document.getElementById('description')
  const price = document.getElementById('price')
  const thumbnail = document.getElementById('thumbnail')
  const code = document.getElementById('code')
  const category = document.getElementById('category')
  const stock = document.getElementById('stock')

  const product = {
    title: title.value,
    description: description.value,
    price: price.value,
    thumbnail: thumbnail.value,
    code: code.value,
    category: category.value,
    stock: stock.value,
  }
  socket.emit('addProduct', product)

  title.value = ''
  description.value = ''
  price.value = ''
  thumbnail.value = ''
  code.value = ''
  category.value = ''
  stock.value = ''
})

deleteProductBtn.addEventListener('click', () => {
  const id = document.getElementById('id')
  console.log(id)
  socket.emit('deleteProduct', id.value)
  id.value = ''
  alert('Product deleted successfully')
})

socket.on('updateProducts', products => {
  productList.innerHTML = ''

  products.forEach(product => {
    const listItem = document.createElement('li')
    listItem.textContent = product.title
    productList.appendChild(listItem)
  })
})
