const fs = require('fs')
const WebSocket = require('ws')
const robot = require('robotjs')
const chalk = require('chalk')
const loading = require('loading-indicator')
const presets = require('loading-indicator/presets')
const KeyReader = require('./key-reader')

class Receiver {
  constructor (host) {
    this.host = host
    this.loadingTimer
    this.artFile = 'receiver.txt'
  }

  init () {
    this.keyReader = new KeyReader() // Provides exit key bindings.
    return this
  }

  printArt () {
    const file = `${__dirname}/${this.artFile}`
    const art = fs.readFileSync(file, 'utf8')
    console.log(chalk.white(art))
    return this
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
      let modifier = []
      if (key.ctrl) modifier.push('control')
      if (key.shift) modifier.push('shift')

      robot.keyTap(key.sequence, modifier)
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
