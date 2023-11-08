import { Router } from 'express'

import loginRouter from '../auth/login.mjs'

const authRouter = Router()

authRouter.use(loginRouter)

export default authRouter
