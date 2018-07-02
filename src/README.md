# remote-keyboard

Send keyboard events from senders to receivers.

## Install

`npm i remote-keyboard`

## Usage

`HOST=https://your-websocket-forwarder remote-keyboard [ sender | receiver ]`

Defaults to `receiver` mode.

For *remote-keyboard* to work over the Internet you need a server that forwards
keyboard events from senders to receivers.

Receivers will get keyboard events sent from senders.

It will be like physically using the keyboard on the receivers's machine.
