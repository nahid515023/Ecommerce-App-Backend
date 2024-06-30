import { Request, Response } from 'express'
import { prismaClient } from '..'
import { NotFoundException } from '../exceptions/not-found'
import { ErrorCode } from '../exceptions/root'

export const createOrder = async (req: Request, res: Response) => {
  return await prismaClient.$transaction(async tx => {
    const cartItem = await tx.cartItem.findMany({
      where: {
        userId: req.user?.id
      },
      include: {
        product: true
      }
    })

    if (cartItem.length == 0) {
      return res.json({ message: 'Your shopping cart is empty!' })
    }

    const price = cartItem.reduce((prev, current) => {
      return prev + current.quantity * +current.product.price
    }, 0)

    const address = await tx.address.findFirst({
      where: {
        id: req.user?.id
      }
    })
    let addr = address

    const order = await tx.order.create({
      data: {
        userId: req.user?.id,
        netAmount: price,
        address: `${addr?.lineOne},${addr?.lineTwo},${addr?.city},${addr?.country}-${addr?.pincode}`,
        OrderProduct: {
          create: cartItem.map(card => {
            return {
              productId: card.productId,
              quantity: card.quantity
            }
          })
        }
      }
    })
    const orderEvent = await tx.orderEvent.create({
      data: {
        orderId: order.id
      }
    })

    await tx.cartItem.deleteMany({
      where: {
        userId: +req.user?.id
      }
    })
    return res.json(order)
  })
}

export const listOrder = async (req: Request, res: Response) => {
  const orders = await prismaClient.order.findMany({
    where: {
      userId: req.user?.id
    },
    include: {
      OrderProduct: true
    }
  })
  res.json(orders)
}

export const cancelOrder = async (req: Request, res: Response) => {
  try {
    return await prismaClient.$transaction(async tx => {
      const order = await tx.order.update({
        where: {
          id: +req.params.id,
          userId: req.user?.id
        },
        data: {
          status: 'CANCELLED'
        }
      })
      await tx.orderEvent.create({
        data: {
          orderId: order.id,
          status: 'CANCELLED'
        }
      })
      return res.json(order)
    })
  } catch (err) {
    throw new NotFoundException('Order not found!', ErrorCode.ORDER_NOT_FOUND)
  }
}

export const getOrderByOrder = async (req: Request, res: Response) => {
  try {
    const order = await prismaClient.order.findFirstOrThrow({
      where: {
        id: +req.params.id
      },
      include: {
        OrderProduct: true,
        OrderEvent: true
      }
    })
    res.json(order)
  } catch (err) {
    throw new NotFoundException('Order not found!', ErrorCode.ORDER_NOT_FOUND)
  }
}

export const listAllOrders = async (req: Request, res: Response) => {
  if (!req.query.skip) {
    req.query.skip = '0'
  }
  let whereClause = {}
  if (req.query.status) {
    whereClause = {
      status: req.query.status
    }
  }
  const orders = await prismaClient.order.findMany({
    where:  whereClause,
    skip: +req.query.skip,
    take: 5
  })
  res.json(orders)
}
export const changeStatus = async (req: Request, res: Response) => {
  return prismaClient.$transaction(async tx => {
    try {
      const order = await tx.order.update({
        where: {
          id: +req.params.id
        },
        data: {
          status: req.body.status
        }
      })
      await tx.orderEvent.create({
        data: {
          orderId: order.id,
          status: req.body.status
        }
      })
      return res.json(order)
    } catch (err) {
      throw new NotFoundException('Order not found!', ErrorCode.ORDER_NOT_FOUND)
    }
  })
}
export const listUserOrder = async (req: Request, res: Response) => {
  if (!req.query.skip) {
    req.query.skip = '0'
  }
  let whereClause = {}
  if (req.query.status) {
    whereClause = {
      status: req.query.status
    }
  }
  const orders = await prismaClient.order.findMany({
    where: {
      userId: +req.params.id,
      status: whereClause
    },
    skip: +req.query.skip,
    take: 5
  })
  res.json(orders)
}
