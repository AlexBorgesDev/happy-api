import { Router } from 'express'

import sessionControllers from '../controllers/session.controllers'
import reactionControllers from '../controllers/reaction.controllers'

const reactionRoutes = Router()

reactionRoutes.post(
  '/:postId',
  sessionControllers.authorization,
  reactionControllers.create
)

reactionRoutes.delete(
  '/:postId',
  sessionControllers.authorization,
  reactionControllers.delete
)

export default reactionRoutes
