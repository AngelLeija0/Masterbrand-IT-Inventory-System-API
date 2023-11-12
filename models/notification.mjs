import { Schema, model } from 'mongoose'

const notificationSchema = new Schema(
    {
        name: String,
        description: String,
        icon: String,
        importance: String,
        status: String,
        created_at: Date,
        updated_at: Date
    },
    {
        collection: 'notifications'
    }
)

export default model('Notification', notificationSchema)