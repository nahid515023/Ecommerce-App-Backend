import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth'
import { errorHandler } from '../error-hander'
import {
  cancelOrder,
  changeStatus,
  createOrder,
  getOrderByOrder,
  listAllOrders,
  listOrder,
  listUserOrder
} from '../controllers/orders'
import { adminMiddleware } from '../middlewares/admin'

const orderRoutes = Router()

orderRoutes.post('/', [authMiddleware], errorHandler(createOrder))
orderRoutes.get('/', [authMiddleware], errorHandler(listOrder))
orderRoutes.put('/:id/cancel', [authMiddleware], errorHandler(cancelOrder))

orderRoutes.get(
  '/index',
  [authMiddleware, adminMiddleware],
  errorHandler(listAllOrders)
)
orderRoutes.get(
  '/user/:id',
  [authMiddleware, adminMiddleware],
  errorHandler(listUserOrder)
)
orderRoutes.put(
  '/:id/status',
  [authMiddleware, adminMiddleware],
  errorHandler(changeStatus)
)
orderRoutes.get('/:id', [authMiddleware], errorHandler(getOrderByOrder)) 

export default orderRoutes
