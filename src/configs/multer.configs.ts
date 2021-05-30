import path from 'path'
import multer from 'multer'

import { GenericErrors } from '../utils/errorConstructors'

class MulterConfigs {
  private storage: multer.StorageEngine

  public publicPath: string

  constructor(publicPath: string) {
    this.publicPath = publicPath

    this.storage = multer.diskStorage({
      destination: (req, file, cb) => cb(null, publicPath),
      filename: (req, file, cb) =>
        cb(null, `${Date.now()}-${file.originalname}`)
    })
  }

  public image(): multer.Options {
    return {
      dest: this.publicPath,
      storage: this.storage,
      limits: {
        fileSize: 10 * 1024 * 1024
      },
      fileFilter: (req, file, cb) => {
        const allowedMimes = [
          'image/jpeg',
          'image/pjpeg',
          'image/png',
          'image/gif'
        ]

        if (allowedMimes.includes(file.mimetype)) cb(null, true)
        else {
          cb(
            new GenericErrors('Invalid fields', {
              image: ['Invalid file type']
            })
          )
        }
      }
    }
  }
}

export default new MulterConfigs(path.resolve(__dirname, '..', '..', 'public'))
