import { Request } from 'express'

export default (req: Request) =>
  req.headers['x-forwarded-for'] || req.socket.remoteAddress
