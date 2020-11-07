
class Player {
  constructor(socketId, playerData, playerConfig, settings) {
    this.socketId = socketId;
    this.playerData = playerData;
    this.playerConfig = playerConfig;
    this.settings = settings
  }

  updatePos(xVector, yVector) {
    const { worldWidth, worldHeight } = this.settings;
    this.playerConfig.updateDirection(xVector, yVector);
    this.playerData.locX += this.playerConfig.speed * xVector;
    this.playerData.locY += this.playerConfig.speed * yVector;

    if (this.playerData.locX > worldWidth)
      this.playerData.locX = worldWidth;
    else if (this.playerData.locX < 5)
      this.playerData.locX = 5;

    if (this.playerData.locY > worldHeight)
      this.playerData.locY = worldHeight;
    else if (this.playerData.locY < 5)
      this.playerData.locY = 5;
  }
}

module.exports = Player;
