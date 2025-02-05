<script lang="ts">
export default {
  name: "Ecs",
};
</script>
<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { getVisualization } from "@/apis/screen";
import leftTop from "./composable/letTop.vue";

const data = ref({});
const leftTopData = ref([]);
const getData = async () => {
  const res: any = await getVisualization();
  data.value = res;
  leftTopData.value = res.regionData.regions;
};
onMounted(() => getData());
const times = setInterval(() => getData(), 10000);
onBeforeUnmount(() => clearInterval(times));
</script>

<template>
  <div class="ecs">
    <el-row style="height: 100%">
      <el-col :span="6" class="left">
        <div>
          <p>[大区数据信息]</p>
          <leftTop :data="leftTopData"></leftTop>
        </div>
        <div>
          <p>[云端报警风险]</p>
        </div>
        <div>
          <p>[数据传递信息]</p>
        </div>
      </el-col>
      <el-col :span="12" class="center">
        <div class="top">数据总量</div>
        <div class="bottom">年度数据统计</div>
      </el-col>
      <el-col :span="6" class="right">
        <div>
          <p>[服务器资源占比]</p>
        </div>
        <div>
          <p>[大区异常处理]</p>
        </div>
        <div>
          <p>[关键词条]</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="less">
.ecs {
  width: 100%;
  height: 100%;
  position: relative;
  background: url("./assets/imgs/bg.jpg") no-repeat;
  background-size: 100% 100%;
  .el-col {
    color: #fff;
  }
  .left,
  .right {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 100%;
    div {
      // border: 1px solid #000;
      flex: 1;
      padding-left: 20px;
      p {
        margin-top: 20px;
        font-size: 20px;
      }
    }
  }
  .center {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .top {
      border: 1px solid #000;
      flex: 0.5;
    }
    .bottom {
      border: 1px solid #000;
      flex: 1.5;
    }
  }
}
</style>