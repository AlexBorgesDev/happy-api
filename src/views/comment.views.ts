import { CommentRender } from '../@types/types'

export default {
  render(comment: CommentRender) {
    let haveChildren: boolean

    if (comment.fatherId !== null) haveChildren = false
    else if (Array.isArray(comment.post.comments)) {
      haveChildren =
        comment.post.comments.filter(com => com.fatherId === comment.id)
          .length > 0
    } else haveChildren = false

    return {
      id: comment.id,
      content: comment.content,
      fatherId: comment.fatherId,
      createAt: comment.createdAt,
      updateAt: comment.updatedAt,
      haveChildren: haveChildren,
      post: {
        id: comment.post.id,
        slug: comment.post.slug
      },
      author: {
        name: comment.author.name,
        image: comment.author.image
      }
    }
  },

  renderMany(comments: CommentRender[]) {
    return comments.map(comment => this.render(comment))
  }
}
