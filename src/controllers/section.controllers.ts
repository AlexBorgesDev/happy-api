import { compareSync, genSaltSync, hashSync } from 'bcryptjs'
import { NextFunction, Request, Response } from 'express'

import { SectionToken } from '../@types/types'
import { UserNotFound } from '../utils/errorConstructors'

import getIp from '../utils/getIp'
import Token from '../utils/token'

import sectionValidators from '../validators/section.validators'

import userRepositories from '../repositories/user.repositories'
import sectionRepositories from '../repositories/section.repositories'

const sectionToken = new Token<SectionToken>(<string>process.env.PRIVATE_KEY)

export default {
  async create(req: Request, res: Response) {
    const data = { email: req.body.email, password: req.body.password }

    await sectionValidators.create.validate(data, { abortEarly: false })

    const user = await userRepositories.findByEmail(data.email)

    if (!user) throw new UserNotFound('email')

    const device = { ip: getIp(req), ...req.useragent }

    const expIn = new Date()
    const token = await sectionToken.create({
      expIn: expIn.setHours(expIn.getHours() - 4),
      userId: user.id,
      requestOrigin: hashSync(String(getIp(req)), genSaltSync())
    })

    await sectionRepositories.create({
      ip: String(getIp(req)),
      os: device.os,
      user: { connect: { id: user.id } },
      token,
      browser: device.browser,
      isMobile: !!device.isMobile,
      platform: device.platform
    })

    return res.status(201).json({ token })
  },

  async delete(req: Request, res: Response) {
    const { userId } = req

    const token = req.headers.authorization?.split(' ')[2]

    if (!userId || !token) {
      return res.status(401).json({ error: 'Unauthorized action' })
    }

    await sectionRepositories.delete(token, userId)

    return res.status(200).json({ message: 'Section deleted successfully' })
  },

  async authorization(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers

    if (!authorization) {
      return res.status(401).json({ error: 'No token provider' })
    }

    const parts = authorization.split(' ')

    if (parts.length !== 2) {
      return res.status(401).json({ error: 'Token error' })
    }

    const [schema, token] = parts

    if (!/^Bearer$/i.test(schema)) {
      return res.status(401).json({ error: 'Malformed token' })
    }

    const decoded = await sectionToken.decoded(token)

    if (typeof decoded === 'string' || !decoded.userId) {
      return res.status(401).json({ error: 'Invalid Token' })
    }

    if (!compareSync(String(getIp(req)), decoded.requestOrigin)) {
      return res.status(401).json({ error: 'Token error' })
    }

    req.userId = decoded.userId

    return next()
  },

  async optionalAuthorization(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers

    if (!authorization) return next()

    const parts = authorization.split(' ')

    if (parts.length !== 2) {
      return res.status(401).json({ error: 'Token error' })
    }

    const [schema, token] = parts

    if (!/^Bearer$/i.test(schema)) {
      return res.status(401).json({ error: 'Malformed token' })
    }

    const decoded = await sectionToken.decoded(token)

    if (typeof decoded === 'string' || !decoded.userId) {
      return res.status(401).json({ error: 'Invalid Token' })
    }

    if (!compareSync(String(getIp(req)), decoded.requestOrigin)) {
      return res.status(401).json({ error: 'Token error' })
    }

    req.userId = decoded.userId

    return next()
  }
}
