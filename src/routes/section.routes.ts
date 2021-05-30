import { Router } from 'express'

import sectionControllers from '../controllers/section.controllers'

const sectionRoutes = Router()

sectionRoutes.post('/', sectionControllers.create)

export default sectionRoutes
