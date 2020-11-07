
let socket = io.connect("http://localhost:5000")

const debounce = (func, delay) => {
  let inDebounce

  return function () {
    const context = this
    const args = arguments
    clearTimeout(inDebounce)
    inDebounce = setTimeout(() => func.apply(context, args), delay)
  }
}

function initServerData() {
  socket.emit('init', { playerName: player.name })

  socket.once('initReturn', (data) => {
    orbs = data.orbs;
    let fps = data.fps;

    canvas.addEventListener('mousemove', handleMouseMove)
    setInterval(() => {
      updateServerLocation()

    }, fps)
  })

  socket.on('tick', (data) => {

    drawCanvas();
    players = data.players
    //console.log("players: ", data.players)

  })


  // socket.on('updateLocation', (data) => {
  //   player.locX = data.locX;
  //   player.locY = data.locY;

  // })

  socket.on('orbUpdate', (data) => {
    const { orbIndex, newOrb } = data;
    orbs.splice(orbIndex, 1, newOrb);
  })

  socket.on('updateLeaderBoard', (data) => updateLeaderBoard(data))

  socket.on('playerDeath', (data) => notifyDeath(data))

  function updateServerLocation() {
    socket.emit('tock', {
      xVector: player.xVector || 0,
      yVector: player.yVector || 0
    })
  }

  function updateLeaderBoard(players) {
    let $leaderBoard = $('.leader-board');
    $leaderBoard.empty()
    players.forEach((player) => {

      $leaderBoard.append(`<li class="leaderboard-player">${player.name} = ${player.score}</li>`)
    })
  }

  function notifyDeath({ died, killedBy }) {
    console.log("hello die")
    let $gameMessage = $('#game-message')
    //console.log($gameMessage.text())
    $gameMessage.text(`${died.name} was killed by ${killedBy.name}`);
    //console.log($gameMessage)
    $gameMessage.css("opacity", 1)
    $gameMessage.show()
    $gameMessage.fadeOut(5000);
  }

}

