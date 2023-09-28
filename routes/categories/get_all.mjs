import { Router } from 'express'
const router = Router()

import Category from '../../models/category.mjs'

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find()
    res.status(200).json(categories)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
