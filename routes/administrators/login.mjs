import { Router } from 'express'
const router = Router()

import bcrypt from 'bcrypt'
import { promisify } from 'util'

export const compareAsync = promisify(bcrypt.compare)

import Administrator from '../../models/administrator.mjs'

router.post('/login', async (req, res) => {
  try {
    const userData = req.body
    const administrator = await Administrator.findOne({ email: userData.email})

    if (administrator !== null && administrator !== undefined) {
        const isMatch = await compareAsync(userData.password, administrator.password);
        if (isMatch) {
            return res.status(200).json({
                id: administrator._id,
                email: administrator.email,
                type: administrator.type
            })
        } else {
            return res.status(200).json({ message: "Incorrect password" })
        }
    } 
    return res.status(200).json({ message: "No user found it" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
