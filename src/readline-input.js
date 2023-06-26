import readline from 'node:readline/promises'
import { osHandler, hashHandler } from './commands/index.js'
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
