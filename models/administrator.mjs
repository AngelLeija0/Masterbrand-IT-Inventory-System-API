import { Schema, model } from 'mongoose'

const administratorSchema = new Schema(
  {
    email: String,
    password: String,
    username: String,
    notifications: Array,
    type: String,
    created_at: Date,
    updated_at: Date
  },
  {
    collection: 'administrators'
  }
)

export default model('Administrator', administratorSchema)