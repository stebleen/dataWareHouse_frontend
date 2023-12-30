<template>
    <el-card class="header">
        <el-text class="text" tag="b" size="large">总计获得非电影数据12037条</el-text>
    </el-card>
    <el-card>
        <div ref="chartContainer" style="width: 100%; height: 600px;"></div>
    </el-card>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import * as echarts from 'echarts';
  
  const chartContainer = ref(null);
  
  const data = [
    ["系列电影数", 10],
    ["电影的版本数量", 5],
    ["网页数量", 20],
    ["第I部合并网页数", 8]
  ];
  
  const categoryList = data.map(item => item[0]);
  const valueList = data.map(item => item[1]);
  
  onMounted(() => {
    const chart = echarts.init(chartContainer.value);
  
    const option = {
      title: {
        text: '哈利波特电影信息溯源查询',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{b}: {c}'
      },
      xAxis: {
        type: 'category',
        data: categoryList,
        axisLabel: {
          rotate: 45
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: 'line',
          data: valueList,
          lineStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0, color: '#63ebe9' 
                },
                {
                  offset: 1, color: '#f4cc80' 
                }
              ]
            }
          }
        }
      ]
    };
  
    chart.setOption(option);
  });
  </script>

  <style scoped>
  .header{
    margin-bottom:2%;
  }

  </style>