const socket = io()

const addProductBtn = document.getElementById('addProductBtn')
const deleteProductBtn = document.getElementById('deleteProductBtn')
const productList = document.getElementById('productList')

addProductBtn.addEventListener('click', () => {
  const title = document.getElementById('title').value
  const description = document.getElementById('description').value
  const price = document.getElementById('price').value
  const thumbnail = document.getElementById('thumbnail').value
  const code = document.getElementById('code').value
  const category = document.getElementById('category').value
  const stock = document.getElementById('stock').value

  const product = {
    title,
    description,
    price,
    thumbnail,
    code,
    category,
    stock,
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
  const id = document.getElementById('id').value
  socket.emit('deleteProduct', id)
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
