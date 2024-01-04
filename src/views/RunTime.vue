<template>
  <el-card>
    <div id="lineChart" style="width: 100%; height: 700px;"></div>
  </el-card>
</template>

<script setup>
import { onMounted } from 'vue';
import * as echarts from 'echarts';

onMounted(() => {
  const chartContainer = document.getElementById('lineChart');
  const chart = echarts.init(chartContainer);

  const option = {
    title: {
      text: '执行时间'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: [
        "时间查询", "电影名查询", "电影种类查询", "导演查询",
        "演员查询", "用户评分查询", "导演和演员关系", "演员合作次数"
      ],
      nameLocation: 'middle'
    },
    yAxis: {
      name: 'Time'
    },
    series: [
      {
        name: 'MySQL',
        type: 'line',
        data: [
          181.66, 180.41, 228.21, 550.49,
          298.10, 427.04, 174.97, 184.42
        ],
        showSymbol: false,
      },
      {
        name: 'Hive',
        type: 'line',
        data: [
          181.66, 193.43, 656.91, 326.75,
          237.80, 632.81, 220.05, 232.61
        ],
        showSymbol: false,
      },
      {
        name: 'Neo4j',
        type: 'line',
        data: [
          1670, 1590, 4570, 2100,
          1680, 1830, 1770, 1610
        ],
        showSymbol: false,
      }
    ]
  };

  chart.setOption(option);
});
</script>