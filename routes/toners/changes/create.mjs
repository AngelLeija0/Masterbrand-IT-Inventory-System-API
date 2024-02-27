import { Router } from 'express'
const router = Router()

import TonerChanges from '../../../models/tonerChanges.mjs'
import { validateTonerChange } from '../../../schemas/tonerChanges.mjs'

import Assets from '../../../models/asset.mjs'

router.post('/change/create', async (req, res) => {
  try {
    const tonerChangeInfo = req.body
    if (!tonerChangeInfo) {
      return res.status(400).json({ message: "Data no found it" })
    }

    const tonerAdded = await createTonerChange(tonerChangeInfo)
    const actionAdded = await createActionToPrinter(tonerChangeInfo)

    if (tonerAdded.success && actionAdded.success) {
      return res.status(201).json({ tonerAdded, actionAdded })
    }

    res.status(400).json({ message1: tonerAdded.message, message2: actionAdded.message })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

async function createTonerChange(tonerChangeInfo) {
    const validateInfo = validateTonerChange(tonerChangeInfo)
    if (validateInfo.error) {
      return { success: false, message: validateInfo.error.message }
    }
    const newToner = new TonerChanges(validateInfo.data)
    const tonerAdded = await newToner.save()
    return { success: true, data: tonerAdded }
}

async function createActionToPrinter(tonerChangeInfo) {
    const printer = await Assets.findById(tonerChangeInfo.id)
    if (!printer) {
        return { success: false, message: validateInfo.error.message }
    }

    const newAction = {
      id: Date.now(),
      name: `Cambio de toner`,
      description: `Cambio de toner: ${a}`,
      status: actionInfo.status,
      date: new Date()
    }

    printer.actions.push(newAction)
    printer.updated_at = new Date()

    const printerUpdated = await printer.save()
    return { success: true, data: printerUpdated }
}

export default router