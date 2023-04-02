import { HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';
import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';

export class ErrorResultsDto {
  message: string;
  error: string;
  status: string;
  code: number;
  request_uid: number;
}
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const errorResponse = new ErrorResultsDto();

    errorResponse.message = exception.getResponse()?.error?.response?.message || exception.getResponse()?.message || exception.getResponse() || '';
    errorResponse.request_uid = response.req?.request_uid || 'noReqUid';
    errorResponse.code = status;
    errorResponse.status = HttpStatus[status];

    let bodyOrQueryStringify = ''
    if (Object.keys(response.req?.body)?.length !== 0) {
      bodyOrQueryStringify = `${"Request Body: " + JSON.stringify(response.req?.body)}`
    }
    if (Object.keys(response.req?.query).length) {
      bodyOrQueryStringify += `${"Request Query: " + JSON.stringify(response.req?.query)}`
    }
    const error = exception.getResponse()?.error
    const errorStr = `
    **************************
    \x1b[41merror message: ${errorResponse.message || ''}\x1b[0m
    Request UID: ${errorResponse.request_uid}
    Method: ${response.req?.method} 
    Requested URL: ${response.req?.originalUrl} 
    ${bodyOrQueryStringify}
    error: ${error || ''}
    **************************
    `
    console.error(errorStr,)
    if (error) {
      console.error('\x1b[41m','full error: ', '\x1b[0m', error)
    }

    fs.appendFile('errors-logs.log', errorStr, () => null);
    response.status(status).json(errorResponse);
  }

}
// -----------------------------------------------------------------------
class ErrorHandler {
  private readonly error: any;
  private readonly req_uid: any;
  private readonly message: any;
  private readonly errorStatus: any;
  constructor(error: Error, message = 'error', errorStatus = HttpStatus.UNPROCESSABLE_ENTITY) {
    this.error = error;
    this.message = message;
    this.errorStatus = errorStatus;

    this.handleError();
  }

  handleError () {
    throw new HttpException({ message: this.message, error: this.error }, this.errorStatus);
  }
}

export default ErrorHandler;

