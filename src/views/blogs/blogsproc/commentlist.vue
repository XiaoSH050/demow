<script lang="ts">
export default {
  name: "commentlist",
};
</script>
<script lang="ts" setup>
import { ref, defineProps, defineExpose, defineEmits } from "vue";
import commentbox from "./commentbox.vue";
import { useCommentStore } from "@/stores/comment";
const props = defineProps({
  comments: {
    type: Array,
    default: () => [],
  },
  blogs_id: {
    type: String,
    default: "",
  },
});
const emits = defineEmits(["getCommentList"]);
// 回复
const CommentStore = useCommentStore();
</script>

<template>
  <div class="comment">
    <ul>
      <li class="comment-item" v-for="item in props.comments" :key="item.id">
        <div class="top">
          <div class="head-img">
            <img src="@/assets/img/奥特曼.jpg" alt="" />
          </div>
          <div class="head-info">
            <div class="head-info-top">
              <span v-if="item.reply_name" class="replyname">
                {{ item.user_name }}
                <span style="color: #ccc; margin: 0 5px">回复</span>
                <span class="name">{{ item.reply_name }}</span></span
              >
              <span class="name" v-else> {{ item.user_name }}</span>
              <span class="time">{{ item.past_time }}</span
              ><span v-if="item.past_time">前</span>
              <div class="proce">
                <span
                  class="reply"
                  v-if="CommentStore.showReply === item.id"
                  @click="CommentStore.closeReply(item)"
                  >收起</span
                >
                <span
                  class="reply"
                  v-else
                  @click="CommentStore.replyClick(item)"
                  >回复</span
                >

                <span class="delete">删除</span>
              </div>
            </div>
            <div class="head-info-botton">
              <span class="content">{{ item.comment }}</span>
            </div>
          </div>
        </div>
        <div
          class="replybox"
          style="margin: 10px 0 10px 42px"
          v-if="CommentStore.showReply === item.id"
        >
          <commentbox
            :placeholder="'回复：' + item.user_name"
            :blogs_id="props.blogs_id"
            :parent_id="item.parent ? item.parent : item.id"
            :reply_id="item.id"
            @getCommentList="emits('getCommentList')"
            @closeReply="closeReply"
          />
        </div>
        <div
          class="children"
          v-if="item.children.length > 0"
          style="margin-left: 42px"
        >
          <commentlist
            ref="sonRef"
            :comments="item.children"
            :blogs_id="blogs_id"
            @getCommentList="emits('getCommentList')"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
ul li {
  margin-top: 10px;
}
.head-img {
  img {
    width: 32px;
    height: 32;
    border-radius: 50%;
  }
}
.comment-item .top {
  display: flex;
}
.head-info {
  margin-left: 10px;
  width: 100%;
  .head-info-top {
    display: flex;
    font-size: 14px;
    color: #999;
    &:hover {
      .proce {
        display: block;
      }
    }
  }
  .head-info-botton {
    margin-top: 5px;
    font-size: 16px;
    color: #333;
  }
}
.name {
  color: red;
  font-weight: 700;
}
.replyname {
  color: skyblue;
}
.time {
  margin-left: 10px;
  color: skyblue;
}
.content {
  color: yellowgreen;
}
.delete {
  color: red;
}
.proce {
  flex: 1;
  text-align: center;
  display: none;
  .reply {
    color: skyblue;
    cursor: pointer;
  }
  .delete {
    color: red;
    cursor: pointer;
  }
}
.children {
  img {
    width: 24px;
  }
}
</style>