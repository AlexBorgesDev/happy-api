import * as Yup from 'yup'

export default {
  create: Yup.object().shape({
    name: Yup.string()
      .required()
      .min(2)
      .matches(/([A-z]{2})\s([A-z]{2})/g, {
        excludeEmptyString: true,
        message: 'Full name required'
      })
      .trim(),

    email: Yup.string().required().email(),
    password: Yup.string().required().min(8).max(16).trim()
  }),

  update: Yup.object().shape({
    name: Yup.string()
      .min(2)
      .matches(/([A-z]{2})\s([A-z]{2})/g, {
        excludeEmptyString: true,
        message: 'Full name required'
      })
      .trim(),

    email: Yup.string().email(),
    image: Yup.string()
  }),

  delete: Yup.object().shape({
    password: Yup.string().required().min(8).max(16).trim()
  })
}
