<template>
  <div class="confirm">
    <div class="confirm__retake" @click="$emit('retake')">Retake</div>
    <div class="confirm__confirm" @click="$emit('confirm')">Confirm</div>
  </div>
</template>

<script>
export default {
  name: 'Confirm',
};
</script>

<style>
.confirm {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  display: flex;
}
.confirm > div {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 30px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.confirm__retake {
  background: red;
}
.confirm__confirm {
  background: green;
}
</style>

