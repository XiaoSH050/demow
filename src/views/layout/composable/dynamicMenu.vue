<script lang="ts">
export default {
  name: "dynamicMenu",
};
</script>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import { defineProps } from "vue";
defineProps({
  menulist: {
    type: Array,
    default: () => [],
  },
});
const $router = useRouter();
const goRouter = (val: any) => {
  $router.push(val.index);
};
</script>

<template>
  <template v-for="item in menulist" :key="item.path">
    <!-- 没有子路由 -->
    <el-menu-item
      v-if="!item.children && !item.meta.hidden"
      :index="item.path"
      @click="goRouter"
    >
      <svg
        class="icon"
        aria-hidden="true"
        style="font-size: 12px; margin-right: 5px"
      >
        <use :xlink:href="item.meta.icon"></use>
      </svg>
      {{ item.meta.title }}
    </el-menu-item>
    <!-- 只有一个子路由 -->
    <el-menu-item
      v-if="
        item.children &&
        item.children.length === 1 &&
        !item.children[0].meta.hidden
      "
      :index="item.children[0].path"
      @click="goRouter"
    >
      <svg
        class="icon"
        aria-hidden="true"
        style="font-size: 12px; margin-right: 5px"
      >
        <use :xlink:href="item.children[0].meta.icon"></use>
      </svg>
      {{ item.children[0].meta.title }}
    </el-menu-item>

    <!-- 有多个子路由 -->
    <el-sub-menu
      v-if="item.children && item.children.length > 1 && !item.meta.hidden"
      :index="item.path"
    >
      <template #title>
        <svg
          class="icon"
          aria-hidden="true"
          style="font-size: 12px; margin-right: 5px"
        >
          <use :xlink:href="item.meta.icon"></use>
        </svg>
        {{ item.meta.title }}
      </template>
      <dynamic-menu :menulist="item.children" />
    </el-sub-menu>
  </template>
</template>

<style scoped lang="less">
</style>