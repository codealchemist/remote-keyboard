const WebSocket = require('ws')
const robot = require('robotjs')
const chalk = require('chalk')
const loading = require('loading-indicator')
const presets = require('loading-indicator/presets')
const KeyReader = require('./key-reader')

class Receiver {
  constructor (host) {
    console.log('MODE: RECEIVER')
    this.keyReader = new KeyReader() // Provides exit key bindings.
    this.host = host
    this.loadingTimer
  }

  connect () {
    this.loadingTimer = loading.start(
      `Connecting to ${chalk.blue(this.host)}`,
      { frames: presets.dots }
    )
    this.ws = new WebSocket(this.host)
    this.ws.on('open', () => {
      loading.stop(this.loadingTimer)
      this.log(`Connected to ${chalk.blue(this.host)}`)
    })

    this.ws.on('message', (message) => {
      this.log(message)
      const key = JSON.parse(message)
      if (!key.name || !key.sequence) return
      let modifier
      if (key.ctrl) modifier = 'control'
      if (key.shift) modifier = 'shift'

      robot.keyTap(key.name)
    })

    this.ws.on('close', () => {
      this.log(chalk.red('Disconnected.'))
    })
  }

  onRemoteKey (key) {
    this.log(`KEY: ${chalk.white(key)}`)
  }

  log (message) {
    process.stdout.write(' '.repeat(80))
    process.stdout.write(`\r${message}\r`)
  }
}

module.exports = Receiver
