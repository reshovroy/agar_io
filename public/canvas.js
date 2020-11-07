function initCanvas() {
  draw()

}

function drawCanvas() {


  context.setTransform(1, 0, 0, 1, 0, 0)
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.translate(canvas.width / 2 - player.locX, canvas.height / 2 - player.locY)

  drawOrbs()
  drawPlayers()

  //cb()
  //requestAnimationFrame(draw)
}


function drawPlayers() {
  let my_player = player
  players.forEach((player) => {

    if (player.playerData.name === my_player.name) {

      my_player.locX = player.playerData.locX
      my_player.locY = player.playerData.locY
    }
    context.beginPath()
    context.arc(player.playerData.locX, player.playerData.locY, player.playerData.radius, 0, Math.PI * 2)
    context.fillStyle = player.playerData.color;
    context.fill()

    context.lineWidth = 3;
    context.strokeStyle = "rgba(0,0,255)"
    context.stroke();
  })

}

function drawOrbs() {

  orbs.forEach((orb) => {
    context.beginPath()
    context.arc(orb.posX, orb.posY, orb.radius, 0, Math.PI * 2)
    context.fillStyle = orb.color
    context.fill()
  })

}

function handleMouseMove(e) {
  const mousePosition = {
    x: e.clientX,
    y: e.clientY
  }

  const angleDeg = Math.atan2(mousePosition.y - (canvas.height / 2), mousePosition.x - (canvas.width / 2))

  let xVector, yVector

  player.xVector = (Math.cos(angleDeg)).toFixed(2)
  player.yVector = (Math.sin(angleDeg)).toFixed(2)
  //console.log(xV, yV)

  //console.log(player.locX, player.locY)

}