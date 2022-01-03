import { Application, NextFunction, Request, Response } from 'express';
import { logger, ErrorObject, ResponseObject, ErrorCode } from '../utils';

const routes = [];

/**
 * Boilerplate to initialize project routes, add a health check route,
 * and handle errors
 */
export function initializeRoutes(app: Application) {
  routes.forEach((route) => {
    app.use(route.path, route.router);
  });

  // Health Check API
  app.get('/health-check', (request: Request, response: Response, next: NextFunction) => {
    const responseBody = new ResponseObject();
    response.json(responseBody);
  });

  // Handle 404 Errors
  app.use('*', (request: Request, response: Response, next: NextFunction) => {
    const message = ['Cannot', request.method, request.originalUrl].join(' ');
    const errorObject = new ErrorObject(ErrorCode.NOT_FOUND, message);
    next(errorObject);
  });

  app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    // Invalid JSON Body
    if (error instanceof SyntaxError) {
      const errorObject = new ErrorObject(ErrorCode.VALIDATION_ERROR, 'Invalid JSON body');
      return response.json(errorObject);
    }

    // Custom Error
    if (error instanceof ErrorObject) {
      logger.error(error.message);
      return response.json(error);
    }

    // Uncaught Error
    logger.fatal(`Uncaught Error: ${error.message}`, { stackTrace: error.stack });
    const errorObject = new ErrorObject(ErrorCode.INTERNAL_SERVER_ERROR, 'Internal Server Error');
    return response.json(errorObject);
  });
}
