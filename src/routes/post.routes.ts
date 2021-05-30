import multer from 'multer'

import { Router } from 'express'

import multerConfigs from '../configs/multer.configs'
import postControllers from '../controllers/post.controllers'
import sectionControllers from '../controllers/section.controllers'

const postRoutes = Router()

postRoutes.get(
  '/',
  sectionControllers.optionalAuthorization,
  postControllers.index
)

postRoutes.post(
  '/',
  sectionControllers.authorization,
  multer(multerConfigs.image()).single('content'),
  postControllers.create
)

postRoutes.delete(
  '/:postId',
  sectionControllers.authorization,
  postControllers.delete
)

export default postRoutes
