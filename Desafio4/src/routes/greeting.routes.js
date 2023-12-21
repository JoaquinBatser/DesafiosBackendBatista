import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  let name = 'John'

  res.render('greetings', { title: 'Welcome', name })
})

export default router
