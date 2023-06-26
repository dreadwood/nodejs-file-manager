import fs from 'node:fs'
import zlib from 'node:zlib'
import stream from 'node:stream/promises'
import { Commands } from '../constants.js'
import { message } from '../modules/message.js'
import { pathHandler } from '../modules/path-handler.js'

export const zipHandler = async (
  inputCommand,
  firstArguments,
  secondArguments
) => {
  if (!firstArguments || !secondArguments) {
    message.inputError()
    return
  }

  const sourcePath = pathHandler.getAbsolute(firstArguments)
  const outputPath = pathHandler.getAbsolute(secondArguments)

  switch (inputCommand) {
    case Commands.compress:
      await stream.pipeline(
        fs.createReadStream(sourcePath),
        zlib.createBrotliCompress(),
        fs.createWriteStream(outputPath)
      )
      message.compressFile(sourcePath, outputPath)
      break

    case Commands.decompress:
      await stream.pipeline(
        fs.createReadStream(sourcePath),
        zlib.createBrotliDecompress(),
        fs.createWriteStream(outputPath)
      )
      message.decompressFile(sourcePath, outputPath)
      break
  }
}
