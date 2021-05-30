import * as Yup from 'yup'

export default {
  index: Yup.object().shape({
    postId: Yup.number().integer().required().min(1),
    fatherId: Yup.number().integer().min(1).nullable(true)
  }),

  create: Yup.object().shape({
    postId: Yup.number().integer().required().min(1),
    content: Yup.string().required().min(1).trim(),
    fatherId: Yup.number().integer().min(1)
  }),

  delete: Yup.object().shape({
    commentId: Yup.number().integer().required().min(1)
  })
}
