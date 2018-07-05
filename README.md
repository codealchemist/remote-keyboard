# remote-keyboard

Sends keyboard events between machines.

## How does it work?

**remote-keyboard** can be started as **emitter** or **receiver**.

In both modes it needs to connect to a websocket server, which is not provided by **remote-keyboard**.

All communication between emitters and receivers will be handled by the websocket server.

An easy way to get going it to give it a try to [websocket-broadcast](https://github.com/codealchemist/websocket-broadcast).

An **emitter** instance will send its keyboard events to all connected **receiver** instances.

A **receiver** will receive the remote key events and reproduce them back.

You can connect many **emitters** and many **receivers** ;)

## Install

`npm i remote-keyboard`

## Run without installing

Receiver mode:

`npx remote-keyboard`

Emitter mode:

`npx remote-keyboard emitter`

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
