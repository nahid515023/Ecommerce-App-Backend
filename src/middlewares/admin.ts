import { ErrorCode } from './../exceptions/root'
import { NextFunction, Request, Response } from 'express'
import { UnauthorizedException } from '../exceptions/unauthorized'

export const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user
  if (user?.role == 'ADMIN') {
    next()
  } else {
    next(new UnauthorizedException('Unauthorized!', ErrorCode.UNAUTHORIZED))
  }
}
