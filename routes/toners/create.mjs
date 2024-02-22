import { Router } from 'express'
const router = Router()

import Toner from '../../models/toner.mjs'
import { validateToner } from '../../schemas/toner.mjs'

router.post('/create', async (req, res) => {
  try {
    const tonerInfo = req.body
    if (!tonerInfo) {
      return res.status(400).json({ message: "Data no found it" })
    }

    const validateInfo = validateToner(tonerInfo)
    if (validateInfo.error) {
      return res.status(400).json({ message: validateInfo.error.message })
    }
    const newToner = new Toner(validateInfo.data)
    const tonerAdded = await newToner.save()
    res.status(201).json(tonerAdded)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router