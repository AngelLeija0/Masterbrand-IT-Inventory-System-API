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
    const actionAdded = await createActionToPrinter(tonerChangeInfo.printer.id)
    
    res.status(201).json({ tonerAdded, actionAdded })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

async function createTonerChange(tonerChangeInfo) {
    const validateInfo = validateTonerChange(tonerChangeInfo)
    if (validateInfo.error) {
      return res.status(400).json({ message: validateInfo.error.message })
    }
    const newToner = new TonerChanges(validateInfo.data)
    const tonerAdded = await newToner.save()
    return tonerAdded
}

async function createActionToPrinter(printerId) {
    const printer = await Assets.findById(printerId)
    if (!printer) {
        return null
    }

    const asset = await Asset.findById(req.params.id)
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' })
    }

    if (!actionInfo) {
      return res.status(400).json({ message: 'Action info no found it' })
    }

    const newAction = {
      id: Date.now(),
      name: actionInfo.name,
      description: actionInfo.description,
      status: actionInfo.status,
      date: new Date()
    }

    if (assetAttachments) {
      const actionAttachments = []
      assetAttachments.map(image => {
        actionAttachments.push(generateUniqueName(image.originalname))
      })
      newAction.attachments = actionAttachments
    }

    asset.actions.push(newAction)
    asset.updated_at = new Date()

    const assetUpdated = await asset.save()
}

export default router