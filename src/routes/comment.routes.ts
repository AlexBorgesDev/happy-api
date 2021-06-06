import { Router } from 'express'

import commentControllers from '../controllers/comment.controllers'
import sessionControllers from '../controllers/session.controllers'

const commentRoutes = Router()

commentRoutes.get('/:postId', commentControllers.index)
commentRoutes.get('/:postId/:fatherId', commentControllers.index)

commentRoutes.post(
  '/:postId',
  sessionControllers.authorization,
  commentControllers.create
)

commentRoutes.delete(
  '/:commentId',
  sessionControllers.authorization,
  commentControllers.delete
)

export default commentRoutes
