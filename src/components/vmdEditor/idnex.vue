// 自定义makedown组件
<!-- Child.vue -->
<script setup>
const model = defineModel();

function update() {
  model.value++;
}
</script>

<template>
  <div>Parent bound v-model is: {{ model }}</div>
  <button @click="update">Increment</button>
</template>