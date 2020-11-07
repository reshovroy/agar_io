
class PlayerData {
  constructor(playerName, settings) {
    this.name = playerName
    this.locX = Math.floor(Math.random() * settings.worldWidth);
    this.locY = Math.floor(Math.random() * settings.worldHeight);
    this.radius = settings.defaultSize;
    this.color = this.getRandomColor()
    this.score = 0;
    this.orbsAbsorbed = 0;
    this.playersAbsorbed = 0;
    this.alive = false;
  }
  getRandomColor() {
    let r = Math.floor(Math.random() * 240 + 50)
    let g = Math.floor(Math.random() * 240 + 50)
    let b = Math.floor(Math.random() * 240 + 50)
    return `rgb(${r},${g},${b})`
  }
}

module.exports = PlayerData;