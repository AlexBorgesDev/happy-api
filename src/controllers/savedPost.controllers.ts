import { Request, Response } from 'express'

import savedPostViews from '../views/savedPost.views'
import savedPostValidators from '../validators/savedPost.validators'
import savedPostRepositories from '../repositories/savedPost.repositories'

export default {
  async index(req: Request, res: Response) {
    const { userId } = req

    if (!userId) return res.status(401).json({ error: 'Unauthorized action' })

    const skip =
      20 * (Number(req.query.page) < 1 ? 0 : Number(req.query.page) - 1 || 0)

    const savedPosts = await savedPostRepositories.findMany(userId, {
      skip,
      take: 20
    })

    const objJson = {
      page: Number(req.query.page) || 1,
      take: 20,
      data: savedPostViews.renderMany(savedPosts),
      total: savedPosts.length
    }

    return res.status(200).json(objJson)
  },

  async create(req: Request, res: Response) {
    const { userId } = req

    if (!userId) return res.status(401).json({ error: 'Unauthorized action' })

    const postId = Number(req.params.postId)

    await savedPostValidators.create.validate({ postId }, { abortEarly: false })

    await savedPostRepositories.create(postId, userId)

    return res.status(200).json({ message: 'Saved post successfully' })
  },

  async delete(req: Request, res: Response) {
    const { userId } = req

    if (!userId) return res.status(401).json({ error: 'Unauthorized action' })

    const postId = Number(req.params.postId)

    await savedPostValidators.delete.validate({ postId }, { abortEarly: false })

    await savedPostRepositories.delete(postId, userId)

    return res.status(200).json({
      message: 'The post has been removed from your list of saved posts'
    })
  }
}
