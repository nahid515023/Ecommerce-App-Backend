import { z } from 'zod'

export const CreateCartSchema = z.object({
  productId: z.number(),
  quantity: z.number()
})

export const QuantityCartSchema = z.object({
  quantity: z.number()
})
