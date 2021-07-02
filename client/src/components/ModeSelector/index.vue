<template>
  <div class="mode-selector">
    <div class="mode-selector__led-wrapper">
      <LEDBox :is-on="left" />
      <LEDBox :is-on="right" />
    </div>
    <div class="mode-selector__speed">
      <div :class="{ 'mode-selector__button-selected': speed === 1 }" @click="speed = 1">x1</div>
      <div :class="{ 'mode-selector__button-selected': speed === 2 }" @click="speed = 2">x2</div>
      <div :class="{ 'mode-selector__button-selected': speed === 4 }" @click="speed = 4">x4</div>
    </div>
    <div class="mode-selector__button-wrapper">
      <input class="mode-selector__slider" ref="resync" v-model="offset" type="range" min="0" max="100" />
      <div @click="resync">Resync</div>
    </div>
    <div class="mode-selector__button-wrapper">
      <div @click="$emit('retake')">Retake</div>
      <div class="deploy" @click="sendOptions">Deploy</div>
    </div>
  </div>
</template>

<script>
import LEDBox from './LEDBox.vue'
import simulator from '../../simulator'
import axios from 'axios'

const selectedMode = {
  left: [
    [0.9, 0.1, 0.9, 0.1],
    [0.1, 0.1, 0.1, 0.1],
  ],
  right: [
    [0.5, 0.2, 0.2, 0.9],
    [0.5, 1, 1, 0.1],
  ]
};

export default {
  name: 'ModeSelector',
  data() {
    return {
      offset: 0,
      left: false,
      right: false,
      speed: 1,
      mode: selectedMode,
      hasStarted: false,
      restartOnNextBeat: false,
      sendOptionsOnNextBeat: false,
    };
  },
  mounted() {
    simulator.onBeat = (iterator) => {
      if (iterator % this.speed === 0) {
        this.beat();
      }
    }
    simulator.onLeftChanged = (left) => this.left = left
    simulator.onRightChanged = (right) => this.right = right

    this.$refs.resync.addEventListener(() => {

    });
  },
  watch: {
    calculatedDelay: {
      handler() {
        if (!this.hasStarted) {
          simulator.start(this.calculatedDelay, this.mode)
        } else {
          this.restartOnNextBeat = true;
        }
      },
      immediate: true,
    },
    mode() {
      this.restartOnNextBeat = true;
    }
  },
  computed: {
    calculatedDelay() {
      return Math.floor(this.delay / this.speed)
    }
  },
  props: {
    delay: {
      type: Number,
      required: true,
    },
  },
  components: {
    LEDBox
  },
  methods: {
    beat() {
      if (this.restartOnNextBeat) {
        simulator.start(this.calculatedDelay, this.mode)
        this.restartOnNextBeat = false;
      }
      if (this.sendOptionsOnNextBeat) {
        this.$emit('sendOptions', {
          delay: Math.floor(this.calculatedDelay),
          mode: this.mode
        })
        this.sendOptionsOnNextBeat = false;
        this.sendDeployOnNextBeat = true;
      }
      else if (this.sendDeployOnNextBeat) {
        this.$emit('deploy')
        this.sendDeployOnNextBeat = false;
      }
    },
    sendOptions() {
      this.sendOptionsOnNextBeat = true;
    },
    resync() {
      axios.post('http://raspberrypi.local:3000/engine/offset', {
        offset: this.offset
      })
    }
  },
};
</script>

<style>
.mode-selector__speed {
  display: flex;
  margin: 0.9rem;
  margin-top: 3rem;
}
.mode-selector__speed > div {
  flex-grow: 1;
  margin: 0.1rem;
  background: #111;
  padding: 1rem;
  text-align: center;
  color: #888;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.5rem;
}
.mode-selector__speed > div.mode-selector__button-selected {
  background: #1e1e1e;
}
.mode-selector__led-wrapper {
  display: flex;
}
.mode-selector__button-wrapper {
  margin: 0.8rem;
  display: flex;
}
.mode-selector__button-wrapper > div {
  flex-grow: 1;
  margin: 0.2rem;
  padding: 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #888;
  background: #111;
  text-align: center;
}
.mode-selector__slider {
  flex-grow: 1;
  margin-right: 1rem;
}
.mode-selector__button-wrapper > div.deploy {
  flex-grow: 5;
}
</style>
