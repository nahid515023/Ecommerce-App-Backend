import { Request, Response } from 'express'
import { CreateCartSchema, QuantityCartSchema } from '../schema/cart'
import { CartItem, Product } from '@prisma/client'
import { prismaClient } from '..'
import { NotFoundException } from '../exceptions/not-found'
import { ErrorCode } from '../exceptions/root'

export const addItemToCart = async (req: Request, res: Response) => {
  const validatedData = CreateCartSchema.parse(req.body)
  let product: Product
  try {
    product = await prismaClient.product.findFirstOrThrow({
      where: {
        id: validatedData.productId
      }
    })
  } catch (err) {
    throw new NotFoundException(
      'Product not found!',
      ErrorCode.PRODUCT_NOT_FOUND
    )
  }
  const cart = await prismaClient.cartItem.create({
    data: {
      userId: req.user?.id,
      productId: product.id,
      quantity: validatedData.quantity
    }
  })
  res.json(cart)
}

export const deleteItemFromCart = async (req: Request, res: Response) => {
  await prismaClient.cartItem.delete({
    where: {
      id: +req.params.id,
      userId: req.user?.id
    }
  })
  res.json({ success: true })
}

export const changeQuantity = async (req: Request, res: Response) => {
  const validatedData = QuantityCartSchema.parse(req.body)
  let item: CartItem
  try {
    item = await prismaClient.cartItem.update({
      where: {
        id: +req.params.id,
        userId: req.user?.id
      },
      data: {
        quantity: validatedData.quantity
      }
    })
  } catch (err) {
    throw new NotFoundException('Item not found!', ErrorCode.PRODUCT_NOT_FOUND)
  }
  res.json(item)
}

export const getCart = async (req: Request, res: Response) => {
  const cart = await prismaClient.cartItem.findMany({
    where: {
      userId: req.user?.id
    },
    include: {
      product: true
    }
  })
  res.json(cart)
}
