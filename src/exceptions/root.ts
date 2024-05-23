import { UnauthorizedException } from './unauthorized'
export class HttpException extends Error {
  message: string
  errorCode: ErrorCode
  statusCode: number
  errors: any

  constructor (
    message: string,
    errorCode: ErrorCode,
    statusCode: number,
    errors: any
  ) {
    super(message)
    this.message = message
    this.errorCode = errorCode
    this.statusCode = statusCode
    this.errors = errors
  }
}

export enum ErrorCode {
  USER_NOT_FOUND = 1001,
  USER_ALREADY_EXISTS = 1002,
  INCORRECT_PASSWORD = 1003,
  Unprocessable_Entity = 2001,
  INTERNA_EXCEPTION = 3001,
  Unauthorized = 4001
}
