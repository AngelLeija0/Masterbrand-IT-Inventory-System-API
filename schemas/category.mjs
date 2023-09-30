import * as z from 'zod'

const categorySchema = z.object({
  name: z.string(),
  properties: z.array(),
  created_at: z.date(),
  updated_at: z.date()
})

function validateCategory (object) {
  object.created_at = new Date(object.created_at)
  object.updated_at = new Date(object.updated_at)
  return categorySchema.safeParse(object)
}

function validatePartialCategory (object) {
  if (object.created_at) {
    object.created_at = new Date(object.created_at)
  }
  if (object.updated_at) {
    object.updated_at = new Date(object.updated_at)
  }
  return categorySchema.partial().safeParse(object)
}

export { validateCategory, validatePartialCategory}
