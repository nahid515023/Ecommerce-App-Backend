import { ErrorCode } from './../exceptions/root'
import { Request, Response } from 'express'
import { AddressSchema, UpdateUserSchema } from '../schema/users'
import { NotFoundException } from '../exceptions/not-found'
import { prismaClient } from '..'
import { Address } from '@prisma/client'
import { BadRequestsException } from '../exceptions/bad-requests'

export const addAddress = async (req: Request, res: Response) => {
  AddressSchema.parse(req.body)
  const address = await prismaClient.address.create({
    data: {
      ...req.body,
      userId: req.user?.id
    }
  })

  res.json(address)
}
export const deleteAddress = async (req: Request, res: Response) => {
  try {
    await prismaClient.address.delete({
      where: {
        id: +req.params.id
      }
    })
    res.json({ message: 'Successfully deleted' })
  } catch (err) {
    throw new NotFoundException(
      'Address not found.',
      ErrorCode.ADDRESS_NOT_FOUND
    )
  }
}
export const listAddress = async (req: Request, res: Response) => {
  const list = await prismaClient.address.findMany({
    where: {
      userId: +req.user?.id
    }
  })
  res.json(list)
}

export const updateUser = async (req: Request, res: Response) => {
  let validatedData
  try {
    validatedData = UpdateUserSchema.parse(req.body)
  } catch (err) {
    console.log(err)
    return res.json(err)
  }

  let shippingAddress: Address
  let billingAddress: Address
  if (validatedData.defaultShippingAddress) {
    try {
      shippingAddress = await prismaClient.address.findFirstOrThrow({
        where: {
          id: validatedData.defaultShippingAddress
        }
      })

      if (shippingAddress.userId != req.user?.id) {
        throw new BadRequestsException(
          'Address does not belong to user',
          ErrorCode.ADDRESS_DOES_NOT_BELONG
        )
      }
    } catch (err) {
      throw new NotFoundException(
        'Address not found.',
        ErrorCode.ADDRESS_NOT_FOUND
      )
    }
  }

  if (validatedData.defaultBillingAddress) {
    try {
      billingAddress = await prismaClient.address.findFirstOrThrow({
        where: {
          id: validatedData.defaultBillingAddress
        }
      })
      if (billingAddress.userId != req.user?.id) {
        throw new BadRequestsException(
          'Address does not belong to user',
          ErrorCode.ADDRESS_DOES_NOT_BELONG
        )
      }
    } catch (err) {
      throw new NotFoundException(
        'Address not found.',
        ErrorCode.ADDRESS_NOT_FOUND
      )
    }
  }

  const UpdateUser = await prismaClient.user.update({
    where: {
      id: req.user?.id
    },
    data: req.body
  })
  res.json(UpdateUser)
  res.send('hi nahid')
}

//Admin part

export const listUsers = async (req: Request, res: Response) => {
  if (!req.query.skip) {
    req.query.skip = '0'
  }
  const users = await prismaClient.user.findMany({
    skip: +req.query.skip,
    take: 5
  })
  res.json(users)
}
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await prismaClient.user.findFirstOrThrow({
      where: {
        id: +req.params.id
      },
      include: {
        addresses: true
      }
    })
    res.json(user)
  } catch (err) {
    throw new NotFoundException('User Not Found.', ErrorCode.USER_NOT_FOUND)
  }
}
export const changeUserRole = async (req: Request, res: Response) => {
  try {
    const user = await prismaClient.user.update({
      where: {
        id: +req.params.id
      },
      data: {
        role: req.body.role
      }
    })
    res.json(user)
  } catch (err) {
    throw new NotFoundException('User Not Found.', ErrorCode.USER_NOT_FOUND)
  }
}
