<script lang="ts">
export default {
  name: "Layout",
};
</script>
<script lang="ts" setup>
import { ref, watch, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import dynamicMenu from "./composable/dynamicMenu.vue";
import { useUserInfoStore } from "@/stores/user";
import Tabs from "./tabs.vue";
const userInfo = useUserInfoStore();
const route = useRoute();
const router = useRouter();
const user_name = userInfo.userInfo.user_name;

const visible = ref(false);
const openOtherUrl = (str_: string) => {
  var url = "";
  if (str_ == "UI") {
    url = "https://element-plus.org/zh-CN/component/overview.html";
  } else if (str_ == "esc") {
    url =
      "https://www.bilibili.com/video/BV1yu411E7cm?p=4&spm_id_from=pageDriver&vd_source=4e0fac662f6746c78fae6df5e8747eb2";
  } else if (str_ == "vditor") {
    url =
      "https://code-farmer-i.github.io/vue-markdown-editor/zh/#%E4%BB%8B%E7%BB%8D";
  } else {
    url = "https://www.bilibili.com/video/BV1Xh411V7b5/";
  }

  window.open(url, "_blank");
};
const logout = () => {
  userInfo.clearInfo();
  // 跳转到当前路径
  router.push({ path: "/login", query: { redirect: route.path } });
  visible.value = true;
};
</script>

<template>
  <el-row>
    <el-col :span="3" class="layout-left">
      <h1 class="title">后台管理</h1>
      <el-menu unique-opened :default-active="route.path">
        <dynamicMenu :menulist="userInfo.menulist" />
      </el-menu>
    </el-col>
    <el-col :span="21">
      <div
        class="top"
        style="height: 45px; line-height: 45px; border-bottom: 1px solid #ccc"
      >
        <span style="color: dimgrey"
          ><el-popover :visible="visible" placement="bottom" :width="160">
            <p>确定退出吗</p>
            <div style="text-align: right; margin: 0">
              <el-button size="small" text @click="visible = false"
                >取消</el-button
              >
              <el-button size="small" type="primary" @click="logout">
                确定
              </el-button>
            </div>
            <template #reference>
              <span @click="visible = true" style="color: #e6e6fa"
                >退出登录</span
              >
            </template>
          </el-popover></span
        >
        <span style="color: deepskyblue"> 用户名：{{ user_name }}</span>
        <span @click="openOtherUrl('vditor')">v-md-vditor</span>
        <span @click="openOtherUrl">后台管理视频地址</span>
        <span @click="openOtherUrl('esc')">服务数据大屏视频</span>
        <span @click="openOtherUrl('UI')">ul组件库</span>
      </div>
      <!-- <Tabs /> -->
      <div class="content">
        <router-view></router-view>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped lang="less">
.layout-left {
  background-color: #fff;
  height: 100vh;
  .title {
    height: 45px;
    line-height: 45px;
    text-align: center;
    border-bottom: 1px solid deepskyblue;
    color: deepskyblue;
    font-size: 30px;
    font-weight: 700;
    text-shadow: 1px 1px 1px red;
    color: #fff;
    cursor: pointer;
    &:hover {
      color: #409eff;
      text-shadow: none;
    }
  }
}
.content {
  height: calc(100vh - 45px);
  overflow-y: auto;
  padding: 10px 10px 0 10px;
  box-sizing: border-box;
  background-color: #f0f2f5;
}
.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
  transform: translateX(20px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
.top span {
  float: right;
  margin-right: 20px;
  font-size: 14px;
  color: #409eff;
  cursor: pointer;
  &:hover {
    color: #409eff;
    text-shadow: none;
  }
}
</style>