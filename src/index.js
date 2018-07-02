#!/usr/bin/env node
const cursor = require('cli-cursor')
const clear = require('clear')
const printii = require('printii')(__dirname)
const Receiver = require('./receiver')
const Emitter = require('./emitter')
const args = process.argv.slice(2)

const host = process.env.HOST || 'ws://localhost:3333'

clear()
printii()
cursor.hide()

if (args[0] === 'emitter') {
  const emitter = new Emitter(host)
  emitter.connect()
} else {
  const receiver = new Receiver(host)
  receiver.connect()
}
