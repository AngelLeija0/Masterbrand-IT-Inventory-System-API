import { z } from 'zod'

const tonerSchema = z.object({
  name: z.string(),
  color: z.string(),
  incomingStock: z.object({
    quantity: z.string(),
    date: z.string()
  }),
  outgoingStock: z.object({
    quantity: z.string(),
    date: z.string()
  }),
  stock: z.number(),
  created_at: z.date(),
  updated_at: z.date(),
})

function validateToner (object) {
  if (object.created_at) {
    object.created_at = new Date(object.created_at)
  }
  if (object.updated_at) {
    object.updated_at = new Date(object.updated_at)
  }
  return tonerSchema.safeParse(object)
}

function validatePartialToner (object) {
  if (object.created_at) {
    object.created_at = new Date(object.created_at)
  }
  if (object.updated_at) {
    object.updated_at = new Date(object.updated_at)
  }
  return tonerSchema.partial().safeParse(object)
}

export { validateToner, validatePartialToner }
