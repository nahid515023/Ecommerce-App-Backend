import { authMiddleware } from './../middlewares/auth';
import { Router } from 'express'
import { errorHandler } from '../error-hander'
import { createProduct } from '../controllers/products'
import { adminMiddleware } from '../middlewares/admin';

const productsRoutes: Router = Router()

productsRoutes.post('/',[authMiddleware,adminMiddleware],errorHandler(createProduct))

export default productsRoutes
