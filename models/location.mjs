import { Schema, model } from 'mongoose'

const locationSchema = new Schema(
    {
        name: String,
        created_at: Date,
        updated_at: Date
    },
    {
        collection: 'locations'
    }
)

export default model('Locations', locationSchema)