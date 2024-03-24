import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

/**
 * Function to intercept desired exceptions for custom logic.
 *
 * @param exception Thrown exception
 * @param host ArgumentsHost
 */
@Catch()
export class ExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    if (exception instanceof PrismaClientKnownRequestError) {
      console.log('Prisma Error', exception);
      throw new PrismaClientKnownRequestError(exception.message, exception);
    }

    super.catch(exception, host);
  }
}
