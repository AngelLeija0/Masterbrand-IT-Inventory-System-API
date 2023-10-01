import { z } from 'zod'

const notificationSchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.boolean(),
  created_at: z.date(),
  updated_at: z.date()
})

function validateNotification (object) {
  object.created_at = new Date(object.created_at)
  object.updated_at = new Date(object.updated_at)
  return notificationSchema.safeParse(object)
}

function validatePartialNotification (object) {
  if (object.created_at) {
    object.created_at = new Date(object.created_at)
  }
  if (object.updated_at) {
    object.updated_at = new Date(object.updated_at)
  }
  return notificationSchema.partial().safeParse(object)
}

export { validateNotification, validatePartialNotification }
