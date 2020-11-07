const express = require('express')
const app = express()
const socketio = require('socket.io');

const port = process.env.port || 5000
app.use(express.static(__dirname + "/public"))

const expressServer = app.listen(port, () => console.log(`listening on port: ${port}`))

const io = socketio(expressServer);

module.exports = {
  app,
  io
}