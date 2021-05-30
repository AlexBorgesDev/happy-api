import { User } from '@prisma/client'

export default {
  render(user: User) {
    return {
      name: user.name,
      email: user.email,
      image: user.image
    }
  }
}
