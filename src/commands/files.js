import fs from 'node:fs'
import process from 'node:process'
import fsPromises from 'node:fs/promises'
import path from 'node:path'
import stream from 'node:stream/promises'
import { Commands } from '../constants.js'
import { message } from '../modules/message.js'
import { pathHandler } from '../modules/path-handler.js'

const copyFile = async (sourceFile, outputDir) => {
  const sourceFilePath = pathHandler.getAbsolute(sourceFile)
  const fileName = path.basename(sourceFile)
  const outputDirPath = pathHandler.getAbsolute(outputDir)
  const outputFilePath = path.join(outputDirPath, fileName)

  await stream.pipeline(
    fs.createReadStream(sourceFilePath),
    fs.createWriteStream(outputFilePath)
  )

  return [sourceFilePath, outputFilePath]
}

export const filesHandler = async (
  inputCommand,
  firstArguments,
  secondArguments
) => {
  if (!firstArguments) {
    message.inputError()
    return
  }

  switch (inputCommand) {
    case Commands.cat: {
      const filePath = pathHandler.getAbsolute(firstArguments)
      const readStream = fs.createReadStream(filePath)
      await readStream.pipe(process.stdout)
      await stream.finished(readStream)
      break
    }

    case Commands.add: {
      const filePath = pathHandler.getAbsolute(firstArguments)
      await fsPromises.appendFile(filePath, '', { flag: 'ax' })
      message.addFile(firstArguments)
      break
    }

    case Commands.rn: {
      if (!secondArguments) {
        message.inputError()
        return
      }

      const inputPath = pathHandler.getAbsolute(firstArguments)
      const outputPath = pathHandler.getAbsolute(secondArguments)
      await fsPromises.rename(inputPath, outputPath)
      message.renameFile(inputPath, secondArguments)
      break
    }

    case Commands.cp: {
      if (!secondArguments) {
        message.inputError()
        return
      }

      const [sourceFilePath, outputFilePath] = await copyFile(
        firstArguments,
        secondArguments
      )
      message.copyFile(sourceFilePath, outputFilePath)
      break
    }

    case Commands.mv: {
      if (!secondArguments) {
        message.inputError()
        return
      }

      const [sourceFilePath, outputFilePath] = await copyFile(
        firstArguments,
        secondArguments
      )
      await fsPromises.rm(sourceFilePath)
      message.moveFile(sourceFilePath, outputFilePath)
      break
    }

    case Commands.rm: {
      const filePath = pathHandler.getAbsolute(firstArguments)
      await fsPromises.rm(filePath)
      message.removeFile(filePath)
      break
    }
  }
}
