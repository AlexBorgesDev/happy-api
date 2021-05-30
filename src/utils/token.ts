import jwt from 'jsonwebtoken'

class Token<Type> {
  private secretKey: string

  constructor(secretKey: string) {
    this.secretKey = secretKey
  }

  async create(data: Type) {
    return jwt.sign(data as any, this.secretKey, { expiresIn: '128d' })
  }

  async decoded(token: string) {
    const decoded = jwt.verify(token, this.secretKey) as unknown as
      | Type
      | string

    return decoded
  }
}

export default Token
