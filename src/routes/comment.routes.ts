import { Router } from 'express'

import commentControllers from '../controllers/comment.controllers'
import sectionControllers from '../controllers/section.controllers'

const commentRoutes = Router()

commentRoutes.get('/:postId', commentControllers.index)
commentRoutes.get('/:postId/:fatherId', commentControllers.index)

commentRoutes.post(
  '/:postId',
  sectionControllers.authorization,
  commentControllers.create
)

commentRoutes.delete(
  '/:commentId',
  sectionControllers.authorization,
  commentControllers.delete
)

export default commentRoutes
