import { Router } from 'express'
const router = Router()

import Category from '../../models/category.mjs'
import createNotification from './../notifications/create.mjs'

router.delete('/delete/:id', async (req, res) => {
  try {
    const categoryDeleted = await Category.findByIdAndDelete(req.params.id)

    const notificationName = "Categoria eliminada"
    const notificationDescription = `Ha sido sido eliminada una categoria llamada ${categoryDeleted.name}`
    const notificationIcon = "bookmark"
    const notificationImportance = "medium"
    createNotification(notificationName, notificationDescription, notificationIcon, notificationImportance)

    res.status(200).json({ message: "Delete it correctly" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
