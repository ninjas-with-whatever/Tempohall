
class Simulator {
  constructor() {
    this.iterator = 0;
    this.line = 0;

    this.right = false;
    this.left = false;

    this.offset = 0;

    this.onRightChanged = () => { }
    this.onLeftChanged = () => { }
    this.onBeat = () => { }

    this.delayInterval = null;

    this.mode = {
      left: [],
      right: []
    };
    this.delay = 0;

    this.start(2000);
  }

  changeRight(to) {
    this.right = to;
    this.onRightChanged(to)
  }

  changeLeft(to) {
    this.left = to;
    this.onLeftChanged(to)
  }

  loop() {
    this.iterator++;
    if (this.iterator === 4) {
      this.iterator = 0;
      this.line++;
      if (this.line === this.mode.left.length) {
        this.line = 0;
      }
    }
    const leftRate = this.mode.left[this.line] && this.mode.left[this.line][this.iterator];
    const timeLeftIsOn = leftRate * this.delay;
    if (timeLeftIsOn > 0) {
      this.changeLeft(true);
      if (leftRate !== 1) setTimeout(() => {
        this.changeLeft(false);
      }, timeLeftIsOn)
    }
    const rightRate = this.mode.right[this.line] && this.mode.right[this.line][this.iterator];
    const timeRightOn = rightRate * this.delay;
    if (timeRightOn > 0) {
      this.changeRight(true);
      if (rightRate !== 1) setTimeout(() => {
        this.changeRight(false);
      }, timeRightOn)
    }
    this.onBeat(this.iterator)
  }

  off() {
    clearInterval(this.delayInterval)
  }

  start(delay = 100, mode = { left: [], right: [] }) {
    this.iterator = 0;
    this.delay = delay;
    this.mode = mode;

    clearInterval(this.delayInterval)
    this.delayInterval = setInterval(() => {
      setTimeout(() => {
        this.loop()
      }, this.offset);
    }, this.delay)
  
  }
}

module.exports = new Simulator()