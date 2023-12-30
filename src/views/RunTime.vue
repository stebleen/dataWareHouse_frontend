<template>
    <el-card>
        <div id="barChart" style="width: 100%; height: 700px;"></div>
    </el-card>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import * as echarts from 'echarts';
  
  onMounted(() => {
    const chartContainer = document.getElementById('barChart');
    const chart = echarts.init(chartContainer);
  
    const option = {
      title: {
        text: 'Run Time'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['mysql', 'neo4j', 'hive']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [
          "时间查询", "电影名查询", "电影种类查询", "导演查询",
          "演员查询", "用户评分查询", "导演和演员关系", "演员合作次数"
        ]
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'mysql',
          type: 'line',
          stack: 'Total',
          data: [181.66, 180.41, 228.21, 550.49, 298.10, 427.04, 174.97, 184.42]
        },
        {
          name: 'neo4j',
          type: 'line',
          stack: 'Total',
          data: [182.09, 193.43, 656.91, 326.75, 237.80, 632.81, 220.05, 232.61]
        },
        {
          name: 'hive',
          type: 'line',
          stack: 'Total',
          data: [1670, 1590, 4570, 2100, 1680, 1830, 1770, 1610]
        }
      ]
    };
  
    chart.setOption(option);
  });
  </script>