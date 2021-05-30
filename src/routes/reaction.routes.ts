import { Router } from 'express'

import sectionControllers from '../controllers/section.controllers'
import reactionControllers from '../controllers/reaction.controllers'

const reactionRoutes = Router()

reactionRoutes.post(
  '/:postId',
  sectionControllers.authorization,
  reactionControllers.create
)

reactionRoutes.delete(
  '/:postId',
  sectionControllers.authorization,
  reactionControllers.delete
)

export default reactionRoutes
