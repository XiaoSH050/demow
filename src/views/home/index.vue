<script lang="ts">
export default {
  name: "Home",
};
</script>
<script lang="ts" setup>
import { ref } from "vue";
import { useUserInfoStore } from "@/stores/user";
const userInfo = useUserInfoStore();
const value = ref(new Date());
const user_name = userInfo.userInfo.user_name;
const timestr = () => {
  const now = new Date();
  const hours = now.getHours();

  if (hours >= 6 && hours < 12) {
    return "早上";
  } else if (hours >= 12 && hours < 18) {
    return "中午";
  } else {
    return "下午";
  }
};
</script>

<template>
  <el-card>
    <span
      >尊敬的用户：
      <span
        style="
          color: #fff;
          font-weight: 600;
          font-size: 18px;
          text-shadow: 1px 1px 1px red;
        "
        >{{ user_name }}</span
      >
      <span style="margin-left: 10px">{{ timestr() }}好</span>
    </span>
  </el-card>
  <el-card style="margin-top: 20px">
    <el-calendar v-model="value" />
  </el-card>
</template>
  

<style scoped lang="less">
</style>