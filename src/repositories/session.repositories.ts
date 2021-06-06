import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default {
  async create(data: Prisma.SectionCreateInput) {
    await prisma.section.create({ data })
  },

  async delete(token: string, userId: number) {
    await prisma.section.deleteMany({ where: { token, user: { id: userId } } })
  }
}
