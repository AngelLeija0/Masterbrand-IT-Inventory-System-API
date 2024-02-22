import { Router } from 'express';
import getAllRouter from './get_all.mjs';
import createRouter from './create.mjs';

const tonersRouter = Router();

tonersRouter.use(getAllRouter);
tonersRouter.use(createRouter);

export default tonersRouter;