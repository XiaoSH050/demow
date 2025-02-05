<script lang="ts">
export default {
  name: "LetTop",
};
</script>
<script lang="ts" setup>
import { ref, defineProps, onMounted, nextTick } from "vue";
// 引入echarts
import * as echarts from "echarts";
import { watch } from "vue";
import elementResizeDetectorMaker from "element-resize-detector";
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});

// 第一步创建echart实例
const lefttop = ref(null);
const mychart = ref();

onMounted(() => {
  mychart.value = echarts.init(lefttop.value);
  getOptions();
  // 监听窗口大小变化
  const erd = elementResizeDetectorMaker();
  erd.listenTo(lefttop.value, () => {
    nextTick(() => {
      mychart.value.resize();
    });
  });
});

const getOptions = () => {
  // 创建echart配置对象
  const options = {
    xAxis: {
      type: "value",
      // 不显示轴
      show: false,
      max: function (value: any) {
        return value.max * 1.2;
      },
    },
    yAxis: {
      type: "category",
      data: props.data ? props.data.map((item: any) => item.name) : [],
      inverse: true,
      // 不展示轴线
      axisLine: {
        show: false,
      },
      // 不展示刻度
      axisTick: {
        show: false, // 取消 Y 轴刻度
      },
      // 文字色值
      axisLabel: {
        color: "#9EB1C8",
      },
    },
    grid: {
      top: 20,
      right: 30,
      bottom: 20,
      left: 0,
      containLabel: true,
    },
    series: [
      {
        type: "bar",
        data: props.data
          ? props.data.map((item: any) => {
              return {
                value: item.value,
                name: item.name,
              };
            })
          : [],
        // 显示背景
        showBackground: true,
        // 背景色
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
        // 每个轴的样式
        itemStyle: {
          color: "#479AD3", // 设置柱子的颜色
          barBorderRadius: 5, // 设置柱子的圆角
          shadowColor: "rgba(0, 0, 0, 0.3)", // 设置柱子的阴影颜色
          shadowBlur: 5, // 设置柱子的阴影模糊大小
        },
        // 轴宽度
        barWidth: 12,
        // 轴上的字体
        label: {
          show: true,
          // 设置标签位置为右侧
          position: "right",
          textStyle: {
            // 设置标签文本颜色
            color: "#fff",
          },
        },
      },
    ],
  };
  // 实例.setOption(配置对象)
  mychart.value.setOption(options);
};

// 监听数据变化
watch(
  () => props.data,
  () => {
    console.log(props.data);
    getOptions();
  }
);
</script>


<template>
  <div
    ref="lefttop"
    style="height: 100%; width: 100%"
    id="lefttop"
    v-if="props.data"
  ></div>
</template>

<style scoped lang="less">
</style>