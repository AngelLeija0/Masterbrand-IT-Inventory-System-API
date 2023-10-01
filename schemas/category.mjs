import { z } from 'zod'

const categorySchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  properties: z.array(
    z.object({
      name: z.string(),
      key: z.string(),
    })
  ),
  created_at: z.date(),
  updated_at: z.date().optional()
})

function validateCategory (object) {
  object.created_at = new Date(object.created_at)
  if (object.updated_at) {
    object.updated_at = new Date(object.updated_at)
  }
  return categorySchema.safeParse(object)
}

function validatePartialCategory (object) {
  object.created_at = new Date(object.created_at)
  if (object.updated_at) {
    object.updated_at = new Date(object.updated_at)
  }
  return categorySchema.partial().safeParse(object)
}

export { validateCategory, validatePartialCategory }
