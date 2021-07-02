const gpio = require('onoff').Gpio;
const simulator = require('./simulator')

class PowerController {
  constructor() {
    this.left = false;
    this.right = false;
    this.relays = {
      'left': new gpio(22, 'out'),
      'right': new gpio(23, 'out'),
    }
    simulator.onLeftChanged = to => {
      if (to) this.leftOn();
      else this.leftOff();
    }
    simulator.onRightChanged = to => {
      if (to) this.rightOn();
      else this.rightOff();
    }
  }

  leftOff() {
    this.left = false;
    this.relays.left.writeSync(0);
  }

  leftOn() {
    this.left = true;
    this.relays.left.writeSync(1);
  }

  leftToggle() {
    if (!this.left) this.leftOn();
    else this.leftOff();
  }

  rightOff() {
    this.right = false;
    this.relays.right.writeSync(0);
  }

  rightOn() {
    this.right = true;
    this.relays.right.writeSync(1);
  }

  rightToggle() {
    if (!this.right) this.rightOn();
    else this.rightOff();
  }

  start(delay, mode) {
    simulator.start(delay, mode)
  }
};

module.exports = new PowerController();
