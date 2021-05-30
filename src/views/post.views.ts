import { PostRender } from '../@types/types'

export default {
  render(post: PostRender) {
    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      liked: Array.isArray(post.reactions) ? post.reactions.length > 0 : false,
      saved: Array.isArray(post.savedPost) ? post.savedPost.length > 0 : false,
      content: post.content,
      createAt: post.createdAt,
      updateAt: post.updatedAt,
      author: {
        name: post.author.name,
        image: post.author.image
      }
    }
  },

  renderMany(posts: PostRender[]) {
    return posts.map(post => this.render(post))
  }
}
