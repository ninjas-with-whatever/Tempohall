<template>
  <div class="bpm">
    <input v-if="bpm || manualBPM" ref="bpm" class="bpm__input" type="text" v-model="bpm">
    <div class="bpm__set" @click="changeToManual" v-else>
      Set BPM directly
    </div>
  </div>
</template>

<script>
export default {
  name: 'Bpm',
  props: {
    delay: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      bpm: '',
      manualBPM: false
    };
  },
  watch: {
    bpm: {
      handler() {
        const delay = 60 * 1000 / this.bpm;
        this.$emit('update:delay', delay)
      },
      immediate: true,
    },
  },
  methods: {
    changeToManual() {
      this.manualBPM = true;
      this.$nextTick(() => {
        this.$refs.bpm.focus();
      })
    }
  },
};
</script>

<style>
.bpm {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
}
.bpm__input {
  color: white;
  background: transparent;
  font-size: 3rem;
  border: 0;
  width: 50vw;
  text-align: center;
}
.bpm__set {
  color: wheat;
}
</style>
