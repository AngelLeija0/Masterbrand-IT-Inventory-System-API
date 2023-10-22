import { Router } from 'express'
const router = Router()

import Category from '../../models/category.mjs'

router.get('/name/:name', async (req, res) => {
  try {
    const category = await Category.findOne({ name: req.params.name })
    res.status(200).json(category)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
