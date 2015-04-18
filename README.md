A project I played around with in 2014. The goal was simple: Control things in a web app using my hardware MIDI controller with faders and knobs. I tried two approaches:
* midibridge lib that uses a java module to connect to the hardware
* a node module that sends midi events to the browser via WebSockets

Node modules you might wanna install to get the last approach working:
* connect
* express
* http-server
* lsmidi
* midi
* midi.io
* socket.io
* sockjs

One approach I haven't tried yet:
Web MIDI API
