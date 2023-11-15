import { Router } from 'express'
const router = Router()

import Administrator from '../../models/administrator.mjs'

router.get('/', async (req, res) => {
  try {
    const administrators = await Administrator.find()

    const filteredInfoAdministrators = []
    administrators.map(administrator => {
      if (administrator.type !== 'superadmin') {
        filteredInfoAdministrators.push({
          _id: administrator._id,
          username: administrator.username,
          email: administrator.email,
          created_at: administrator.created_at,
          updated_at: administrator.updated_at
        })
      }
    })

    res.status(200).json(filteredInfoAdministrators)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
