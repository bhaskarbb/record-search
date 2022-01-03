import { Request, Response } from 'express';
import { RecordService } from '../services';
import { RecordSearchSchema } from '../validations';
import { ResponseObject, validateSchema } from '../utils';

export const RecordController = {
  search,
};

/**
 * Record search controller
 * Validates input request, calls record service, and returns responseObject
 */
async function search(request: Request, response: Response) {
  const { body } = request;
  const attr = validateSchema(RecordSearchSchema, body);

  const records = await RecordService.search(attr);
  const responseObject = new ResponseObject({ records });
  response.send(responseObject);
}
