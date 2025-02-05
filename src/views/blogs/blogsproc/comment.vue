<script lang="ts">
export default {
  name: "comment",
};
</script>
<script lang="ts" setup>
import { ref, defineProps, defineEmits, onMounted, watch, nextTick } from "vue";
import commentlist from "./commentlist.vue";
import { CommentList } from "@/apis/blogs";
import { useRoute } from "vue-router";
import commentbox from "./commentbox.vue";
import { useCommentStore } from "@/stores/comment";
const CommentStore = useCommentStore();
const props = defineProps({
  drawer: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["closeDrawer"]);

const beforclose = () => {
  CommentStore.closeReply();
  emit("closeDrawer");
  getCommentList();
};
const route = useRoute();
const blogs_id = route.params.id;
const comments = ref([]);
const getCommentList = async () => {
  const res = await CommentList(blogs_id);
  comments.value = res.data;
};

onMounted(() => {
  getCommentList();
});
// 操作框子
const commentboxRef = ref(null);
console.log(commentboxRef.value);
const sonRef = ref(null);
const colsebox = () => {
  CommentStore.closeReply();
};
</script>

<template>
  <!-- 评论 -->
  <el-drawer
    :modelValue="props.drawer"
    size="30%"
    :show-close="false"
    :before-close="beforclose"
  >
    <template #header>
      <div>评论</div>
    </template>
    <template #default>
      <div class="commentbox">
        <div class="comment-img">
          <img
            src="@/assets/img/怪兽.jpg"
            alt=""
            style="
              width: 32px;
              height: 32px;
              border-radius: 50%;
              margin-right: 10px;
            "
          />
        </div>
        <div class="comment-box" style="width: 100%">
          <commentbox
            ref="commentboxRef"
            :blogs_id="blogs_id"
            @getCommentList="getCommentList"
            @click="colsebox"
          />
        </div>
      </div>
      <commentlist
        ref="sonRef"
        :comments="comments"
        :blogs_id="blogs_id"
        @getCommentList="getCommentList"
      />
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="beforclose" type="danger" size="small"
          >取消</el-button
        >
      </div>
    </template>
  </el-drawer>
</template>

<style scoped lang="less">
.commentbox {
  display: flex;
  width: 100%;
  flex-direction: row;
}
:deep(.el-drawer__header) {
  background-color: #fff;
  padding: 0px 20px;
  height: 50px;
  color: #999;
  margin-bottom: 0px;
  border-bottom: 1px solid #eee;
  font-size: 16px;
  font-weight: 600;
}
</style>