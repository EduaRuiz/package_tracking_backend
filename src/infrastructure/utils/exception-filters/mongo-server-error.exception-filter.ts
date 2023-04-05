import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { MongoServerError } from 'mongodb';

@Catch(MongoServerError)
export class MongoServerErrorExceptionFilter implements ExceptionFilter {
  catch(exception: MongoServerError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const message = exception.cause.message;
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    const details = exception.message;
    response.status(statusCode).json({ statusCode, message, details });
  }
}
