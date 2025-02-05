<script lang="ts">
export default {
  name: "commentbox",
};
</script>
<script lang="ts" setup>
import {
  ref,
  computed,
  defineProps,
  defineEmits,
  onMounted,
  defineExpose,
} from "vue";
import { ElMessage } from "element-plus";
import { CommentAdd } from "@/apis/blogs";
import { useCommentStore } from "@/stores/comment";

import Emoji from "./emoji.vue";
import V3Emoji from "vue3-emoji";
import "vue3-emoji/dist/style.css";
const CommentStore = useCommentStore();
const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const user_id = userInfo.userInfo.id;
const props = defineProps({
  blogs_id: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "欢迎高质量的评论，低质的评论会被折叠",
  },
  parent_id: {
    type: String,
    default: "",
  },
  reply_id: {
    type: String,
    default: "",
  },
});
const textarea = ref();
onMounted(() => {
  const inputDom = textarea.value; // 获取dom
  inputDom.focus(); // 聚焦
});

const emits = defineEmits(["getCommentList", "closeReply"]);
// 发布评论
const formdata = ref({
  comment: "",
  blogs: props.blogs_id,
  user: user_id,
  parent: props.parent_id,
  reply: props.reply_id,
});
// 输入框字符数
const count = computed(() => {
  return 1000 - formdata.value.comment.length;
});
const addcomment = async () => {
  if (formdata.value.comment) {
    try {
      console.log(formdata.value);
      await CommentAdd(formdata.value);
      emits("getCommentList");
      formdata.value.comment = "";
      ElMessage({
        message: "评论成功",
        type: "success",
      });
      CommentStore.closeReply();
    } catch (error) {
      ElMessage({
        message: error,
        type: "error",
      });
    }
  } else {
    ElMessage({
      message: "请输入评论内容",
      type: "error",
    });
  }
};
// 表情
const clickEmoji = (val: any) => {
  formdata.value.comment += val;
  console.log(val);
};
</script>

<template>
  <div style="width: 100%">
    <textarea
      ref="textarea"
      class="comment-content"
      name="comment_content"
      id="comment_content"
      :placeholder="props.placeholder"
      maxlength="1000"
      v-model="formdata.comment"
    ></textarea>
    <div class="comment-fotter">
      <div>
        还能输入 <span style="color: #409eff"> {{ count }} </span> 字符
      </div>
      <!-- <div class="emoji">
        <V3Emoji v-model="formdata.comment" @click-emoji="clickEmoji" />
      </div> -->
      <div>
        <el-button type="danger" size="small" round @click="addcomment"
          >评论</el-button
        >
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.comment-content {
  display: block;
  width: 100%;
  background: rgba(248, 249, 251, 0.8);
  border: none;
  padding: 0 16px;
  border-radius: 4px;
  resize: none;
  height: 88px;
  font-size: 14px;
  line-height: 22px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-family: "SF Pro Display", Roboto, Noto, Arial, "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.comment-fotter {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background: rgba(248, 249, 251, 0.8);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
</style>