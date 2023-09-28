import { Router } from 'express'
const router = Router()

import Administrator from '../../models/administrator.mjs'

router.get('/', async (req, res) => {
  try {
    const administrators = await Administrator.find()
    res.status(200).json(administrators)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
