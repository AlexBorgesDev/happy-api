import { Router } from 'express'

import sectionControllers from '../controllers/section.controllers'
import savedPostControllers from '../controllers/savedPost.controllers'

const savedPostRoutes = Router()

savedPostRoutes.get(
  '/',
  sectionControllers.authorization,
  savedPostControllers.index
)

savedPostRoutes.post(
  '/:postId',
  sectionControllers.authorization,
  savedPostControllers.create
)

savedPostRoutes.delete(
  '/:postId',
  sectionControllers.authorization,
  savedPostControllers.delete
)

export default savedPostRoutes
