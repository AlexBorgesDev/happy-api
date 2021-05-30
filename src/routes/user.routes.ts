import multer from 'multer'

import { Router } from 'express'

import multerConfigs from '../configs/multer.configs'
import userControllers from '../controllers/user.controllers'
import sectionControllers from '../controllers/section.controllers'

const userRoutes = Router()

userRoutes.get('/', sectionControllers.authorization, userControllers.show)

userRoutes.get(
  '/posts',
  sectionControllers.authorization,
  userControllers.indexPosts
)

userRoutes.post(
  '/',
  multer(multerConfigs.image()).single('image'),
  userControllers.create
)

userRoutes.put(
  '/',
  sectionControllers.authorization,
  multer(multerConfigs.image()).single('image'),
  userControllers.update
)

userRoutes.delete('/', sectionControllers.authorization, userControllers.delete)

export default userRoutes
