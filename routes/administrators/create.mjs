import { Router } from 'express'
const router = Router()

import bcrypt from 'bcrypt'

import Administrator from '../../models/administrator.mjs'
import { validateAdministrator } from '../../schemas/administrator.mjs'

router.post('/create', async (req, res) => {
  try {
    const administratorInfo = req.body
    if (!administratorInfo) {
      return res.status(400).json({ message: "Data no found it" })
    }

    administratorInfo.type = "admin"

    const validateInfo = validateAdministrator(administratorInfo)
    if (validateInfo.error) {
      return res.status(400).json({ message: validateInfo.error.message })
    }


    const { password, ...otherInfo } = validateInfo.data;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newAdministrator = new Administrator({
      ...otherInfo,
      password: hashedPassword,
    });

    const administratorAdded = await newAdministrator.save();

    res.status(201).json(administratorAdded);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
