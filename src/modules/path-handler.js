import os from 'node:os'
import path from 'node:path'

export const pathHandler = {
  getAbsolute(inputPath) {
    switch (true) {
      case path.isAbsolute(inputPath):
        return inputPath

      case inputPath.startsWith('~'):
        return path.join(os.homedir(), inputPath.slice(1))

      default:
        return path.resolve(inputPath)
    }
  },
}
