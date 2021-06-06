import { Router } from 'express'

import sessionControllers from '../controllers/session.controllers'

const sessionRoutes = Router()

sessionRoutes.post('/', sessionControllers.create)

export default sessionRoutes
