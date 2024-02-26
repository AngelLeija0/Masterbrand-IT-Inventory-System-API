import { Router } from 'express'
const router = Router()

import TonerChanges from '../../../models/tonerChanges.mjs'

router.get('/changes', async (req, res) => {
  try {
    const tonerChanges = await TonerChanges.find().sort({ created_at: -1 })
    if (tonerChanges == null || tonerChanges == {} || tonerChanges.length == 0) {
      return res.status(400).json({ code: 400, message: "No items founded" })
    }
    res.status(200).json(tonerChanges)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
