import { z } from 'zod'

const assetSchema = z.object({
  category: z.string(),
  images: z
    .object({
      default_image: z.string(),
      all: z.array(z.string())
    })
    .optional(),
  description: z.string(),
  manufacturer: z.string(),
  model: z.string(),
  serial_number: z.string(),
  purchase_from: z.string(),
  purchase_date: z.date(),
  cost: z.string(),
  warranty_info: z.string(),
  warranty_expiration_date: z.date(),
  location: z.string(),
  location_extra_info: z.string().optional(),
  current_employee: z.string().optional(),
  actions: z.array(
    z
      .object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        state: z.string(),
        attachments: z.array(),
        date: z.string()
      })
      .optional()
  ),
  status: z
    .object({
      name: z.string(),
      description: z.string(),
      date: z.string()
    })
    .optional(),
  created_at: z.date(),
  updated_at: z.date(),
  __v: z.optional(),
  operating_system: z.string().optional(),
  ip_address: z.string().optional(),
  ram: z.string().optional(),
  network_status: z.string().optional(),
  quantity: z.string().optional(),
  quantity_last_out: z.string().optional(),
  date_quantity_last_out: z.string().optional(),
  quantity_last_restock: z.string().optional(),
  date_last_restock: z.string().optional()
})

function validateAsset (object) {
  if (object._id) {
    delete object._id
  }
  object.purchase_date = new Date(object.purchase_date)
  object.warranty_expiration_date = new Date(object.warranty_expiration_date)
  object.created_at = new Date(object.created_at)
  object.updated_at = new Date(object.updated_at)
  return assetSchema.safeParse(object)
}

function validatePartialAsset (object) {
  if (object._id) {
    delete object._id
  }
  if (object.created_at) {
    object.created_at = new Date(object.created_at)
  }
  if (object.updated_at) {
    object.updated_at = new Date(object.updated_at)
  }
  if (object.purchase_date) {
    object.purchase_date = new Date(object.purchase_date)
  }
  if (object.warranty_expiration_date) {
    object.warranty_expiration_date = new Date(object.warranty_expiration_date)
  }
  console.log(object)
  return assetSchema.partial().safeParse(object)
}


export { validateAsset, validatePartialAsset }