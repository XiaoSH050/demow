<template>
  <div class="box">
    <img src="@/assets/images/error_images/404.png" alt="" />
    <el-button type="primary" @click="goHome">首页</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
let $router = useRouter();
const goHome = () => {
  $router.push("/home");
};
</script>

<style scoped lang="less">
.box {
  width: 100vw;
  height: 100vh;
  background: yellowgreen;
  display: flex;
  justify-content: center;
  img {
    width: 800px;
    height: 400px;
  }
  button {
    width: 50px;
    height: 50px;
  }
}
.el-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 50px;
}
</style>