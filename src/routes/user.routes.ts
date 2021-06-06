import multer from 'multer'

import { Router } from 'express'

import multerConfigs from '../configs/multer.configs'
import userControllers from '../controllers/user.controllers'
import sessionControllers from '../controllers/session.controllers'

const userRoutes = Router()

userRoutes.get('/', sessionControllers.authorization, userControllers.show)

userRoutes.get(
  '/posts',
  sessionControllers.authorization,
  userControllers.indexPosts
)

userRoutes.post(
  '/',
  multer(multerConfigs.image()).single('image'),
  userControllers.create
)

userRoutes.put(
  '/',
  sessionControllers.authorization,
  multer(multerConfigs.image()).single('image'),
  userControllers.update
)

userRoutes.delete('/', sessionControllers.authorization, userControllers.delete)

export default userRoutes
