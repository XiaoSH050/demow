<script lang="ts">
export default {
  name: "emoji",
};
</script>
<script lang="ts" setup>
import V3Emoji from "vue3-emoji";
import "vue3-emoji/dist/style.css";
const optionsName = {
  "Smileys & Emotion": "笑脸&表情",
  "Food & Drink": "食物&饮料",
  "Animals & Nature": "动物&自然",
  "Travel & Places": "旅行&地点",
  "People & Body": "人物&身体",
  Objects: "物品",
  Symbols: "符号",
  Flags: "旗帜",
  Activities: "活动",
};
</script>

<template>
  <V3Emoji :options-name="optionsName">
    <div class="my-btn">
      <img style="width: 20px" src="./emoji.png" />
    </div>
  </V3Emoji>
</template>

<style scoped lang="less">
</style>