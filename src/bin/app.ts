import 'express-async-errors'

import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'
import express from 'express'
import useragent from 'express-useragent'

import errors from '../errors'
import routes from '../routes'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(useragent.express())
app.use('/', express.static(path.resolve(__dirname, '..', '..', 'public')))

app.use(routes)

app.use(errors)

export default app
