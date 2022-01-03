import { Request, Response } from 'express';

/**
 * Async Wrapper enables us to throw errors in routes and
 * catch them properly with error handler
 */
export const asyncWrapper = (fn: any) => (request: Request, response: Response, next: any) =>
  Promise.resolve(fn(request, response, next)).catch(next);
