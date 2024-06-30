import { NextFunction, Request, Response } from 'express'
import { ErrorCode, HttpException } from './exceptions/root'
import { InternalExcepton } from './exceptions/internal-exception'
import { ZodError } from 'zod'
import { BadRequestsException } from './exceptions/bad-requests'

export const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next)
    } catch (error: any) {
      let exception: HttpException
      if (error instanceof HttpException) {
        exception = error
      } else {
        if (error instanceof ZodError) {
          exception = new BadRequestsException(
            'Unprocessable entity.',
            ErrorCode.UNPROCESSABLE_ENTITY
          )
        } else {
          exception = new InternalExcepton(
            'Something went wrong!',
            error,
            ErrorCode.INTERNA_EXCEPTION
          )
        }
      }
      next(exception)
    }
  }
}
