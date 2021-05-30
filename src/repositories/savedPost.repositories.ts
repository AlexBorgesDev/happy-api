import { PrismaClient } from '@prisma/client'

import { SavedPostFindManyOptions } from '../@types/types'

const prisma = new PrismaClient()

export default {
  async findMany(userId: number, options?: SavedPostFindManyOptions) {
    return await prisma.savedPost.findMany({
      skip: options?.skip,
      take: options?.take,
      where: { user: { id: userId } },
      orderBy: { id: 'desc' },
      include: {
        post: {
          include: {
            author: true,
            reactions: {
              where: { user: { id: userId }, type: { gte: 1 } },
              select: { id: true }
            },
            savedPost: { where: { user: { id: userId } }, select: { id: true } }
          }
        }
      }
    })
  },

  async create(postId: number, userId: number) {
    const savedPosts = await prisma.savedPost.findMany({
      where: { post: { id: postId }, user: { id: userId } }
    })

    if (savedPosts.length > 0) return

    return await prisma.savedPost.create({
      data: {
        post: { connect: { id: postId } },
        user: { connect: { id: userId } }
      }
    })
  },

  async delete(postId: number, userId: number) {
    await prisma.savedPost.deleteMany({
      where: { post: { id: postId }, AND: { user: { id: userId } } }
    })
  }
}
