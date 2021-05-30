export class GenericErrors extends Error {
  public error: string
  public errors: { [key: string]: string[] }

  constructor(error: string, errors: { [key: string]: string[] }) {
    super()

    this.error = error
    this.errors = errors

    Object.setPrototypeOf(this, GenericErrors.prototype)
  }
}

export class ExistUser extends Error {
  public error: string
  public errors: { [key: string]: string[] }

  constructor() {
    super()

    this.error = 'A user with this email address already exists.'
    this.errors = { email: ['A user with this email address already exists.'] }

    Object.setPrototypeOf(this, ExistUser.prototype)
  }
}

export class UserNotFound extends Error {
  public error: string
  public errors: { [key: string]: string[] }

  constructor(type?: 'token' | 'email') {
    super()

    const errors: { [key: string]: string[] } = {}

    if (type === 'token') errors.token = ['No users were found']
    else if (type === 'email') {
      errors.email = ['No user with this email was found']
    }

    this.error = 'User not found'
    this.errors = errors

    Object.setPrototypeOf(this, UserNotFound.prototype)
  }
}
