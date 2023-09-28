import { Router } from 'express'
const router = Router()

import Category from '../../models/category.mjs'

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
    res.status(200).json(category)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
