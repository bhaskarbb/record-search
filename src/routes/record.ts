import express from 'express';
import { RecordController } from '../controllers';
import { asyncWrapper } from '../utils';

const RecordRouter = express.Router();

RecordRouter.post('/', asyncWrapper(RecordController.search));

export { RecordRouter };
