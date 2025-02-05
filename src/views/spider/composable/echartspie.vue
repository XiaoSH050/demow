<script lang="ts">
export default {
  name: "EchartsPie",
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
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "vertical",
    left: "left",
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: props.data.map((item) => {
        return {
          value: item.spidercount,
          name: item.spidername,
        };
      }),
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