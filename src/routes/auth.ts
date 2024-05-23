import { Router } from 'express'
import { login, signup, me } from '../controllers/auth'
import { errorHandler } from '../error-hander'
import { authMiddleware } from '../middlewares/auth'

const authRoutes: Router = Router()

authRoutes.post('/login', errorHandler(login))
authRoutes.post('/signup', errorHandler(signup))
authRoutes.get('/me', authMiddleware, errorHandler(me))

export default authRoutes
