<template>
  <div class="led-box" :class="{
    'led-box--on': isOn
  }">
    
  </div>
</template>

<script>
export default {
  name: 'LEDBox',
  props: {
    isOn: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style>
.led-box {
  flex-grow: 1;
  aspect-ratio: 1;
  margin: 1rem;
  background: #111;
}

.led-box--on {
  box-shadow: 0 0 20px rgb(255, 196, 0);
}
</style>
