import { Router } from 'express';
import getAllRouter from './get_all.mjs';
import createRouter from './create.mjs';
import getAllChangesRouter from './changes/get_all.mjs'
import createChangesRouter from './changes/create.mjs';

const tonersRouter = Router();

tonersRouter.use(getAllRouter);
tonersRouter.use(createRouter);
tonersRouter.use(getAllChangesRouter);
tonersRouter.use(createChangesRouter);

export default tonersRouter;