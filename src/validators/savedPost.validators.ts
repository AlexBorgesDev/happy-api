import * as Yup from 'yup'

export default {
  create: Yup.object().shape({
    postId: Yup.number().integer().required().min(1)
  }),

  delete: Yup.object().shape({
    postId: Yup.number().integer().required().min(1)
  })
}
