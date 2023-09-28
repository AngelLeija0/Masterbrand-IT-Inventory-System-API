import { Schema, model } from 'mongoose'

const assetSchema = new Schema(
    {
        category: String,
        images: {
            type: Object,
            default: null,
            required: false,
        },
        description: String,
        manufacturer: String,
        model: String,
        serial_number: String,
        purchase_from: String,
        purchase_date: String,
        cost: String,
        warranty_info: String,
        warranty_expiration_date: String,
        operating_system: String,
        ip_address: String,
        ram: String,
        location: String,
        location_extra_info: String,
        current_employee: String,
        actions: {
            type: Array,
            default: null,
            required: false,
        },
        status: {
            type: Object,
            default: null,
            required: false,
        },
        created_at: Date,
        updated_at: Date,
    },
    {
        collection: 'assets'
    }
)

export default model('Asset', assetSchema)