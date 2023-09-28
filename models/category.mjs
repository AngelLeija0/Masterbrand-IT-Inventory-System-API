import { Schema, model } from 'mongoose'

const categorySchema = new Schema(
    {
        name: String,
        created_at: Date,
        updated_at: Date
    },
    {
        collection: 'categories'
    }
)

export default model('Category', categorySchema)