
class Orb {
  constructor(settings) {
    this.color = this.getRandomColor()
    this.posX = Math.floor(Math.random() * settings.worldWidth)
    this.posY = Math.floor(Math.random() * settings.worldHeight)
    this.radius = 5
  }
  getRandomColor() {
    let r = Math.floor(Math.random() * 240 + 50)
    let g = Math.floor(Math.random() * 240 + 50)
    let b = Math.floor(Math.random() * 240 + 50)
    return `rgb(${r},${g},${b})`
  }
}

module.exports = Orb