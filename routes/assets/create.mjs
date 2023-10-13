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
    cb(null, path.resolve(__dirname, '../../', 'uploads', file.fieldname))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(/\.[^/.]+$/, '') + '-' + Date.now() + path.extname(file.originalname));
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

    const validateInfo = validateAsset(assetInfo)
    if (validateInfo.error) {
      return res.status(400).json({ message: validateInfo.error.message })
    }
    
    if (assetImages) {
      const nameImages = assetImages.map((image) => {
        return image.originalname.replace(/\.[^/.]+$/, '') + '-' + Date.now() + path.extname(image.originalname)
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

export default router