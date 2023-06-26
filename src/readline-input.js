import readline from 'node:readline/promises'
import {
  nwdHandler,
  filesHandler,
  osHandler,
  hashHandler,
} from './commands/index.js'
import { parser } from './modules/parser.js'
import { message } from './modules/message.js'
import { ExitCode, Commands } from './constants.js'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

export const readlineInput = async () => {
  const input = await rl.question(message.directory(process.cwd()))

  const [inputCommand, firstArguments, secondArguments] = parser(input)

  try {
    switch (inputCommand) {
      case Commands.exit:
        process.exit(ExitCode.success)

      case Commands.up:
      case Commands.cd:
      case Commands.ls:
        await nwdHandler(inputCommand, firstArguments)
        break

      case Commands.cat:
      case Commands.add:
      case Commands.rn:
      case Commands.cp:
      case Commands.mv:
      case Commands.rm:
        await filesHandler(inputCommand, firstArguments, secondArguments)
        break

      case Commands.os:
        osHandler(firstArguments)
        break

      case Commands.hash:
        await hashHandler(firstArguments)
        break

      default:
        message.inputError()
        break
    }
  } catch {
    message.operationError()
  }

  readlineInput()
}
