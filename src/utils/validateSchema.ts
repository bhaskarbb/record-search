'use strict';

import { Schema } from 'joi';
import { ErrorObject, ErrorCode } from '../utils';

/**
 * Helper method to validate request with Joi
 * Throws a custom error with formatted message if schema is not valid
 */
export function validateSchema(schema: Schema, data: object) {
  const { error, value } = schema.validate(data);
  if (error) {
    // error.message is used when error is thrown manually
    const errorMessage = error.details?.[0].message.replace(/"/g, '') ?? error.message;
    throw new ErrorObject(ErrorCode.VALIDATION_ERROR, errorMessage);
  }

  return value;
}
