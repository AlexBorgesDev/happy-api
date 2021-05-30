import * as Yup from 'yup'

export default {
  create: Yup.object().shape({
    slug: Yup.string().required(),
    title: Yup.string().required().min(2).trim(),
    content: Yup.string().required().trim()
  }),

  delete: Yup.object().shape({
    postId: Yup.number().required().integer().min(1)
  })
}
