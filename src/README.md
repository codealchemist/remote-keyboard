# remote-keyboard

Send keyboard events from senders to receivers.

## Install

`npm i remote-keyboard`

## Usage

`HOST=https://your-websocket-forwarder:port remote-keyboard [ emitter | receiver ]`

Defaults to `receiver` mode.

Receivers will get keyboard events sent from emitters.

Emitters will send their keyboard events to receivers.

For *remote-keyboard* to work over the Internet you need a websockets server that forwards
messages to all connected clients.

To quickly get started locally you can try **websocket-broadcast**,
which will broadcast every message to all connected clients:

On the receiver machine:

```
npx websocket-broadcast
remote-keyboard
```

On the emitter machine:

```
npx websocket-broadcast
remote-keyboard emitter
```

## Limitations

It won't send EVERY key combination or special keys.

For example, these keys are not currently supported: 

`@#():`

There's already a PR on **RobotJS** to support unicode chars (this is awesome!):

https://github.com/octalmage/robotjs/pull/357

Once this is merged I can update **remote-keyboard** to extend key support :)
