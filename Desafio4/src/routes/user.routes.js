import { Router } from 'express'

const router = Router()

let users = [
  {
    id: 1,
    name: 'John',
    lastName: 'Doe',
    age: 25,
    email: 'johnDoe@gmail.com',
  },
  {
    id: 2,
    name: 'Jane',
    lastName: 'Doe',
    age: 34,
    email: 'janeDoe@gmail.com',
    active: false,
  },
  {
    id: 3,
    name: 'Mike',
    lastName: 'Doe',
    age: 12,
    email: 'mikeDoe@gmail.com',
    active: true,
  },
  {
    id: 4,
    name: 'Bill',
    lastName: 'Doe',
    age: 65,
    email: 'billDoe@gmail.com',
    active: false,
  },
  {
    id: 5,
    name: 'Kate',
    lastName: 'Doe',
    age: 43,
    email: 'kateDoe@gmail.com',
    active: true,
  },
]

router.get('/', (req, res) => {
  const randomId = Math.floor(Math.random() * users.length)
  const user = users[randomId]
  user.title = `User ${user.name}`
  user.style = '/style.css'

  res.render('user', user)
})

router.get('/new', (req, res) => {
  res.render('createuser', { title: 'Create User' })
})

router.get('/all', (req, res) => {
  let usersList = { title: 'Users list', users: users, style: '/stylelist.css' }
  res.render('list', usersList)
})

router.post('/api/new', (req, res) => {})

export default router
