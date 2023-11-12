import { Router } from 'express'
const router = Router()

import Asset from '../../models/asset.mjs'
import { validatePartialAsset } from '../../schemas/asset.mjs'
import createNotification from './../notifications/create.mjs'

import fs from 'fs/promises'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../../', 'uploads', 'attachments'))
  },
  filename: function (req, file, cb) {
    cb(null, generateUniqueName(file.originalname))
  }
})

const uploadDocuments = multer({ storage: storage })

router.patch('/update/:id', async (req, res) => {
  try {
    const assetInfo = req.body
    if (!assetInfo) {
      return res.status(400).json({ message: 'Data no found it' })
    }

    const asset = await Asset.findById(req.params.id)
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' })
    }

    asset.set(assetInfo)
    asset.updated_at = new Date()

    const assetUpdated = await asset.save()

    const notificationName = "Producto editado"
    const notificationDescription = `Ha sido sido editado un producto llamado ${assetUpdated.description}`
    const notificationIcon = "inventory"
    const notificationImportance = "normal"
    createNotification(notificationName, notificationDescription, notificationIcon, notificationImportance)

    res.status(200).json(assetUpdated)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
})

router.patch('/update/add-new-image/:id', uploadDocuments.array('attachments'), async (req, res) => {
  try {
    const assetAttachments = req.files

    const asset = await Asset.findById(req.params.id)
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' })
    }

    if (!assetAttachments) {
      return res.status(400).json({ message: 'No data send it' })
    }

    if (!asset.images?.all) {
      asset.images.all = []
    }

    assetAttachments.map(image => {
      asset.images?.all.push(generateUniqueName(image.originalname))
    })

    asset.updated_at = new Date()

    const assetUpdated = await Asset.findByIdAndUpdate(asset._id, asset)

    const notificationName = "Imagen de producto agregada"
    const notificationDescription = `Ha sido sido agregada la imagen de un producto llamado ${assetUpdated.description}`
    const notificationIcon = "collections"
    const notificationImportance = "normal"
    createNotification(notificationName, notificationDescription, notificationIcon, notificationImportance)

    res.status(200).json(assetUpdated)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
})

router.patch('/update/create/action/:id', uploadDocuments.array('attachments'), async (req, res) => {
  try {
    const actionInfo = req.body
    const assetAttachments = req.files

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

    const notificationName = "Acción agregada para un producto"
    const notificationDescription = `Ha sido sido agregada una acción ${newAction.name} al producto ${assetUpdated.description}`
    const notificationIcon = "add"
    const notificationImportance = "normal"
    createNotification(notificationName, notificationDescription, notificationIcon, notificationImportance)

    res.status(200).json(assetUpdated)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
})

router.patch('/update/delete/action/:id', async (req, res) => {
  try {
    const idAction = req.body.idAction
    const asset = await Asset.findById(req.params.id)

    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' })
    }

    if (!idAction) {
      return res.status(400).json({ message: 'Id action no found it' })
    }

    const currentActionIndex = asset.actions.findIndex(
      action => action.id === idAction
    )

    if (currentActionIndex !== -1) {
      const currentAction = asset.actions[currentActionIndex]
      if (currentAction.attachments) {
        if (currentAction.attachments.length > 0) {
          currentAction.attachments.forEach(async image => {
            const imagePath = path.resolve(
              __dirname,
              '../../',
              'uploads/images',
              image
            )
            fs.access(imagePath, fs.constants.F_OK, async error => {
              if (!error) {
                await fs.unlink(imagePath)
              }
            })
          })
        }
      }

      asset.actions.splice(currentActionIndex, 1)
      asset.updated_at = new Date()

      const notificationName = "Acción eliminada para un producto"
      const notificationDescription = `Ha sido sido eliminado una acción ${currentAction.name} al producto ${asset.description}`
      const notificationIcon = "delete"
      const notificationImportance = "normal"
      createNotification(notificationName, notificationDescription, notificationIcon, notificationImportance)
    }

    const assetUpdated = await asset.save()
    res.status(200).json(assetUpdated)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
})

router.patch('/update/update/action/:id', uploadDocuments.array('images'), async (req, res) => {
  try {
    const actionInfo = req.body
    const assetImages = req.files

    const asset = await Asset.findById(req.params.id)
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' })
    }

    if (!actionInfo) {
      return res.status(400).json({ message: 'Action info no found it' })
    }

    const currentActionIndex = asset.actions.findIndex((action) => action.id === actionInfo.id)
    
    if (asset.actions[currentActionIndex]) {
      Object.assign(asset.actions[currentActionIndex], actionInfo)
      
      if (assetImages) {
        const actionImages = []
        assetImages.map(image => {
          actionImages.push(generateUniqueName(image.originalname))
        })
        asset.actions[currentActionIndex].attachments = actionImages
      }
      
      asset.updated_at = new Date()
      
    }
    
    const assetUpdated = await Asset.findByIdAndUpdate(asset._id, asset)
    res.status(200).json(assetUpdated)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
})

function generateUniqueName (originalname) {
  const actualDate = new Date()
  const actualYear = actualDate.getFullYear()
  const actualMonth = actualDate.getMonth()
  const actualHour = actualDate.getHours()
  const actualMinute = actualDate.getMinutes()

  const actualDateFormatted =
    actualYear + actualMonth + actualHour + actualMinute

  return (
    originalname.replace(/\.[^/.]+$/, '') +
    '-' +
    actualDateFormatted +
    path.extname(originalname)
  )
}

export default router
