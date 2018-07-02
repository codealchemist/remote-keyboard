const WebSocket = require('ws')
const chalk = require('chalk')
const KeyReader = require('./key-reader')

class Emitter {
  constructor (host) {
    console.log('MODE: EMITTER')
    this.keyReader = new KeyReader() // Provides exit key bindings.
    this.keyReader.onKey(key => this.onKey(key))
    this.host = host
  }

  connect () {
    this.ws = new WebSocket(this.host)
    this.ws.on('open', () => {
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
