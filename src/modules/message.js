import { Colors, getColorStr } from './color.js'

export const message = {
  goodbye(EOL, username) {
    console.log(
      `${EOL}Thank you for using File Manager, ${
        username ? `${getColorStr(username, Colors.fgBlue)}, ` : ''
      }goodbye!`
    )
  },

  welcome(username) {
    console.log(
      `Welcome to the File Manager${
        username ? `, ${getColorStr(username, Colors.fgBlue)}` : ''
      }!`
    )
  },

  hotkeys() {
    console.log('Press control-D, ^-D, Ctrl-D to exit')
  },

  directory(cwd) {
    return `You are currently in ${getColorStr(cwd, Colors.fgBlue)} > `
  },

  inputError() {
    console.log(getColorStr('Invalid input', Colors.fgRed))
  },

  operationError() {
    console.log(getColorStr('Operation failed', Colors.fgRed))
  },

  amountOfCpus(amount) {
    console.log(
      `Overall amount of CPUS: ${getColorStr(amount, Colors.fgGreen)}`
    )
  },

  hashCalculation(hash, pathToFile, OEL) {
    console.log(
      `Hash for ${getColorStr(pathToFile, Colors.fgBlue)}:${OEL}${hash}`
    )
  },

  rootDirectory() {
    console.log(
      `You are in ${getColorStr('the root directory', Colors.fgBlue)}`
    )
  },

  addFile(fileName) {
    console.log(`File ${getColorStr(fileName, Colors.fgBlue)} is created`)
  },

  renameFile(pathFile, filename) {
    console.log(
      `File ${getColorStr(pathFile, Colors.fgBlue)} was renamed ${getColorStr(
        filename,
        Colors.fgBlue
      )}`
    )
  },

  copyFile(sourceFile, outputFile) {
    console.log(
      `File ${getColorStr(
        sourceFile,
        Colors.fgBlue
      )} was copied as ${getColorStr(outputFile, Colors.fgBlue)}`
    )
  },

  moveFile(sourceFile, outputFile) {
    console.log(
      `File ${getColorStr(
        sourceFile,
        Colors.fgBlue
      )} was moved as ${getColorStr(outputFile, Colors.fgBlue)}`
    )
  },

  removeFile(pathFile) {
    console.log(`File ${getColorStr(pathFile, Colors.fgBlue)} is deleted`)
  },

  compressFile(sourcePath, outputPath) {
    console.log(
      `File ${getColorStr(sourcePath, Colors.fgBlue)} compress to ${getColorStr(
        outputPath,
        Colors.fgBlue
      )}`
    )
  },

  decompressFile(sourcePath, outputPath) {
    console.log(
      `File ${getColorStr(
        sourcePath,
        Colors.fgBlue
      )} decompress to ${getColorStr(outputPath, Colors.fgBlue)}`
    )
  },
}
