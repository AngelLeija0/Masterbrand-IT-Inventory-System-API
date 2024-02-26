import { Schema, model } from 'mongoose'

const tonerChangesSchema = new Schema(
    {
        toner: Object,
        printer: Object,
        coments: String,
        created_at: Date,
        updated_at: Date
    },
    {
        collection: 'toners'
    }
)

export default model('TonersChanges', tonerChangesSchema)