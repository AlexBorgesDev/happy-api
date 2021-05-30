import postViews from './post.views'

import { SavedPostRender } from '../@types/types'

export default {
  render(savedPost: SavedPostRender) {
    return postViews.render(savedPost.post)
  },

  renderMany(savedPosts: SavedPostRender[]) {
    return savedPosts.map(savedPost => this.render(savedPost))
  }
}
