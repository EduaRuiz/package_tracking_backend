import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class PostgresErrorExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const message = exception.message;
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    const details = exception.driverError.detail;
    response.status(statusCode).json({ statusCode, message, details });
  }
}
