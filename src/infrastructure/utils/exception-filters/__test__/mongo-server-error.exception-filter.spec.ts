import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { MongoServerError } from 'mongodb';
import { MongoServerErrorExceptionFilter } from '..';

describe('MongoServerErrorExceptionFilter', () => {
  let filter: MongoServerErrorExceptionFilter;
  let host: ArgumentsHost;

  beforeEach(() => {
    filter = new MongoServerErrorExceptionFilter();
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    host = {
      switchToHttp: jest.fn().mockReturnThis(),
      getResponse: jest.fn().mockReturnValue(mockResponse),
    } as any as ArgumentsHost;
  });

  it('should catch MongoServerError and return response with conflict status', () => {
    // Arrange
    const exception = {
      message: 'Duplicate key error',
      cause: {
        message: 'Duplicate key error',
      },
    } as unknown as MongoServerError;
    const expectedResponse = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Duplicate key error',
      details: exception.cause.message,
    };

    // Act
    filter.catch(exception, host);
    const response = host.switchToHttp().getResponse<Response>();

    // Assert
    expect(response.status).toHaveBeenCalledWith(
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    expect(response.json).toHaveBeenCalledWith(expectedResponse);
  });
});
