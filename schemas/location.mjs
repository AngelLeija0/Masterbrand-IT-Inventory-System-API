import * as z from 'zod'

const locationSchema = z.object({
  name: z.string(),
  created_at: z.date(),
  updated_at: z.date()
})

function validateLocation (object) {
  object.created_at = new Date(object.created_at)
  object.updated_at = new Date(object.updated_at)
  return locationSchema.safeParse(object)
}

function validatePartialLocation (object) {
  if (object.created_at) {
    object.created_at = new Date(object.created_at)
  }
  if (object.updated_at) {
    object.updated_at = new Date(object.updated_at)
  }
  return locationSchema.partial().safeParse(object)
}

export { validateLocation, validatePartialLocation }
