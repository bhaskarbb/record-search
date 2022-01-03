import BaseJoi from 'joi';
import JoiDate from '@joi/date';

const Joi = BaseJoi.extend(JoiDate);

/**
 * Joi schema for search record request validation
 * minCount cannot be lower than 0, maxCount cannot be lower than minCount
 * maxDate cannot be greater than current date, and cannot be lesser than startDate
 */
export const RecordSearchSchema = Joi.object({
  minCount: Joi.number().integer().min(0).required(),
  maxCount: Joi.number().integer().min(Joi.ref('minCount')).required(),
  startDate: Joi.date().format('YYYY-MM-DD').utc().required(),
  endDate: Joi.date().format('YYYY-MM-DD').utc().min(Joi.ref('startDate')).max('now').required(),
});
