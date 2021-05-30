import crypto from 'crypto'

import { Request, Response } from 'express'

import postViews from '../views/post.views'
import postValidators from '../validators/post.validators'
import postRepositories from '../repositories/post.repositories'

export default {
  async index(req: Request, res: Response) {
    const { userId } = req

    const query = {
      skip:
        20 * (Number(req.query.page) < 1 ? 0 : Number(req.query.page) - 1 || 0),
      date: Number(req.query.maxDate) || Date.now()
    }

    const posts = await postRepositories.findMany({
      date: query.date,
      user: userId ? { id: userId } : undefined,
      pagination: { skip: query.skip, take: 20 }
    })

    const objJson = {
      page: Number(req.query.page) || 1,
      take: 20,
      data: postViews.renderMany(posts),
      total: posts.length
    }

    return res.status(200).json(objJson)
  },

  async create(req: Request, res: Response) {
    const { userId } = req

    if (!userId) return res.status(401).json({ error: 'Unauthorized action' })

    const data = {
      slug: `${Date.now()}-${crypto.randomBytes(8).toString('hex')}`,
      title: req.body.title,
      content: req.file?.filename
    }

    await postValidators.create.validate(data, { abortEarly: false })

    const post = await postRepositories.create({
      ...data,
      author: { connect: { id: userId } }
    })

    return res.status(201).json({
      message: 'Post created successfully',
      data: postViews.render(post)
    })
  },

  async delete(req: Request, res: Response) {
    const { userId } = req

    if (!userId) return res.status(401).json({ error: 'Unauthorized action' })

    const postId = Number(req.params.postId)

    await postValidators.delete.validate({ postId }, { abortEarly: false })

    const post = await postRepositories.findUnique(postId, userId)

    if (!post) return res.status(404).json({ error: 'Post not found' })

    await postRepositories.delete(postId)

    return res.status(200).json({ message: 'Post deleted successfully' })
  }
}
