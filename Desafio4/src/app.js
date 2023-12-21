import express from 'express'
import { engine } from 'express-handlebars'
import { __dirname } from './utils.js'

import greetingRouter from './routes/greeting.routes.js'
import productRouter from './routes/products.routes.js'
import cartRouter from './routes/cart.routes.js'
import userRouter from './routes/user.routes.js'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/greetings', greetingRouter)
app.use('/user', userRouter)

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
