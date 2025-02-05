<script lang="ts">
export default {
  name: "Spider",
};
</script>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { spiderManager } from "@/apis/spider";
import EchartsBar from "./composable/echartsbar.vue";
import Echartspie from "./composable/echartspie.vue";
const tableData = ref([]);
const getSpiderManager = async () => {
  const res = await spiderManager();
  tableData.value = res.data.data;
};
onMounted(() => {
  getSpiderManager();
});
const indexMethod = (index: number) => {
  return index + 1;
};

const getHeaderClassName = (row) => {
  if (row.columnIndex % 2 === 0) {
    return "dynamicheader"; // 你可以根据条件返回不同的类名
  } else {
    return "dynamicheader2"; // 你可以根据条件返回不同的类名
  }
};
const handleClick = (href) => {
  window.open(href, "_blank"); // 新窗口打开链接
};
</script>

<template>
  <div class="info">
    <h2 class="title">数据汇总</h2>
    <div class="info-table">
      <el-table
        :data="tableData"
        style="width: 100%"
        height="520"
        border
        :header-cell-class-name="getHeaderClassName"
        :header-cell-style="{ backgroundColor: '#999' }"
        :cell-class-name="getHeaderClassName"
        :cell-style="{ backgroundColor: '#fff' }"
      >
        <el-table-column
          type="index"
          :index="indexMethod"
          label="行号"
          width="100"
          align="center"
        />
        <el-table-column prop="spidername" label="爬虫名称" align="center">
          <template #default="{ row }">
            <span style="cursor: pointer">{{ row.spidername }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="spiderhref" label="爬虫网站" align="center">
          <template #default="{ row }">
            <span
              style="cursor: pointer"
              @click="handleClick(row.spiderhref)"
              >{{ row.spiderhref }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="spidercount" label="爬虫数量" align="center" />
        <el-table-column
          prop="spidertype_value"
          label="爬虫类型"
          align="center"
        />
      </el-table>
    </div>
    <h2 class="title" style="margin-top: 20px">图表展示</h2>
    <div class="echarsinfo">
      <div class="left">
        <EchartsBar :data="tableData" v-if="tableData.length > 0" />
      </div>
      <div class="right">
        <div style="background-color: #fff; height: 400px; width: 100%">
          <Echartspie :data="tableData" v-if="tableData.length > 0" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.dynamicheader {
  color: blue; /* 自定义字体颜色 */
}
.dynamicheader2 {
  color: orange; /* 自定义字体颜色 */
}

.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: silver !important;
}
.echarsinfo {
  display: flex;
  justify-content: space-between;
  .left {
    width: 50%;
  }
  .right {
    width: 49%;
  }
}
</style>