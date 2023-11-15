import { Router } from 'express'
const router = Router()

import bcrypt from 'bcrypt'

import Administrator from '../../models/administrator.mjs'
import { validatePartialAdministrator } from '../../schemas/administrator.mjs'

router.patch('/update/:id', async (req, res) => {
  try {
    const administratorInfo = req.body
    if (!administratorInfo) {
      return res.status(400).json({ message: 'Data no found it' })
    }

    const administrator = await Administrator.findById(req.params.id)
    if (!administrator) {
      return res.status(404).json({ message: 'Administrator not found' })
    }

    administrator.updated_at = new Date()

    const validateInfo = validatePartialAdministrator(administratorInfo)
    if (validateInfo.error) {
      return res.status(400).json({ message: validateInfo.error.message })
    }

    if (validateInfo.data.password) {
      const saltRounds = 10
      validateInfo.data.password = await bcrypt.hash(
        validateInfo.data.password,
        saltRounds
      )
    }

    administrator.set(validateInfo.data)

    const administratorUpdated = await administrator.save()
    res.status(200).json(administratorUpdated)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
