import { Schema, model } from 'mongoose'

const tonerSchema = new Schema(
    {
        name: String,
        incomingStock: Object,
        outgoingStock: Object,
        created_at: Date,
        updated_at: Date
    },
    {
        collection: 'toners'
    }
)

export default model('Toners', tonerSchema)