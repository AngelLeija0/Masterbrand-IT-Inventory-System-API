import { Router } from 'express'
const router = Router()

import Asset from '../../models/asset.mjs'
import { validateAsset } from '../../schemas/asset.mjs'
import createNotification from './../notifications/create.mjs'

import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../../', 'uploads', 'attachments'))
  },
  filename: function (req, file, cb) {
    cb(null, generateUniqueName(file.originalname))
  },
})

const uploadDocuments = multer({ storage: storage })


router.post('/create', uploadDocuments.array('images'), async (req, res) => {
  try {
    const assetInfo = req.body
    const assetImages = req.files

    if (!assetInfo) {
      return res.status(400).json({ message: "Data no found it" })
    }

    if (assetInfo.statusName && assetInfo.statusDescription) {
      const statusObj = {
        name: assetInfo.statusName,
        description: assetInfo.statusDescription,
        date: new Date()
      }

      delete assetInfo.statusName
      delete assetInfo.statusDescription

      assetInfo.status = statusObj
    }

    const validateInfo = validateAsset(assetInfo)
    if (validateInfo.error) {
      return res.status(400).json({ message: "Error in schema: " + validateInfo.error.message })
    }

    if (assetImages) {
      const nameImages = assetImages.map((image) => {
        return generateUniqueName(image.originalname)
      })
      validateInfo.data.images = {
        default_image: nameImages[0],
        all: nameImages
      }
    }

    validateInfo.data.created_at = new Date()

    console.log({ asset: validateInfo.data })

    const newAsset = new Asset(validateInfo.data)
    const assetAdded = await newAsset.save()

    const notificationName = "Nuevo producto agregado"
    const notificationDescription = `Ha sido sido agregado un nuevo producto llamado ${assetAdded.description}`
    const notificationIcon = "inventory"
    const notificationImportance = "normal"
    createNotification(notificationName, notificationDescription, notificationIcon, notificationImportance)

    res.status(201).json(assetAdded)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
})

function generateUniqueName(originalname) {
  const actualDate = new Date()
  const actualYear = actualDate.getFullYear()
  const actualMonth = actualDate.getMonth()
  const actualHour = actualDate.getHours()
  const actualMinute = actualDate.getMinutes()

  const actualDateFormatted = actualYear + actualMonth + actualHour + actualMinute

  return originalname.replace(/\.[^/.]+$/, '') + '-' + actualDateFormatted + path.extname(originalname)
}

export default router




/*
  asset: {
    category: 'Impresora',
    description: 'Brother HL-5100DN Supervisor Celda 1',
    model: 'Brother HL-5100DN',
    serial_number: '12345678',
    location: 'Celda 1',
    location_extra_info: 'Kiosko de Supervisor',
    status: {
      name: 'Activo',
      description: 'n/a',
      date: 2024-08-02T16:38:26.066Z
    },
    ip_address: '0.0.0.0',
    network_status: 'En local',
    images: {
      default_image: 'Brother HL-L5100DN-2070-2080.jfif',
      all: [Array]
    },
    created_at: 2024-08-02T16:38:26.075Z
  }
*/