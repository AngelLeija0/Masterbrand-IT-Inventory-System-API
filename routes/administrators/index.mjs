import { Router } from 'express';
import createRouter from './create.mjs';
import deleteRouter from './delete.mjs';
import getAllRouter from './get_all.mjs';
import getByIdRouter from './get_by_id.mjs';
import updateRouter from './update.mjs';

const administratorsRouter = Router();

administratorsRouter.use(createRouter);
administratorsRouter.use(deleteRouter);
administratorsRouter.use(getAllRouter);
administratorsRouter.use(getByIdRouter);
administratorsRouter.use(updateRouter);

export default administratorsRouter;