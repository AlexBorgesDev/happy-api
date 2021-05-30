import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default {
  async create(type: number, postId: number, userId: number) {
    const reactions = await prisma.reactions.findMany({
      where: { post: { id: postId }, user: { id: userId } }
    })

    if (reactions.length > 0) return

    return await prisma.reactions.create({
      data: {
        type,
        post: { connect: { id: postId } },
        user: { connect: { id: userId } }
      }
    })
  },

  async delete(postId: number, userId: number) {
    return await prisma.reactions.deleteMany({
      where: { post: { id: postId }, user: { id: userId } }
    })
  }
}
