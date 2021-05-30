import { Request, Response } from 'express'

import reactionValidators from '../validators/reaction.validators'
import reactionRepositories from '../repositories/reaction.repositories'

export default {
  async create(req: Request, res: Response) {
    const { userId } = req

    if (!userId) return res.status(401).json({ error: 'Unauthorized action' })

    const postId = Number(req.params.postId)

    await reactionValidators.create.validate({ postId }, { abortEarly: false })

    await reactionRepositories.create(1, postId, userId)

    return res.status(201).json({ message: 'Reaction created successfully' })
  },

  async delete(req: Request, res: Response) {
    const { userId } = req

    if (!userId) return res.status(401).json({ error: 'Unauthorized action' })

    const postId = Number(req.params.postId)

    await reactionValidators.delete.validate({ postId }, { abortEarly: false })

    await reactionRepositories.delete(postId, userId)

    return res.status(200).json({ message: 'Reaction deleted successfully' })
  }
}
