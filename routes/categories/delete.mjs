import { Router } from 'express'
const router = Router()

import Category from '../../models/category.mjs'

router.delete('/delete/:id', async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "Delete it correctly" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
