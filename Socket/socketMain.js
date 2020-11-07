
const io = require('../server').io;
const Orb = require('./classes/Orbs')
const PlayerData = require('./classes/PlayerData')
const PlayerConfig = require('./classes/PlayerConfig')
const Player = require('./classes/Player')
const { checkForOrbCollisions, checkForPlayerCollision, checkForPlayerToPlayerCollision } = require('./collisions')

const settings = {
  defaultOrbs: 100,
  defaultSize: 10,
  defaultSpeed: 5,
  defaultZoom: 3,
  worldHeight: 800,
  worldWidth: 800,
  fps: 30
}
let orbs = []
let players = []


initGame();
setInterval(() => {
  io.to("game").emit("tick", {
    players
  })
  io.to("game").emit('updateLeaderBoard', getLeaderBoard())

  checkForPlayerToPlayerCollision(players)
    .then((data) => {
      console.log("collision", data)
      io.to("game").emit('playerDeath', data);
    })
    .catch(() => { })

  // players.forEach((player) => {
  //   io.to(player.socketId).emit("updateLocation", {
  //     locX: player.playerData.locX,
  //     locY: player.playerData.locY
  //   })
  // })

}, 33)


io.on("connection", (socket) => {
  console.log(socket.id)

  socket.join('game')

  socket.on('init', (data) => {
    console.log(data)
    let playerConfig = new PlayerConfig(settings)
    let playerData = new PlayerData(data.playerName, settings)
    let player = new Player(socket.id, playerData, playerConfig, settings)

    socket.emit('initReturn', { orbs, fps: settings.fps })

    players.push(player);

    // function startTick() {
    //   setInterval(() => {
    //     socket.emit("updateLocation", {
    //       locX: player.playerData.locX,
    //       locY: player.playerData.locY
    //     })

    //   }, (1000 / settings.fps));
    // }

    //startTick()

    socket.on('tock', (data) => {
      player.updatePos(data.xVector, data.yVector);

      checkForOrbCollisions(player, orbs, settings)
        .then((data) => {

          io.to("game").emit('orbUpdate', {
            orbIndex: data,
            newOrb: orbs[data]
          })



        })
        .catch(() => { })

      // checkForPlayerCollision(player, players)
      //   .then((data) => {
      //     console.log(data)
      //     io.to("game").emit('updateLeaderBoard', getLeaderBoard())
      //     io.to("game").emit('playerDeath', data);
      //   })
      //   .catch(() => { })
    })

    socket.on('disconnect', (data) => {
      if (player) {
        players.forEach((curplayer, i) => {
          if (player.socketId === curplayer.socketId) {
            players.splice(i, 1);

            io.emit('updateLeaderBoard', getLeaderBoard())
            return;
          }
        })
      }
    })

  })

})

function initGame() {

  for (let i = 0; i < settings.defaultOrbs; i++) {
    orbs.push(new Orb(settings))
  }
}

function getLeaderBoard() {
  players.sort((a, b) => b.playerData.score - a.playerData.score)

  let leaderBoard = players.map((player) => ({
    name: player.playerData.name,
    score: player.playerData.score
  }))

  return leaderBoard;
}

module.exports = io;