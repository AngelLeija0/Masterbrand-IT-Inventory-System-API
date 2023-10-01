import { Router } from 'express'
const router = Router()

import Category from '../../models/category.mjs'
import { validatePartialCategory } from '../../schemas/category.mjs'

router.patch('/update/:id', async (req, res) => {
  try {
    const categoryInfo = req.body
    if (!categoryInfo) {
      return res.status(400).json({ message: "Data no found it" })
    }

    const validateInfo = validatePartialCategory(categoryInfo)
    if (validateInfo.error) {
      return res.status(400).json({ message: validateInfo.error.message })
    }
    
    const category = await Category.findById(req.params.id)
    if (!category) {
      return res.status(404).json({ message: "Category not found" })
    }

    category.set(validateInfo.data)
    category.updated_at = new Date()

    const categoryUpdated = await category.save()
    res.status(200).json(categoryUpdated)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
})

export default router
