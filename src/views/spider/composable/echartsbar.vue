<script lang="ts">
export default {
  name: "EchartsBar",
};
</script>
<script lang="ts" setup>
import { onMounted, ref, defineProps } from "vue";
import * as echarts from "echarts";
const props = defineProps({
  data: {
    type: Array,
    default: [],
  },
});
const myChartRef = ref(null);
// console.log(props.data.map((item) => item.spidername));
const option = {
  title: {},
  legend: {
    align: "auto",
    bottom: "2%",
    left: "50%",
  },
  tooltip: {},
  xAxis: {
    type: "category",
    data: props.data ? props.data.map((item) => item.spidername) : [],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "爬虫数量",
      data: props.data ? props.data.map((item) => item.spidercount) : [],
      type: "bar",
      colorBy: "data",
      legendHoverLink: true,
      realtimeSort: true,
      showBackground: true,
      backgroundStyle: {
        color: "rgba(180, 180, 180, 0.3)",
        borderRadius: [10, 10, 0, 0],
      },
      itemStyle: {
        borderRadius: [10, 10, 0, 0],
      },
      barWidth: 30,
      label: {
        show: true,
        position: "top",
        color: "#fff",
      },
    },
  ],
};
const myChart = () => {
  const chart = echarts.init(myChartRef.value);
  chart.setOption(option);
};

onMounted(() => {
  myChart();
});
</script>

<template>
  <div
    id="myChart"
    style="width: 100%; height: 400px; background: #fff"
    ref="myChartRef"
  ></div>
</template>

<style scoped lang="less">
</style>