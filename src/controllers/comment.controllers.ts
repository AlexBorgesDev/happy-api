import { Request, Response } from 'express'

import commentViews from '../views/comment.views'
import commentValidators from '../validators/comment.validators'
import commentRepositories from '../repositories/comment.repositories'

export default {
  async index(req: Request, res: Response) {
    const data = {
      postId: Number(req.params.postId),
      fatherId: req.params.fatherId ? Number(req.params.fatherId) : null
    }

    await commentValidators.index.validate(data, { abortEarly: false })

    const skip =
      20 * (Number(req.query.page) < 1 ? 0 : Number(req.query.page) - 1 || 0)

    const comments = await commentRepositories.findMany({
      ...data,
      pagination: { skip, take: 20 }
    })

    const objJson = {
      page: Number(req.query.page) || 1,
      take: 20,
      data: commentViews.renderMany(comments),
      total: comments.length
    }

    return res.status(200).json(objJson)
  },

  async create(req: Request, res: Response) {
    const { userId } = req

    if (!userId) return res.status(401).json({ error: 'Unauthorized action' })

    const data = {
      postId: Number(req.params.postId),
      content: req.body.content,
      authorId: userId,
      fatherId: isNaN(Number(req.body.fatherId))
        ? undefined
        : Number(req.body.fatherId)
    }

    await commentValidators.create.validate(data, { abortEarly: false })

    const comment = await commentRepositories.create(data)

    return res.status(200).json({
      message: 'Comment created successfully',
      data: commentViews.render(comment)
    })
  },

  async delete(req: Request, res: Response) {
    const { userId } = req

    if (!userId) return res.status(401).json({ error: 'Unauthorized action' })

    const commentId = Number(req.params.commentId)

    await commentValidators.delete.validate(
      { commentId },
      { abortEarly: false }
    )

    await commentRepositories.delete(commentId)

    return res.status(200).json({ message: 'Comment deleted successfully' })
  }
}
