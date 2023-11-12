import { Router } from 'express'
import getAllRouter from './get_unreaded.mjs'
import mark_as_read_it from './mark_as_read_it.mjs'

const notificationsRouter = Router()

notificationsRouter.use(getAllRouter)
notificationsRouter.use(mark_as_read_it)

export default notificationsRouter
