<script lang="ts">
export default {
  name: "work",
};
</script>
<script lang="ts" setup>
import { ref } from "vue";

const value = ref("本周");
const options = [
  {
    value: "week",
    label: "本周",
  },
  {
    value: "lastweek",
    label: "上周",
  },
  {
    value: "month",
    label: "本月",
  },
  {
    value: "lastmonth",
    label: "上月",
  },
  {
    value: "quart",
    label: "季度",
  },
  {
    value: "lastquart",
    label: "上季度",
  },
  {
    value: "year",
    label: "本年",
  },
  {
    value: "lastyear",
    label: "上年",
  },
];
const getColor = () => {
  const colors = [
    "#79C2CF",
    "#5AB7A1",
    "#DF5D3E",
    "#795FAB",
    "#87DC92",
    "#9AC659",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  const firstColor = colors[randomIndex];
  const randomIndex2 = Math.floor(Math.random() * colors.length);
  const secondeColor = colors[randomIndex2];
  return `linear-gradient(to right, ${firstColor}, ${secondeColor})`;
};
const workData = [
  {
    title: "待处理",
    conunt: 2,
    color: getColor(),
  },
  {
    title: "进行中",
    conunt: 4,
    color: getColor(),
  },
  {
    title: "已完成",
    conunt: 12,
    color: getColor(),
  },
  {
    title: "已延期",
    conunt: 0,
    color: getColor(),
  },
];
const tableData = [
  {
    wokerid: 20240812,
    worktype: "问题",
    createuser: "小铭",
    ct_create: "2024-08-12",
    status: "进行中",
    level: "紧急",
    content: "你这高的是啥呀",
  },
  {
    wokerid: 20240928,
    worktype: "需求",
    createuser: "小接",
    ct_create: "2024-08-12",
    status: "进行中",
    level: "紧急",
    content: "来一个小的打卡机制",
  },
  {
    wokerid: 20240606,
    worktype: "测试",
    createuser: "小开",
    ct_create: "2024-08-12",
    status: "进行中",
    level: "中等",
    content: "你这个bug赶紧改完",
  },
  {
    wokerid: 20240809,
    worktype: "测试",
    createuser: "小烧",
    ct_create: "2024-08-12",
    status: "进行中",
    level: "低",
    content: "不要搞得这么难",
  },
];
const search = ref("");
</script>

<template>
  <div class="search">
    <el-select
      v-model="value"
      placeholder="Select"
      size="large"
      style="width: 100px"
      filterable
      allow-create
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{
          item.value
        }}</span>
      </el-option>
    </el-select>
  </div>
  <div class="user">
    <el-card>
      <svg
        class="icon"
        aria-hidden="true"
        style="font-size: 16px; margin-right: 10px"
      >
        <use xlink:href="#icon-gongdan"></use>
      </svg>
      <span style="color: #409eff">任务概览</span>
      <div>
        <ul class="module">
          <li
            class="carditem"
            v-for="(item, index) in workData"
            :key="index"
            :style="{ backgroundImage: item.color }"
          >
            <div class="title">
              {{ item.title }}
            </div>
            <div class="count">
              {{ item.conunt }}
            </div>
          </li>
        </ul>
      </div>
    </el-card>
  </div>
  <div class="table">
    <el-card>
      <svg
        class="icon"
        aria-hidden="true"
        style="font-size: 16px; margin-right: 10px"
      >
        <use xlink:href="#icon-yichaoshigongdan"></use>
      </svg>
      <span style="color: #f44748">超时工单</span>
      <el-table
        :data="tableData"
        stripe
        border
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column prop="wokerid" align="center" width="180">
          <template #header>
            <span style="color: red">工单编号</span>
          </template>
          <template #default="{ row }">
            <span style="color: #409eff">{{ row["wokerid"] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="worktype" label="工单类型" />
        <el-table-column prop="createuser" label="创建人" />
        <el-table-column prop="ct_create" label="创建时间" />
        <el-table-column prop="status" label="状态" />
        <el-table-column prop="level" label="优先级">
          <template #default="{ row }">
            <el-tag v-if="row['level'] === '紧急'" type="danger">
              {{ row["level"] }}
            </el-tag>
            <el-tag v-if="row['level'] === '中等'" type="warning">
              {{ row["level"] }}
            </el-tag>
            <el-tag v-if="row['level'] === '低'" type="primary">
              {{ row["level"] }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column align="center">
          <template #header>
            <el-input placeholder="搜索" v-model="search"></el-input>
          </template>
          <template #default>
            <span style="color: #409eff; cursor: pointer">详情</span>
            <span style="color: #f44748; cursor: pointer; margin-left: 10px"
              >关闭</span
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped lang="less">
.user {
  margin-top: 10px;
}
.module {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-left: 20px;
  margin-top: 10px;
}
.carditem {
  width: 200px;
  height: 100px;
  // background-image: linear-gradient(to right, skyblue, rgb(16, 64, 83));
  border-radius: 10px;
  padding-top: 10px;
  padding-left: 10px;
  color: #fff;
  .title {
    font-size: 16px;
  }
  .count {
    font-size: 20px;
    margin-top: 10px;
  }
}
.table {
  margin-top: 10px;
}
</style>