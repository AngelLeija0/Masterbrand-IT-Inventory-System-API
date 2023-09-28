import { Router } from 'express';
import createRouter from './create.mjs';
import deleteRouter from './delete.mjs';
import getAllRouter from './get_all.mjs';
import getByIdRouter from './get_by_id.mjs';
import updateRouter from './update.mjs';

const notificationsRouter = Router();

notificationsRouter.use(createRouter);
notificationsRouter.use(deleteRouter);
notificationsRouter.use(getAllRouter);
notificationsRouter.use(getByIdRouter);
notificationsRouter.use(updateRouter);

export default notificationsRouter;