import { z } from 'zod'

const administratorSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  username: z.string(),
  type: z.string(),
  created_at: z.date(),
  updated_at: z.date().optional()
})

function validateAdministrator (object) {
  object.created_at = new Date(object.created_at)
  object.updated_at = new Date(object.updated_at)
  return administratorSchema.safeParse(object)
}

function validatePartialAdministrator (object) {
  if (object.created_at) {
    object.created_at = new Date(object.created_at)
  }
  if (object.updated_at) {
    object.updated_at = new Date(object.updated_at)
  }
  return administratorSchema.partial().safeParse(object)
}

export { validateAdministrator, validatePartialAdministrator }
