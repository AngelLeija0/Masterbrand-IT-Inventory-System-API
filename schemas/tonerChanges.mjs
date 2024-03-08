import { z } from 'zod'

const tonerChangeSchema = z.object({
  toner: z.object({
    id: z.string(),
    name: z.string(),
    color: z.string()
  }),
  printer: z.object({
    id: z.string(),
    name: z.string()
  }),
  comments: z.string(),
  created_at: z.date(),
  updated_at: z.date()
})

function validateTonerChange (object) {
  if (object.created_at) {
    object.created_at = new Date(object.created_at)
  }
  if (object.updated_at) {
    object.updated_at = new Date(object.updated_at)
  }
  return tonerChangeSchema.safeParse(object)
}

function validatePartialTonerChange (object) {
  if (object.created_at) {
    object.created_at = new Date(object.created_at)
  }
  if (object.updated_at) {
    object.updated_at = new Date(object.updated_at)
  }
  return tonerChangeSchema.partial().safeParse(object)
}

export { validateTonerChange, validatePartialTonerChange }
