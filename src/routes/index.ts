import { Router } from 'express'

import postRoutes from './post.routes'
import userRoutes from './user.routes'
import commentRoutes from './comment.routes'
import sectionRoutes from './section.routes'
import reactionRoutes from './reaction.routes'
import savedPostRoutes from './savedPost.routes'

const routes = Router()

routes.use('/posts', postRoutes)
routes.use('/users', userRoutes)
routes.use('/comments', commentRoutes)
routes.use('/sections', sectionRoutes)
routes.use('/reactions', reactionRoutes)
routes.use('/saved/posts', savedPostRoutes)

export default routes
