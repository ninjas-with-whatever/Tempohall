<template>
  <div>
    <Bpm :delay.sync="delay" />
    <Clicker @delay="delayReceived" :preview.sync="preview" @beat="onBeat" />
    <Confirm v-if="preview && !confirmOnNextBeat" @confirm="confirm" @retake="retake" />
  </div>
</template>

<script>
import Bpm from './Bpm.vue'
import Clicker from './Clicker.vue'
import Confirm from './Confirm.vue'

export default {
  name: 'DelayCalculator',
  data() {
    return {
      delay: 0,
      preview: false,
      confirmOnNextBeat: false,
    };
  },
  components: {
    Clicker,
    Confirm,
    Bpm
  },
  methods: {
    delayReceived(delay) {
      this.delay = delay;
    },
    retake() {
      this.preview = false;
    },
    confirm() {
      this.confirmOnNextBeat = true;
    },
    onBeat() {
      if (this.confirmOnNextBeat) {
        this.confirmOnNextBeat = false;
        this.$emit('delayReceived', this.delay)
      }
    }
  },
}
</script>
