import express from 'express'
const app = express()
import mongoose from 'mongoose'

import dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(cors())

app.disable('x-powered-by')

mongoose.connect(
  process.env.MONGODB_URI + '/masterbrand-it-inventory-system-db',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    writeConcern: 'majority',
    dbName: 'masterbrand-it-inventory-system-db'
  }
)

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('Connected to MongoDB')
})

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.use(
  '/uploads/attachments',
  express.static(path.join(__dirname, 'uploads', 'attachments'))
)

app.use(
  '/uploads/files',
  express.static(path.join(__dirname, 'uploads', 'files'))
)

import authRouter from './routes/auth/index.mjs'
app.use('/auth', authRouter)

import reportsRouter from './routes/reports/index.mjs'
app.use('/reports', reportsRouter)

import administratorsRouter from './routes/administrators/index.mjs'
app.use('/administrators', administratorsRouter)

import assetsRouter from './routes/assets/index.mjs'
app.use('/assets', assetsRouter)

import categoriesRouter from './routes/categories/index.mjs'
app.use('/categories', categoriesRouter)

import locationsRouter from './routes/locations/index.mjs'
app.use('/locations', locationsRouter)

import notificationsRouter from './routes/notifications/index.mjs'
app.use('/notifications', notificationsRouter)

import tonersRouter from './routes/toners/index.mjs'
app.use('/toners', tonersRouter)

import tonerChangesRouter from './routes/tonerChanges/index.mjs'
app.use('/toner-changes', tonerChangesRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`)
})