export const Colors = {
  reset: '\x1b[0m',
  fgRed: '\x1b[31m',
  fgBlue: '\x1b[34m',
}

export const getColorStr = (str, color = Colors.reset) =>
  `${color}${str}${Colors.reset}`
