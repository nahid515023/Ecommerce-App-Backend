import { NextFunction, Request, Response } from 'express'
import { hashSync, compareSync } from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../secrets'
import { BadRequestsException } from '../exceptions/bad-requests'
import { ErrorCode } from '../exceptions/root'
import { prismaClient } from '..'
import { SignUpSchema } from '../schema/users'
import { NotFoundException } from '../exceptions/not-found'

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body
  let user = await prismaClient.user.findFirst({ where: { email } })

  if (user == null) {
    return next(
      new NotFoundException('User not found!', ErrorCode.USER_NOT_FOUND)
    )
  }

  if (!compareSync(password, user.password)) {
    return next(
      new BadRequestsException(
        'Incorrect password!',
        ErrorCode.INCORRECT_PASSWORD
      )
    )
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET)
  res.json({ user, token })
}

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  SignUpSchema.parse(req.body)
  const { email, password, name } = req.body
  let user = await prismaClient.user.findFirst({ where: { email } })

  if (user) {
    return next(
      new BadRequestsException(
        'User already exists!',
        ErrorCode.USER_ALREADY_EXISTS
      )
    )
  }

  user = await prismaClient.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10)
    }
  })
  res.json(user)
}

export const me = async (req: Request, res: Response, next: NextFunction) => {
  res.json(req.user)
}
