<template>
  <div class="clicker" :class="{
    'clicker--clicked': clicked,
    'clicker--preview': preview,
    'clicker--beat': beat
  }" ref="clicker" />
</template>

<script>
const MAX_DELAY = 1000;

export default {
  name: 'Clicker',
  props: {
    preview: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      clicked: false,
      beat: false,
      beatInterval: null,
      lastClickTimestamp: 0,
      delayBetweenClicks: [],
    };
  },
  mounted() {
    const clicker = this.$refs.clicker;
    clicker.addEventListener('touchstart', this.click);
  },
  watch: {
    preview(curr, prev) {
      if (prev && !curr) {
        this.delayBetweenClicks = [];
        clearInterval(this.beatInterval);
      }
    },
  },
  methods: {
    animateClick() {
      this.clicked = true;
      setTimeout(() => {
        this.clicked = false;
      }, 50)
    },
    click() {
      if (this.preview) return;

      this.animateClick();
      const now = Date.now();
      const delay = now - this.lastClickTimestamp;
      this.lastClickTimestamp = now;

      if (delay > MAX_DELAY) {
        this.delayBetweenClicks = []
      } else {
        this.delayBetweenClicks.push(delay);
        if (this.delayBetweenClicks.length > 5) {
          this.calculateDelay();
        }
      }
    },
    calculateDelay() {
      this.$emit('update:preview', true)
      const delay = this.delayBetweenClicks.reduce((a, b) => a + b) / this.delayBetweenClicks.length;
      this.$emit('delay', delay)

      this.beatInterval = setInterval(() => {
        this.$emit('beat')
        this.beat = true;

        setTimeout(() => {
          this.beat = false;
        }, 50)
      }, delay)
    }
  },
};
</script>

<style>
.clicker {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  background: #777;
  border-radius: 50%;
}
.clicker--clicked {
  background: #000;
}
.clicker--preview {
  background: green;
}
.clicker--beat {
  background: yellow;
}
</style>
