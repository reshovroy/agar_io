
class PlayerConfig {
  constructor(settings) {
    this.xVector = 0;
    this.yVector = 0;
    this.speed = settings.defaultSpeed;
    this.zoom = settings.defaultZoom;
  }
  updateDirection(xVector, yVector) {
    this.xVector = xVector;
    this.yVector = yVector;
  }
}

module.exports = PlayerConfig;