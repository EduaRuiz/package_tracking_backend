import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { MongoServerError } from 'mongodb';

/**
 * Mongo Server Error Exception Filter class
 *
 * @export
 * @class MongoServerErrorExceptionFilter
 * @typedef {MongoServerErrorExceptionFilter}
 * @implements {ExceptionFilter}
 */
@Catch(MongoServerError)
export class MongoServerErrorExceptionFilter implements ExceptionFilter {
  /**
   * Catch method to handle MongoServerError
   *
   * @param {MongoServerError} exception The MongoServerError
   * @param {ArgumentsHost} host The ArgumentsHost
   */
  catch(exception: MongoServerError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const message = exception.cause.message;
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    const details = exception.message;
    response.status(statusCode).json({ statusCode, message, details });
  }
}
