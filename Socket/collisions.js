const Orb = require('./classes/Orbs')

function checkForOrbCollisions(player, orbs, settings) {
  const { playerData, playerConfig } = player;
  return new Promise((resolve, reject) => {

    orbs.forEach((orb, index) => {
      //AABB test
      if (playerData.locX + playerData.radius + orb.radius > orb.posX &&
        playerData.locX < orb.radius + orb.posX + playerData.radius &&
        playerData.locY + playerData.radius + orb.radius > orb.posY &&
        playerData.locY < orb.radius + orb.posY + playerData.radius
      ) {

        //Pythogoras Test
        let distance = Math.sqrt((playerData.locX - orb.posX) * (playerData.locX - orb.posX) + (playerData.locY - orb.posY) * (playerData.locY - orb.posY))
        if (distance < (playerData.radius + orb.radius)) {
          //confirmed collision
          //console.log("collision occured")
          playerData.score += 1;
          playerData.orbsAbsorbed += 1;
          playerData.radius += 0.25;

          if (playerConfig.zoom > 1)
            playerConfig.zoom -= 0.001;

          if (playerConfig.speed > 0.005)
            playerConfig.speed -= 0.005;

          orbs.splice(index, 1, new Orb(settings))

          resolve(index);
        }
      }
    })

    reject()

  })
}

function checkForPlayerCollision(myplayer, players) {
  const { playerData, playerConfig } = myplayer;
  return new Promise((resolve, reject) => {

    players.forEach((curplayer, index) => {
      if (myplayer.socketId !== curplayer.socketId) {
        const { playerData: pData, playerConfig: pConfig } = curplayer;

        if (playerData.locX + playerData.radius + pData.radius > pData.locX &&
          playerData.locX < playerData.radius + pData.radius + pData.locX &&
          playerData.locY + playerData.radius + pData.radius > pData.locY &&
          playerData.locY < playerData.radius + pData.radius + pData.locY
        ) {

          const distance = Math.sqrt((playerData.locX - pData.locX) * (playerData.locX - pData.locX) - (playerData.locY - pData.locY) * (playerData.locY - pData.locY));
          if (distance < (playerData.radius + pData.radius)) {

            //there is a collision
            if (playerData.radius > pData.radius) {
              let collisionData = updateScores(playerData, pData);

              if (playerConfig.zoom > 1)
                playerConfig.zoom -= (pData.radius * 0.25) * 0.001

              players.splice(index, 1);
              resolve(collisionData)
            }
          }
        }

      }

    })
    reject();
  })
}

function checkForPlayerToPlayerCollision(players) {

  return new Promise((resolve, reject) => {

    for (let i = 0; i < players.length - 1; i++) {
      const { playerData: p1Data, playerConfig: p1Config } = players[i]
      for (let j = i + 1; j < players.length; j++) {
        const { playerData: p2Data, playerConfig: p2Config } = players[j]

        let distance = Math.sqrt((p1Data.locX - p2Data.locX) * (p1Data.locX - p2Data.locX) + (p1Data.locY - p2Data.locY) * (p1Data.locY - p2Data.locY));

        if (distance < (p1Data.radius + p2Data.radius)) {
          console.log("distance: ", distance, "r1: ", p1Data.radius, "r2: ", p2Data.radius)
          let collisionData = null
          if (p1Data.radius > p2Data.radius) {
            collisionData = updateScores(p1Data, p2Data)
            if (p1Config.zoom > 1)
              p1Config.zoom -= (p2Data.radius * 0.25) * 0.001

            players.splice(j, 1)
            resolve(collisionData)
          }
          else if (p1Data.radius < p2Data.radius) {
            collisionData = updateScores(p2Data, p1Data)

            if (p2Config.zoom > 1)
              p2Config.zoom -= (p1Data.radius * 0.25) * 0.001

            players.splice(i, 1)
            resolve(collisionData)
          }


        }
      }
    }
    reject()
  })
}

function updateScores(killer, killed) {
  killer.score += (killed.score + 5);
  killer.playersAbsorbed += 1;
  killed.alive = false;
  killer.radius += (killed.radius * 0.25)
  return {
    died: killed,
    killedBy: killer
  }
}

module.exports = { checkForOrbCollisions, checkForPlayerCollision, checkForPlayerToPlayerCollision }