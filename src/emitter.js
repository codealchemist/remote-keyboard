const fs = require('fs')
const WebSocket = require('ws')
const chalk = require('chalk')
const loading = require('loading-indicator')
const presets = require('loading-indicator/presets')
const KeyReader = require('./key-reader')

class Emitter {
  constructor (host) {
    this.host = host
    this.loadingTimer
    this.artFile = 'emitter.txt'
  }

  init () {
    this.keyReader = new KeyReader() // Provides exit key bindings.
    this.keyReader.onKey(key => this.onKey(key))
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

    this.ws.on('close', () => {
      this.log(chalk.red('Disconnected.'))
    })
  }

  onKey (key) {
    this.log(`KEY: ${chalk.white(key.sequence)}`)
    const message = JSON.stringify(key)
    this.ws.send(message)
  }

  log (message) {
    process.stdout.write(' '.repeat(80))
    process.stdout.write(`\r${message}\r`)
  }
}

module.exports = Emitter
