import fs from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'
import { createHash } from 'node:crypto'
import { message } from '../modules/message.js'

export const hashHandler = async firstArguments => {
  if (!firstArguments) {
    message.inputError()
    return
  }

  const filePath = path.join(process.cwd(), firstArguments)
  const contents = await fs.readFile(filePath, { encoding: 'utf8' })

  const hash = createHash('sha256').update(contents).digest('hex')

  message.hashCalculation(hash, firstArguments, os.EOL)
}
