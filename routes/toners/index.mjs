import { Router } from 'express';
import getAllRouter from './get_all.mjs';
import getByIdRouter from "./get_by_id.mjs"
import createRouter from './create.mjs';
import updateRouter from './update.mjs'

const tonersRouter = Router();

tonersRouter.use(getAllRouter);
tonersRouter.use(getByIdRouter);
tonersRouter.use(createRouter);
tonersRouter.use(updateRouter);

export default tonersRouter;