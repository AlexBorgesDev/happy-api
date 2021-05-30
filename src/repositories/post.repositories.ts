import { Prisma, PrismaClient } from '@prisma/client'

import { PostFindManyByUserOptions, PostFindManyOptions } from '../@types/types'

const prisma = new PrismaClient()

export default {
  async findUnique(id: number, authorId?: number) {
    return await prisma.post.findFirst({
      where: { id, author: { id: authorId } }
    })
  },

  async findMany(options?: PostFindManyOptions) {
    return await prisma.post.findMany({
      skip: options?.pagination?.skip,
      take: options?.pagination?.take,
      where: {
        createdAt: options?.date ? { lte: new Date(options.date) } : undefined
      },
      orderBy: { id: 'desc' },
      include: {
        author: true,
        reactions: {
          where: { user: { id: options?.user?.id || 0 }, type: { gte: 1 } },
          select: { id: true }
        },
        savedPost: {
          where: { user: { id: options?.user?.id || 0 } },
          select: { id: true }
        }
      }
    })
  },

  async findManyByUser(options: PostFindManyByUserOptions) {
    return await prisma.post.findMany({
      skip: options?.pagination?.skip,
      take: options?.pagination?.take,
      where: { author: { id: options.user.id } },
      orderBy: { id: 'desc' },
      include: {
        author: true,
        reactions: {
          where: { user: { id: options.user.id }, type: { gte: 1 } },
          select: { id: true }
        },
        savedPost: {
          where: { user: { id: options.user.id } },
          select: { id: true }
        }
      }
    })
  },

  async create(data: Prisma.PostCreateInput) {
    return await prisma.post.create({ data, include: { author: true } })
  },

  async delete(id: number) {
    const [savedPost, reactions, comments, post] = await prisma.$transaction([
      prisma.savedPost.deleteMany({ where: { post: { id } } }),
      prisma.reactions.deleteMany({ where: { post: { id } } }),
      prisma.comment.deleteMany({ where: { post: { id } } }),
      prisma.post.delete({ where: { id } })
    ])

    return { post, comments, reactions, savedPost }
  }
}
