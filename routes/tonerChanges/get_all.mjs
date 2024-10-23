import { Router } from 'express'
const router = Router()

import TonerChanges from '../../models/tonerChanges.mjs'

router.get('/', async (req, res) => {
  try {
    const tonerChanges = await TonerChanges.find().sort({ created_at: -1 })
    if (tonerChanges == null || tonerChanges == {} || tonerChanges.length == 0) {
      return res.status(400).json({ code: 400, message: "No items founded" })
    }
    const tonerChangesMap = tonerChanges.map((tonerChange) => {
      return {
        _id: tonerChange._id,
        toner: tonerChange.toner.name,
        toner_id: tonerChange.toner.id,
        color: tonerChange.toner.color,
        printer: tonerChange.printer.name,
        printer_id: tonerChange.printer.id,
        comments: tonerChange.comments,
        date: tonerChange.created_at
      }
    })
    res.status(200).json(tonerChangesMap)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router