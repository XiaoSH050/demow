<script lang="ts">
export default {
  name: "BlogsEditor",
};
</script>
<script lang="ts" setup>
import { ref, watch, onBeforeUnmount, onMounted } from "vue";
import { useUserInfoStore } from "@/stores/user";
import { blogsUpdate, fileUpload } from "@/apis/blogs";
import { ElMessage } from "element-plus";
import type { UploadProps } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import { blogsDetail } from "@/apis/blogs";

const route = useRoute();
const router = useRouter();
const blogs = JSON.parse(localStorage.getItem("blog") || "[]");
const userInfoStore = useUserInfoStore();
const fileList = ref([]);
const form = ref({
  title: blogs ? blogs[0] : "",
  text: blogs ? blogs[1] : "",
  user: userInfoStore.userInfo.id,
  images_address: "",
  ispublic: "0",
});

const getBlogsDetail = async () => {
  const res = await blogsDetail(route.params.id);
  form.value.title = res.data.title;
  form.value.text = res.data.text;
  form.value.ispublic = res.data.ispublic.toString();
  fileList.value.push({
    name: res.data.images_address.split("/")[
      res.data.images_address.split("/").length - 1
    ],
    url: res.data.images_address,
  });
};
onMounted(() => {
  getBlogsDetail();
});

// 表单规则
const rules = ref({
  title: [
    { required: true, message: "请输入博客标题", trigger: "blur" },
    { min: 3, max: 20, message: "标题长度3/20", trigger: "blur" },
  ],
});
// 监听博客标题和内容的变化，将变化保存到本地存储中
watch(
  () => {
    return [form.value.title, form.value.text];
  },
  (newVal) => {
    localStorage.setItem("blog", JSON.stringify(newVal));
  },
  {
    deep: true,
  }
);
const publishDoc = async () => {
  // dialog弹出
  dialogVisible.value = true;
};

// 图片上传
const handleUploadImage = async (event, insertImage, files) => {
  // console.log(event, files);
  try {
    const res = await fileUpload(files);
    console.log();
    // 此处只做示例
    insertImage({
      url: res.data[0].images_address,
      desc: res.data[0].file_name,
      width: "auto",
      height: "auto",
    });
  } catch (error) {
    ElMessage.error(error.response.data.msg);
  }
};
// 发送博客数据
const confirm = async () => {
  try {
    await blogsUpdate(form.value, route.params.id);
    ElMessage.success("发布成功");
    // 清除数据
    clearBlogs();
    // 跳转到列表页
    router.push("/blogs/list");
  } catch (error) {
    ElMessage.error(error.response.data.msg);
  }
  dialogVisible.value = false;
};
// 发布成功清除博客数据
const clearBlogs = async () => {
  form.value = {
    title: "",
    user: userInfoStore.userInfo.id,
    images_address: "",
    text: "",
    ispublic: "0",
  };
};
const dialogVisible = ref(false);
const handleClose = () => {
  dialogVisible.value = false;
};
// 文件上传
const headers = {
  token: JSON.parse(localStorage.getItem("userInfo")).token,
};
const dataUpload = {
  file_type: "blogs",
};

const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};
const handleSuccess = () => {
  //   console.log();
  form.value.images_address = fileList.value[0].response.data[0].images_address;
  //   console.log("上传成功");
};

onBeforeUnmount(() => {
  localStorage.setItem("blog", JSON.stringify([]));
});
</script>

<template>
  <div class="title">
    <el-row>
      <el-col :span="8">
        <el-form :model="form" :rules="rules" :hide-required-asterisk="true">
          <el-form-item prop="title">
            <template #label>
              <span style="color: skyblue">博客标题</span>
            </template>
            <el-input v-model="form.title" placeholder="请输入标题"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="2">
        <span class="msheight">3/20</span>
      </el-col>
      <el-col :span="14" style="text-align: right">
        <el-button type="primary" @click="publishDoc">发布文章</el-button>
        <el-button type="primary" @click="router.push('/blogs/list')"
          >返回</el-button
        >
      </el-col>
    </el-row>
  </div>
  <div class="editor">
    <v-md-editor
      v-model="form.text"
      height="100%"
      :autofocus="true"
      disabled-menus="[]"
      @upload-image="handleUploadImage"
    ></v-md-editor>
  </div>
  <el-dialog
    v-model="dialogVisible"
    title="发布文章"
    width="70%"
    :before-close="handleClose"
  >
    <el-form>
      <el-form-item label="添加封面">
        <el-upload
          limit="1"
          v-model:file-list="fileList"
          class="upload-demo"
          action="http://127.0.0.1:8000/file/set/"
          method="post"
          :headers="headers"
          :data="dataUpload"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          list-type="picture"
        >
          <el-button type="primary"> 选择图片</el-button>
          <template #tip>
            <div class="el-upload__tip">
              只能上传1张，切换图片，请删除之前上传的图片
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item label="是否公开">
        <el-radio-group v-model="form.ispublic">
          <el-radio value="0" size="small">不公开</el-radio>
          <el-radio value="1" size="small">公开</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false"> 取消</el-button>
        <el-button type="primary" @click="confirm"> 发布 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="less">
.title {
  width: 100%;
  height: 50px;
}
.msheight {
  position: relative;
  top: 0;
  left: -50px;
  font-size: 30px;
}
.editor {
  width: 100%;
  height: calc(100vh - 105px);
}
</style>