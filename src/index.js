import process from 'node:process'
import os from 'node:os'
import { getUsername } from './modules/username.js'
import { message } from './modules/message.js'
import { readlineInput } from './readline-input.js'

const username = getUsername()

process.chdir(os.homedir())
process.on('exit', () => message.goodbye(os.EOL, username))
process.on('SIGINT', process.exit)

message.welcome(username)
message.hotkeys()

readlineInput()
