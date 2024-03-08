import { Schema, model } from 'mongoose'

const tonerChangesSchema = new Schema(
    {
        toner: Object,
        printer: Object,
        comments: String,
        created_at: Date,
        updated_at: Date
    },
    {
        collection: 'tonerChanges'
    }
)

export default model('TonersChanges', tonerChangesSchema)