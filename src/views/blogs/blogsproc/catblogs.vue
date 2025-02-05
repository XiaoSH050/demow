<script lang="ts">
export default {
  name: "CatBlogs",
};
</script>
<script lang="ts" setup>
import { ref, onMounted, inject, computed } from "vue";
import { blogsDetail } from "@/apis/blogs";
import { useRoute } from "vue-router";
import comment from "./comment.vue";
import { getIcon } from "@/utils/getImg";

const route = useRoute();
// 获取博客数据详情
const text: any = ref("");
const title: any = ref("");
const getBlogsDetail = async () => {
  const res = await blogsDetail(route.params.id);
  // console.log(res.data.text);
  text.value = res.data.text;
  title.value = res.data.title;
};
onMounted(() => {
  getBlogsDetail();
});
// 点赞&收藏
const like = ref(false);
const likeImg = ref(getIcon("取消点赞"));
const collect = ref(false);
const collectImg = ref(getIcon("取消收藏"));
const changImg = (type) => {
  if (type == "like") {
    like.value = !like.value;

    likeImg.value = like.value ? getIcon("点赞") : getIcon("取消点赞");
  } else {
    collect.value = !collect.value;
    collectImg.value = collect.value ? getIcon("收藏") : getIcon("取消收藏");
  }
};
// 评论
const drawer = ref(false);
const openDrawer = () => {
  drawer.value = true;
};
const closeDrawer = () => {
  drawer.value = false;
};
</script>

<template>
  <div class="blogs-list"></div>
  <div class="container">
    <h2 style="text-align: center; margin-bottom: 20px; padding-top: 5px">
      {{ title }}
    </h2>
    <div
      class="preview"
      style="
        height: 80%;
        border-bottom: 1px solid #ccc;
        border-top: 1px solid #ccc;
        overflow: scroll;
      "
    >
      <v-md-editor :model-value="text" mode="preview"></v-md-editor>
    </div>
    <div class="comment" style="text-align: right; margin-top: 20px">
      <img :src="likeImg" alt="" @click="changImg('like')" />
      <img :src="getIcon('评论')" alt="" @click="openDrawer" />
      <img :src="collectImg" alt="" @click="changImg" />
    </div>
    <comment :drawer="drawer" @closeDrawer="closeDrawer" />
  </div>
</template>

<style scoped lang="less">
.container {
  width: 1080px;
  height: 100%;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.comment {
  img {
    display: inline;
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
}
</style>