import { Router } from 'express'
const router = Router()

import Asset from '../../models/asset.mjs'
import { validateAsset } from '../../schemas/asset.mjs'

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

    const newAsset = new Asset(validateInfo.data)
    const assetAdded = await newAsset.save()
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