import multer from 'multer'

import { Router } from 'express'

import multerConfigs from '../configs/multer.configs'
import postControllers from '../controllers/post.controllers'
import sessionControllers from '../controllers/session.controllers'

const postRoutes = Router()

postRoutes.get(
  '/',
  sessionControllers.optionalAuthorization,
  postControllers.index
)

postRoutes.post(
  '/',
  sessionControllers.authorization,
  multer(multerConfigs.image()).single('content'),
  postControllers.create
)

postRoutes.delete(
  '/:postId',
  sessionControllers.authorization,
  postControllers.delete
)

export default postRoutes
