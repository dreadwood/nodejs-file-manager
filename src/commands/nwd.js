import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { Commands } from '../constants.js'
import { message } from '../modules/message.js'
import { pathHandler } from '../modules/path-handler.js'

export const nwdHandler = async (inputCommand, firstArguments) => {
  switch (inputCommand) {
    case Commands.up: {
      const pathObj = path.parse(process.cwd())

      if (pathObj.dir === pathObj.root && pathObj.base.length === 0) {
        message.rootDirectory()
        return
      }

      process.chdir(path.dirname(process.cwd()))
      break
    }

    case Commands.cd: {
      if (!firstArguments) {
        message.inputError()
        return
      }

      const absolutePath = pathHandler.getAbsolute(firstArguments)
      process.chdir(absolutePath)
      break
    }

    case Commands.ls:
      const dataDir = await fs.readdir(process.cwd(), { withFileTypes: true })

      const separateDataDir = dataDir.reduce(
        (acc, it) => {
          if (it.isFile()) {
            acc.file.push({
              name: it.name,
              type: 'file',
            })
          } else if (it.isDirectory()) {
            acc.directory.push({
              name: it.name,
              type: 'directory',
            })
          } else {
            acc.unknown.push({
              name: it.name,
              type: 'unknown',
            })
          }
          return acc
        },
        {
          directory: [],
          file: [],
          unknown: [],
        }
      )

      console.table([
        ...separateDataDir.directory,
        ...separateDataDir.file,
        ...separateDataDir.unknown,
      ])

      break
  }
}
