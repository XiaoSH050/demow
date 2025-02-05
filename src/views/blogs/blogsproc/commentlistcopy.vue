<script lang="ts">
export default {
  name: "commentlist",
};
</script>
<script lang="ts" setup>
import { ref, defineProps } from "vue";
const props = defineProps({
  comments: {
    type: Array,
    default: () => [],
  },
});
// 回复
const replystr = ref("回复");
const replybtn = ref(false);
const replyItem = (item: any) => {
  replybtn.value = !replybtn.value;
  if (replybtn.value) {
    replystr.value = "收起";
    item.reply = true;
  } else {
    replystr.value = "回复";
    item.reply = false;
  }
  console.log(item);
};
// 删除评论
const deleteItem = (item: any) => {
  console.log(item);
};
</script>

<template>
  <div class="conmment-list">
    <div class="empty" v-if="props.comments.length === 0">暂无评论</div>
    <div
      class="comment-info"
      v-for="(item, index) in props.comments"
      :key="item.id"
    >
      <div class="comment-item">
        <div class="head">
          <img
            v-if="item.reply_name"
            src="@/assets/img/奥特曼.jpg"
            alt=""
            style="width: 28px; height: 28px; border-radius: 50%"
          />
          <img
            v-else
            src="@/assets/img/奥特曼.jpg"
            alt=""
            style="width: 32px; height: 32px; border-radius: 50%"
          />
        </div>
        <div class="comment-content">
          <div class="top">
            <div class="comment-user" v-if="item.reply_name">
              <span style="color: red">{{ item.user_name }}</span>
              <span style="color: skyblue">回复</span>
              <span style="color: blueviolet">{{ item.reply_name }}</span>
            </div>
            <div class="comment-user" v-else>
              <span style="color: red">{{ item.user_name }}</span>
            </div>
            <div class="comment-time">
              <span style="color: skyblue">{{ item.past_time }}</span
              >前
            </div>
            <div class="reply">
              <span
                class="reply-item"
                style="color: skyblue"
                @click="replyItem(item)"
                >{{ replystr }}</span
              >
              <span
                class="reply-item"
                style="color: red"
                @click="deleteItem(item)"
                >删除</span
              >
            </div>
          </div>
          <div class="bottom">
            <div class="comment-text">{{ item.comment }}</div>
          </div>
        </div>
      </div>
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        v-if="item.reply"
        style="margin-left: 42px"
      ></textarea>
      <div
        class="children"
        v-if="item.children.length > 0"
        style="margin-left: 32px"
      >
        <commentlist :comments="item.children" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.conmment-list {
  width: 100%;
  height: 100%;
  margin-top: 20px;
}
.comment-item {
  display: flex;
  margin-top: 10px;
}
.comment-content {
  width: 100%;
}
.comment-content .top {
  display: flex;
  margin-left: 10px;
  color: #777888;
  .reply {
    flex: 1;
    margin-left: 20px;
    text-align: center;
    cursor: pointer;
    color: skyblue;
    .reply-item {
      display: none;
    }
    &:hover {
      .reply-item {
        display: inline;
      }
    }
  }
}
.comment-time {
  margin-left: 10px;
}
.bottom .comment-text {
  margin-left: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #333333;
}
</style>