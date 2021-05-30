import * as Yup from 'yup'

export default {
  create: Yup.object().shape({
    postId: Yup.number().required().integer().min(1)
  }),

  delete: Yup.object().shape({
    postId: Yup.number().required().integer().min(1)
  })
}
