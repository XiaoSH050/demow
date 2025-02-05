<script lang="ts">
export default {
  name: "MyBlogs",
};
</script>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { blogsList, blogsRemove } from "@/apis/blogs";
import { ElMessage } from "element-plus";

const form = ref({
  keyword: "",
});
const articles = ref([]);
const getArticles = async () => {
  const res = await blogsList(form.value.keyword);
  articles.value = res.data;
};
onMounted(() => getArticles());

const router = useRouter();
const addblog = () => {
  router.push("/blogs/add");
};
// 跳转博客详情页
const catBlogs = (id) => {
  router.push(`/blogs/detail/${id}`);
};

// 跳转边界博客
const editorBlogs = (id) => {
  router.push(`/blogs/editor/${id}`);
};
// 删除博客
const removeBlogs = async (id) => {
  try {
    await blogsRemove(id);
    getArticles();
    ElMessage.success("删除成功");
  } catch (error) {
    ElMessage.error(error);
  }
};
</script>

<template>
  <el-card class="top">
    <el-form inline :model="form">
      <el-form-item label="博客搜索：">
        <el-input
          placeholder="请输入博客标题"
          style="min-width: 200px"
          v-model="form.keyword"
          clearable
          @blur="getArticles"
        ></el-input>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card>
    <el-button type="primary" @click="addblog">+ 添加博客</el-button>
    <div v-if="articles.length != 0" class="bloglist">
      <div v-for="item in articles" :key="item.id" class="article-card">
        <div class="left">
          <img :src="item.images_address" alt="Author Avatar" class="avatar" />
        </div>
        <div class="right">
          <div class="blogs-info">
            <div>{{ item.title }}</div>
            <div>{{ item.user_name }}</div>
            <div>{{ item.ct_create }}</div>
          </div>
          <p class="content">{{ item.text }}</p>
          <div style="margin-top: 5px">
            <span
              ><em style="color: skyblue">评论数据:</em>
              <em style="color: red; margin-left: 5px">123</em>
            </span>
            <span
              ><em style="color: skyblue; margin-left: 20px">点赞数据:</em>
              <em style="color: red; margin-left: 5px">123</em></span
            >
          </div>
          <div class="proce" style="margin-top: 5px">
            <el-button type="primary" size="small" @click="catBlogs(item.id)"
              >查看</el-button
            >
            <el-button type="primary" size="small" @click="editorBlogs(item.id)"
              >编辑</el-button
            >
            <el-button type="danger" size="small" @click="removeBlogs(item.id)"
              >删除</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <div v-else class="empty">
      <div
        style="
          width: 100%;
          height: 400px;
          margin: 0 auto;
          background: url('http://127.0.0.1:8000/file/set/?file_path=resources/blogs/nodata.jpg')
            no-repeat -200px -400px;
          color: #fff;
          font-size: 20px;
          text-align: center;
          line-height: 300px;
        "
      >
        没有数据呀，赶紧去添加数据吧
      </div>
    </div>
  </el-card>
</template>

<style scoped lang="less">
.bloglist {
  margin-top: 20px;
  width: 100%;
}
img {
  width: 100px;
  height: 100px;
}
.article-card {
  display: flex;
  padding: 10px;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .right {
    margin-left: 10px;
    width: 90%;
    .blogs-info {
      display: flex;
      div {
        margin-top: 5px;
        margin-right: 20px;
      }
      &:hover {
        background-color: #f5f7fa;
        cursor: pointer;
        opacity: 1;
      }
    }
    .content {
      margin-top: 5px;
      overflow: hidden; /* 将超出的内容隐藏 */
      white-space: nowrap; /*  禁止文字自动换行 */
      text-overflow: ellipsis;
    }
    &:hover {
      cursor: pointer;
      color: #1e9f79;
    }
  }
  .left {
    width: 100px;
    height: 100px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.avatar {
  width: 120px;
  height: 120px;
}
.empty {
  text-align: center;
  font-size: 20px;
  color: #ccc;
  margin-top: 20px;
}
</style>