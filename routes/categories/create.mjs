import { Router } from 'express'
const router = Router()

import Category from '../../models/category.mjs'
import { validateCategory } from '../../schemas/category.mjs'

router.post('/create', async (req, res) => {
  try {
    const categoryInfo = req.body
    if (!categoryInfo) {
      return res.status(400).json({ message: "Data no found it" })
    }

    const validateInfo = validateCategory(categoryInfo)
    if (validateInfo.error) {
      return res.status(400).json({ message: validateInfo.error.message })
    }

    const newCategory = new Category(validateInfo.data)
    const categoryAdded = await newCategory.save()
    res.status(201).json(categoryAdded)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
