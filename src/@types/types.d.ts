import { Comment, Post, SavedPost, User } from '@prisma/client'

export type SectionToken = {
  expIn: number
  userId: number
  requestOrigin: string
}

export type PostFindManyOptions = {
  date?: number
  user?: { id: number }
  pagination?: {
    skip: number
    take: number
  }
}

export type PostFindManyByUserOptions = {
  user: { id: number }
  pagination?: {
    skip: number
    take: number
  }
}

export type PostRender = Post & {
  author: User
  reactions?: { id: number }[]
  savedPost?: { id: number }[]
}

export type SavedPostRender = SavedPost & { post: PostRender }

export type CommentCreateRepositoryData = {
  postId: number
  content: string
  authorId: number
  fatherId?: number
}

export type CommentFindManyOptions = {
  postId: number
  fatherId: number | null
  pagination?: {
    skip: number
    take: number
  }
}

export type SavedPostFindManyOptions = {
  skip: number
  take: number
}

export type CommentRender = Comment & {
  post: {
    id: number
    slug: string
    comments?: {
      fatherId: number | null
    }[]
  }
  author: {
    name: string
    image: string | null
  }
}
