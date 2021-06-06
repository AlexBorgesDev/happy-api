import { Router } from 'express'

import sessionControllers from '../controllers/session.controllers'
import savedPostControllers from '../controllers/savedPost.controllers'

const savedPostRoutes = Router()

savedPostRoutes.get(
  '/',
  sessionControllers.authorization,
  savedPostControllers.index
)

savedPostRoutes.post(
  '/:postId',
  sessionControllers.authorization,
  savedPostControllers.create
)

savedPostRoutes.delete(
  '/:postId',
  sessionControllers.authorization,
  savedPostControllers.delete
)

export default savedPostRoutes
