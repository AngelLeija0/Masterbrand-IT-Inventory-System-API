import { Router } from 'express'
const router = Router()

import TonerChanges from "../../models/tonerChanges.mjs"
import Asset from '../../models/asset.mjs'
import Toner from '../../models/toner.mjs'
import createNotification from './../notifications/create.mjs'

router.post('/delete/:id', async (req, res) => {
  try {
    const { printerId, tonerId } = req.body

    const tonerChange = await TonerChanges.findById(req.params.id)
    const printer = await Asset.findById(printerId)
    const toner = await Toner.findById(tonerId)

    if (!tonerChange || !printer || !toner) {
      return res.status(500).json({ message: "Internal Error" })
    }

    const actions = printer?.actions
    const newActions = searchAndDeleteAction(actions, tonerChange.created_at)
    printer.actions = newActions
    printer.save()

    toner.stock++
    toner.incomingStock.quantity--
    toner.outgoingStock.quantity++
    toner.updated_at = new Date()
    toner.save()

    const tonerChangeDeleted = await TonerChanges.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "Delete it correctly", tonerChangeDeleted })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

function searchAndDeleteAction(actions, searchedDate) {
  if (actions.length == 0) return []
  const nearby = actions.reduce((masCercano, obj) => {
    const actualDifference = Math.abs(new Date(obj.created_at) - new Date(searchedDate));
    const nearbyDifference = Math.abs(new Date(masCercano.created_at) - new Date(searchedDate));
    return actualDifference < nearbyDifference ? obj : masCercano;
  });
  const updatedActions = actions.filter(obj => obj !== nearby);
  return updatedActions;
}

export default router
