<script lang="ts">
export default {
  name: "bgc",
};
</script>
<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";
// import CLOUDS from "vanta/src/vanta.waves";
import Globe from "vanta/src/vanta.globe";
const Area = ref(null);
let vantaEffect = null;
//在两个生命周期钩子内创建vantaEffect
onMounted(() => {
  vantaEffect = Globe({
    el: Area.value,
    THREE: THREE,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
    color: 0xff3fa4,
    size: 0.8,
    backgroundColor: 0x39153c,
  });
});

onBeforeUnmount(() => {
  if (vantaEffect) {
    vantaEffect.destroy();
  }
});
</script>

<template>
  <div class="vanta_area" ref="Area" style="width: 100vw; height: 100vh"></div>
</template>

<style scoped lang="less">
</style>