import os from 'node:os'
import { message } from '../modules/message.js'

export const osHandler = firstArguments => {
  switch (firstArguments) {
    case '--EOL':
      console.log(JSON.stringify(os.EOL))
      break

    case '--cpus':
      const info = os.cpus().map(cpu => ({
        Model: cpu.model,
        'Clock rate': `${(cpu.speed / 1000).toFixed(2)}GHz`,
      }))

      console.table(info)
      message.amountOfCpus(info.length)
      break

    case '--homedir':
      console.log(os.userInfo().homedir)
      break

    case '--username':
      console.log(os.userInfo().username)
      break

    case '--architecture':
      console.log(os.arch())
      break

    default:
      message.inputError()
  }
}
