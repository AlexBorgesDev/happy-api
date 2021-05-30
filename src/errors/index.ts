import { MulterError } from 'multer'
import { ValidationError } from 'yup'
import { ErrorRequestHandler } from 'express'

import deleteFiles from '../utils/deleteFiles'

import {
  ExistUser,
  GenericErrors,
  UserNotFound
} from '../utils/errorConstructors'

interface ValidationErrors {
  [key: string]: string[]
}

const errors: ErrorRequestHandler = (error, req, res, next) => {
  if (req.file?.filename) deleteFiles([req.file.filename])

  if (error instanceof ValidationError) {
    const errors: ValidationErrors = {}

    error.inner.forEach(err => {
      err.path && (errors[err.path] = err.errors)
    })

    return res.status(400).json({ error: 'Validation fails', errors })
  } else if (error instanceof GenericErrors || error instanceof ExistUser) {
    return res.status(400).json({ error: error.error, errors: error.errors })
  } else if (error instanceof UserNotFound) {
    return res.status(404).json({ error: error.error, errors: error.errors })
  } else if (error instanceof MulterError) {
    return res.status(400).json({
      error: 'Invalid fields',
      errors: error.field ? { [error.field]: [error.message] } : {}
    })
  }

  console.error(error)

  return res.status(500).json({ error: 'Internal server error' })
}

export default errors
