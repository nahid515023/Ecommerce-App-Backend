import { ErrorCode } from './../exceptions/root'
import { NextFunction, Request, Response } from 'express'
import { UnauthorizedException } from '../exceptions/unauthorized'
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../secrets'
import { prismaClient } from '..'

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['authorization']

  if (!token) {
    return next(
      new UnauthorizedException('Unauthorized!', ErrorCode.Unauthorized)
    )
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: number }

    const user = await prismaClient.user.findFirst({
      where: {
        id: payload.userId
      }
    })

    if (!user) {
      return next(
        new UnauthorizedException('Unauthorized!', ErrorCode.Unauthorized)
      )
    }
    req.user = user
    next()
  } catch (error) {
    return next(
      new UnauthorizedException('Unauthorized!', ErrorCode.Unauthorized)
    )
  }
}
