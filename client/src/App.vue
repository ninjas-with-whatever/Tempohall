<template>
  <div id="app">
    <DelayCalculator @delayReceived="delayReceived" v-if="step === STEPS.DELAY" />
    <ModeSelector
      :delay="options.delay"
      v-if="step === STEPS.MODE"
      @sendOptions="sendOptions"
      @deploy="deploy"
      @retake="step = STEPS.DELAY"
      />
    <BaseActions />
  </div>
</template>

<script>
import axios from 'axios';
import DelayCalculator from './components/DelayCalculator'
import ModeSelector from './components/ModeSelector'
import BaseActions from './components/BaseActions'

const STEPS = {
  DELAY: 'DELAY',
  MODE: 'MODE'
}

export default {
  name: 'App',
  data() {
    return {
      options: {
        delay: 500,
      },
      step: STEPS.DELAY
    };
  },
  computed: {
    STEPS: () => STEPS
  },
  components: {
    DelayCalculator,
    ModeSelector,
    BaseActions
  },
  methods: {
    delayReceived(delay) {
      this.options.delay = delay;
      this.step = STEPS.MODE;
    },
    sendOptions({ delay, mode }) {
      axios.post('http://raspberrypi.local:3000/engine/options', {
        delay,
        mode
      })
    },
    deploy() {
      axios.post('http://raspberrypi.local:3000/engine/start')
    }
  },
}
</script>

<style>
* {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;  
}
</style>
