import express from 'express';
export const apiRouter = express.Router();
import {weeksRouter} from './weeks.js'
import {usersRouter} from './users.js'
import {daysRouter} from './days.js'

apiRouter.use('/weeks', weeksRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/days', daysRouter);

// module.exports = apiRouter;
