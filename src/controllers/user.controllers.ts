import { Prisma } from '@prisma/client'
import { compareSync } from 'bcryptjs'
import { Request, Response } from 'express'

import deleteFiles from '../utils/deleteFiles'

import postViews from '../views/post.views'
import postRepositories from '../repositories/post.repositories'

import userViews from '../views/user.views'
import userValidators from '../validators/user.validators'
import userRepositories from '../repositories/user.repositories'

export default {
  async indexPosts(req: Request, res: Response) {
    const { userId } = req

    if (!userId) return res.status(401).json({ error: 'Unauthorized action' })

    const skip =
      20 * (Number(req.query.page) < 1 ? 0 : Number(req.query.page) - 1 || 0)

    const posts = await postRepositories.findManyByUser({
      user: { id: userId },
      pagination: { skip, take: 20 }
    })

    const objJson = {
      page: Number(req.query.page) || 1,
      take: 20,
      data: postViews.renderMany(posts),
      total: posts.length
    }

    return res.status(200).json(objJson)
  },

  async show(req: Request, res: Response) {
    const { userId } = req

    if (!userId) return res.status(401).json({ error: 'Unauthorized action' })

    const user = await userRepositories.findById(userId)

    if (!user) return res.status(404).json({ error: 'User not found' })

    return res.status(200).json(userViews.render(user))
  },

  async create(req: Request, res: Response) {
    const data: Prisma.UserCreateInput = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }

    await userValidators.create.validate(data, { abortEarly: false })

    if (req.file?.filename) data.image = req.file.filename

    await userRepositories.create(data)

    return res.status(201).json({ message: 'User created successfully' })
  },

  async update(req: Request, res: Response) {
    const { userId } = req

    if (!userId) return res.status(401).json({ error: 'Unauthorized action' })

    const data: Prisma.UserUpdateInput = {
      name: req.body.name,
      email: req.body.email,
      image: req.file?.filename
    }

    if (!data.name && !data.email && !data.image) {
      return res
        .status(400)
        .json({ message: 'No information to be changed was informed' })
    }

    await userValidators.update.validate(data, { abortEarly: false })

    const { oldUser, updatedUser } = await userRepositories.update(userId, data)

    if (data.image) deleteFiles([oldUser.image])

    return res.status(200).json({
      message: 'User updated successfully',
      data: userViews.render(updatedUser)
    })
  },

  async delete(req: Request, res: Response) {
    const { userId } = req

    if (!userId) return res.status(401).json({ error: 'Unauthorized action' })

    const password = String(req.headers.password)

    await userValidators.delete.validate({ password }, { abortEarly: false })

    const user = await userRepositories.findById(userId)

    if (!user) return res.status(404).json({ error: 'User not found' })
    if (!compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Unauthorized action' })
    }

    res.status(200).json({
      message: 'User deleted successfully',
      info: 'It may take up to 2 days for everything to be erased'
    })

    return await userRepositories.delete(userId)
  }
}
