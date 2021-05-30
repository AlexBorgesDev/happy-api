import fs from 'fs'
import path from 'path'

const deleteFiles = (files: string[]) => {
  files.forEach(name => {
    if (name === 'defaultImage.png') return

    const filePath = path.resolve(__dirname, '..', '..', 'public', name)

    if (!fs.existsSync(filePath)) return

    fs.unlinkSync(filePath)
  })
}

export default deleteFiles
