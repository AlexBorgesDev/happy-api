import { PrismaClient } from '.prisma/client'

import {
  CommentCreateRepositoryData,
  CommentFindManyOptions
} from '../@types/types'

const prisma = new PrismaClient()

export default {
  async findMany(options?: CommentFindManyOptions) {
    return await prisma.comment.findMany({
      skip: options?.pagination?.skip,
      take: options?.pagination?.take,
      where: { fatherId: options?.fatherId, post: { id: options?.postId } },
      include: {
        post: {
          select: {
            id: true,
            slug: true,
            comments: {
              where: { fatherId: { not: null } },
              select: { fatherId: true }
            }
          }
        },
        author: { select: { name: true, image: true } }
      }
    })
  },

  async create(data: CommentCreateRepositoryData) {
    return await prisma.comment.create({
      data: {
        fatherId: data.fatherId,
        content: data.content,
        author: { connect: { id: data.authorId } },
        post: { connect: { id: data.postId } }
      },
      include: {
        post: { select: { id: true, slug: true } },
        author: { select: { name: true, image: true } }
      }
    })
  },

  async delete(id: number) {
    const [childrenComments, removedComment] = await prisma.$transaction([
      prisma.comment.deleteMany({ where: { fatherId: id } }),
      prisma.comment.delete({ where: { id } })
    ])

    return { removedComment, childrenComments }
  }
}
