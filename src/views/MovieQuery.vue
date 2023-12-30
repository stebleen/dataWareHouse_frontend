<template>
    <div style="height: 100vh;"> 
      <el-row style="height: 100%;"> 
        <el-col :span="12">
          <div class="grid-content ep-bg-purple" style="height: 100%;">
            <el-card style="width: 90%;">
            <el-form-item class="movie-row"> 
                <span class="text-gray-600 inline-flex items-center" style="margin-right: 15px;">电影名称</span>
                <el-input
                v-model="form.movieName"
                class="small-input"
                placeholder="Type something"
                :prefix-icon="Search"
                />
            </el-form-item>
            <el-form-item class="movie-row"> 
                <span class="text-gray-600 inline-flex items-center" style="margin-right: 15px;">电影类别</span>
                <el-input
                v-model="form.category"
                class="small-input"
                placeholder="Type something"
                :prefix-icon="Search"
                />
            </el-form-item>
            <el-form-item class="movie-row"> 
                <span class="text-gray-600 inline-flex items-center" style="margin-right: 15px;">上映时间</span>
                <div class="block">
                    <el-date-picker
                        v-model="form.movieDate"
                        type="daterange"
                        range-separator="To"
                        start-placeholder="Start date"
                        end-placeholder="End date"
                        class="date-picker"
                    />
                </div>
            </el-form-item>
            <el-form-item class="movie-row"> 
                <span class="text-gray-600 inline-flex items-center" style="margin-right: 15px;">演员名字</span>
                <el-input
                v-model="form.actor"
                class="small-input"
                placeholder="Type something"
                :prefix-icon="Search"
                />
            </el-form-item>

            <el-form-item class="movie-row"> 
                <span class="text-gray-600 inline-flex items-center" style="margin-right: 15px;">导演名字</span>
                <el-input
                v-model="form.director"
                class="small-input"
                placeholder="Type something"
                :prefix-icon="Search"
                />
            </el-form-item>
            <el-form-item class="comment-row">
                <span class="text-gray-600 inline-flex items-center" style="margin-right: 15px;">正面评价</span>
                <el-switch v-model="form.positive" />
            </el-form-item>

            <el-form-item class="comment-row">
                <span class="text-gray-600 inline-flex items-center" style="margin-right: 15px;">评分</span>
                <el-input-number
                v-model="form.movieMinScore"
                size="mini"
                :precision="2"
                :step="0.01"
                :max="form.movieMaxScore"
                :min="0"
                />
                &nbsp;&nbsp;&nbsp;至&nbsp;&nbsp;&nbsp;
                <el-input-number

                size="mini"
                :precision="2"
                :step="0.01"
                :max="5"
                :min="0"
                />
            </el-form-item>

            <el-form-item class="button-row">
                <el-button type="primary" @click="searchMovie">查询</el-button>
                <el-button @click="onCancel">取消</el-button>
            </el-form-item>
          </el-card>
          </div>
        </el-col>
        <div class="vertical-line"></div> 
        <el-col :span="12">
          <el-tabs type="border-card">
            <el-tab-pane label="MySQL">
              <div class="grid-content ep-bg-purple-light" style="height: 100%;">
                <p>一共有{{ numberMySQL }}个查询结果</p>
                <el-table :data="MySQLData" stripe style="width: 100%">
                  <el-table-column prop="movieName" label="电影名" width="180" />
                  <el-table-column prop="format" label="电影版本" width="180" />
                  <el-table-column prop="comment_num" label="评论数量" width="180" />
                  <el-table-column prop="time" label="上映日期" width="180" />
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="Hive">
              <div class="grid-content ep-bg-purple-light" style="height: 100%;">
                <p>一共有{{ numberHive }}个查询结果</p>
                <el-table :data="HiveData" stripe style="width: 100%">
                  <el-table-column prop="movieName" label="电影名" width="180" />
                  <el-table-column prop="format" label="电影版本" width="180" />
                  <el-table-column prop="comment_num" label="评论数量" width="180" />
                  <el-table-column prop="time" label="上映日期" width="180" />
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="Neo4j">
              <div class="grid-content ep-bg-purple-light" style="height: 100%;">
                <p>一共有{{ numberNeo4j }}个查询结果</p>
                <el-table :data="Neo4jData" stripe style="width: 100%">
                  <el-table-column prop="movieName" label="电影名" width="180" />
                  <el-table-column prop="format" label="电影版本" width="180" />
                  <el-table-column prop="comment_num" label="评论数量" width="180" />
                  <el-table-column prop="time" label="上映日期" width="180" />
                </el-table>
              </div>
            </el-tab-pane>
          </el-tabs>

          <div ref="chartContainer" style="width: 100%; height: 400px;" class="chart"></div>
          
        </el-col>
      </el-row>
    </div>
  </template>

  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import { Search } from '@element-plus/icons-vue';
  import * as echarts from 'echarts';


  const form = ref({
    movieName: '',
    format: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
    category: '',
    radio:'',
    actor: '',
    starring: '',
    director: '',
    movieMinScore: 0,
    movieMaxScore: 5.0,
    movieDate: [],
    positive: '',
  });

  const numberMySQL=ref(0);
  const numberNeo4j=ref(0);
  const numberHive=ref(0);

  const timeMySQL=ref(0);
  const timeNeo4j=ref(0);
  const timeHive=ref(0);

  const Neo4jData = ref([]);
  const MySQLData = ref([]);
  const HiveData = ref([]);

  const searchAllDatabases = async () => {
    try {
      // 发送 Neo4j 请求
      const neo4jResponse = await fetchNeo4jData(); 
      console.log('neo4jResponse.response',neo4jResponse.response)
      Neo4jData.value = neo4jResponse.response.movies;
      numberNeo4j.value = neo4jResponse.response.movieNum;
      timeNeo4j.value = neo4jResponse.response.time;

      // 发送 MySQL 请求
      const mysqlResponse = await fetchMySQLData(); 
      console.log('mysqlResponse.response',mysqlResponse.response)
      MySQLData.value = mysqlResponse.response.movies;
      numberMySQL.value = mysqlResponse.response.movieNum;
      timeMySQL.value = mysqlResponse.response.time;

      // 发送 Hive 请求
      const hiveResponse = await fetchHiveData(); 
      console.log('hiveResponse.response',hiveResponse.response)
      HiveData.value = hiveResponse.response.movies;
      numberHive.value = hiveResponse.response.movieNum;
      timeHive.value = hiveResponse.response.time;


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchNeo4jData = async () => {
    const requestBody = {
      movieInfo: {
        movieName: form.value. movieName,
        category: form.value.category,
        date: form.value.movieDate,
        directorNames: form.value.director,
        actors: form.value.actor,
        positive: form.value.positive,
        minScore: form.value.movieMinScore,
        maxScore: form.value.movieMaxScore,
      }
    };

    // 发送 Neo4j 请求
    const response = await fetch('https://mock.apifox.com/m1/3838210-0-default/neo4j/match', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    return await response.json();
  };


  const fetchMySQLData = async () => {
    const requestBody = {
      movieInfo: {
        movieName: form.value. movieName,
        category: form.value.category,
        date: form.value.movieDate,
        directorNames: form.value.director,
        actors: form.value.actor,
        positive: form.value.positive,
        minScore: form.value.movieMinScore,
        maxScore: form.value.movieMaxScore,
      }
    };

    // 发送 Neo4j 请求
    const response = await fetch('https://mock.apifox.com/m1/3838210-0-default/neo4j/match', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    return await response.json();
  };

  const fetchHiveData = async () => {
    const requestBody = {
      movieInfo: {
        movieName: form.value. movieName,
        category: form.value.category,
        date: form.value.movieDate,
        directorNames: form.value.director,
        actors: form.value.actor,
        positive: form.value.positive,
        minScore: form.value.movieMinScore,
        maxScore: form.value.movieMaxScore,
      }
    };

    // 发送 Neo4j 请求
    const response = await fetch('https://mock.apifox.com/m1/3838210-0-default/neo4j/match', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    return await response.json();
  };

  // 在 searchMovie 函数中调用 searchAllDatabases 来查询三个数据库
  const searchMovie = async () => {
    await searchAllDatabases();
  };

  console.log('timeMySQL',timeMySQL.value);


  const chartContainer = ref(null);

  const chart = ref(null);

  // 监听 timeMySQL、timeNeo4j 和 timeHive 的变化
  watch([timeMySQL, timeNeo4j, timeHive], ([timeMySQLValue, timeNeo4jValue, timeHiveValue]) => {
    // 更新图表数据
    chart.value.setOption({
      series: [
        {
          data: [timeMySQLValue, timeHiveValue, timeNeo4jValue]
        }
      ]
    });
  });

  onMounted(() => {
    chart.value = echarts.init(chartContainer.value);
    chart.value.setOption(option);
  });

  const option = {
    title: {
      text: '不同数据库查询时间',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      }
    },
    xAxis: {
      type: 'category',
      data: ['MySQL', 'Hive', 'Neo4j']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [timeMySQL.value, timeHive.value, timeNeo4j.value],
        type: 'bar',
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0, color: '#C23531' // 条形图起点颜色
              },
              {
                offset: 1, color: '#2F4554' // 条形图终点颜色
              }
            ]
          }
        }
      }
    ]
  };


  </script>

<style>
.left-align {
  display: flex;
  align-items: flex-start;
}
.movie-row {
  display: flex;
  align-items: center;
  margin-top:5%;
}
.small-input {
  width: 50%!important;
}

.vertical-line {
  position: absolute; 
  width: 1px; 
  height: 100%; 
  background-color: #a19f9f;
  left: 48%; 
  top: 0; 
  transform: translateX(-50%); 
}
.chart {
  margin-top:5%;
}

.slider-demo-block {
  display: flex;
  align-items: center;
  width:100%;
}
.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
  width: 80%;
}

.button-row {
  margin-top:10%;
}
.comment-row{
  margin-top: 5%;
}

</style>