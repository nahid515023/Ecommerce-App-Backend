import express, { Express } from 'express'
import { PORT } from './secrets'
import rootRouter from './routes'
import { PrismaClient } from '@prisma/client'
import { errorMiddleware } from './middlewares/errors'

let app: Express = express()

app.use(express.json())
app.use('/api', rootRouter)
app.use(errorMiddleware)

export const prismaClient = new PrismaClient().$extends({
  result: {
    address: {
      formattedAddress: {
        needs: {
          lineOne: true,
          lineTwo: true,
          city: true,
          country: true,
          pincode: true
        },
        compute: addr => {
          return 
        }
      }
    }
  }
})

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})
