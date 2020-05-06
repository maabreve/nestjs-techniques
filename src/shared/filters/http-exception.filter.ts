import { IHttpException } from '../interfaces/http-exception.interface';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(httpException: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const timestamp = new Date().toISOString();
    const path = request.url;
    const method = request.method;

    const status = httpException.getStatus
      ? httpException.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = status !== HttpStatus.INTERNAL_SERVER_ERROR
      ? httpException.message || null
      : 'Internal server error';

    const exception: IHttpException = {
      timestamp,
      status,
      path,
      method,
      message
    };

    Logger.error(
      `${request.method} ${request.url}`,
      status === HttpStatus.INTERNAL_SERVER_ERROR ? httpException.stack : JSON.stringify(exception),
      'HttpExceptionFilter',
    );

    response.status(status).json(exception);
  }
}
