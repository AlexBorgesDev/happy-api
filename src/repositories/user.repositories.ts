import { genSaltSync, hash } from 'bcryptjs'
import { Prisma, PrismaClient } from '@prisma/client'

import { ExistUser } from '../utils/errorConstructors'
import deleteFiles from '../utils/deleteFiles'

const prisma = new PrismaClient()

export default {
  async findById(id: number) {
    return await prisma.user.findUnique({ where: { id } })
  },

  async findByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } })
  },

  async create(data: Prisma.UserCreateInput) {
    const user = await this.findByEmail(data.email)

    if (user) throw new ExistUser()

    data.password = await hash(data.password, genSaltSync(10))

    await prisma.user.create({ data })
  },

  async update(id: number, data: Prisma.UserUpdateInput) {
    const [oldUser, updatedUser] = await prisma.$transaction([
      prisma.user.findUnique({ where: { id }, rejectOnNotFound: true }),
      prisma.user.update({ data, where: { id } })
    ])

    return { oldUser, updatedUser }
  },

  async delete(id: number) {
    const posts = await prisma.post.findMany({ where: { author: { id } } })

    const files: string[] = []

    for (const post of posts) {
      files.push(post.content)

      await prisma.$transaction([
        prisma.savedPost.deleteMany({ where: { post: { id: post.id } } }),
        prisma.reactions.deleteMany({ where: { post: { id: post.id } } }),
        prisma.comment.deleteMany({ where: { post: { id: post.id } } }),
        prisma.post.delete({ where: { id: post.id } })
      ])
    }

    await prisma.$transaction([
      prisma.savedPost.deleteMany({ where: { user: { id } } }),
      prisma.reactions.deleteMany({ where: { user: { id } } }),
      prisma.comment.deleteMany({ where: { author: { id } } }),
      prisma.section.deleteMany({ where: { userId: id } })
    ])

    const user = await prisma.user.delete({ where: { id } })

    deleteFiles([user.image, ...files])
  }
}
