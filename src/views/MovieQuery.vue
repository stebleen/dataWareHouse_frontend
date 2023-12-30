<template>
    <div style="height: 100vh;"> 
      <el-row style="height: 100%;"> 
        <el-col :span="10">
          <div class="grid-content ep-bg-purple" style="height: 100%;">
            <el-card style="width: 90%;">
            <el-form-item class="database">
              <el-radio-group v-model="radio" >
                <el-radio :label="1">MySQL</el-radio>
                <el-radio :label="2">Hive</el-radio>
                <el-radio :label="3">Neo4j</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item class="movie-row"> 
                <span class="text-gray-600 inline-flex items-center" style="margin-right: 15px;">电影名称</span>
                <el-input
                v-model="form.title"
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
                <span class="text-gray-600 inline-flex items-center" style="margin-right: 15px;">主演名字</span>
                <el-input
                v-model="form.starring"
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
                <div class="slider-demo-block">
                    <el-slider v-model="form.positive" show-input />
                </div>
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
        <el-col :span="14">
          <div class="grid-content ep-bg-purple-light" style="height: 100%;">
            <p>一共有{{ movieNumber }}个查询结果</p>
            <el-table :data="tableData" stripe style="width: 100%">
              <el-table-column prop="id" label="电影ID" width="180" />
              <el-table-column prop="title" label="电影名" width="180" />
              <el-table-column prop="version" label="电影版本" width="180" />
              <el-table-column prop="date" label="上映日期" width="180" />
            </el-table>
            
          </div>
        </el-col>
      </el-row>
    </div>
  </template>

  <script setup>
  import { ref
    // , onMounted 
  } from 'vue';
  import { 
    // Calendar, 
    Search } from '@element-plus/icons-vue';



  const radio = ref(1);

  const form = ref({
    title: '',
    version: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
    category: '',
    radio:'',
    // movieDirectors: [],
    // movieMainActors: [],
    // movieActors: [],
    actor: '',
    starring: '',
    director: '',
    movieMinScore: 0,
    movieMaxScore: 5.0,
    movieDate: [],
    positive: 0
  });

  const movieNumber=ref(0);

  const tableData = [
    { id: 1, title: '电影A', version: '1.0', date: '2023-01-15' },
    { id: 2, title: '电影B', version: '2.0', date: '2023-02-20' },
    { id: 3, title: '电影C', version: '1.5', date: '2023-03-10' },
    { id: 4, title: '电影D', version: '3.0', date: '2023-04-05' },
    { id: 5, title: '电影E', version: '2.5', date: '2023-05-18' },
  ];





  </script>

<style>
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
  left: 40%; 
  top: 0; 
  transform: translateX(-50%); 
}
/* .block{
  width: 50%;
} */

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
  margin-top: 7%;
}

</style>