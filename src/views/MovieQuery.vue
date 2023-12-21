<template>
    <div style="height: 100vh;"> 
      <el-row style="height: 100%;"> 
        <el-col :span="12">
          <div class="grid-content ep-bg-purple" style="height: 100%;">
            <el-form-item class="movie-row"> 
                <span class="text-gray-600 inline-flex items-center">电影名称</span>
                <el-input
                v-model="form.title"
                class="small-input"
                placeholder="Type something"
                :prefix-icon="Search"
                />
          
                <!-- <el-input
                    v-model="input1"
                    class="w-50 m-2"
                    placeholder="Pick a date"
                    :suffix-icon="Calendar"
                /> -->
            </el-form-item>
            <el-form-item class="movie-row"> 
                <span class="text-gray-600 inline-flex items-center">电影类别</span>
                <el-input
                v-model="form.category"
                class="small-input"
                placeholder="Type something"
                :prefix-icon="Search"
                />
            </el-form-item>
            <el-form-item class="movie-row"> 
                <span class="text-gray-600 inline-flex items-center">上映时间</span>
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
                <span class="text-gray-600 inline-flex items-center">演员名字</span>
                <el-input
                v-model="form.actor"
                class="small-input"
                placeholder="Type something"
                :prefix-icon="Search"
                />
            </el-form-item>
            <el-form-item class="movie-row"> 
                <span class="text-gray-600 inline-flex items-center">主演名字</span>
                <el-input
                v-model="form.starring"
                class="small-input"
                placeholder="Type something"
                :prefix-icon="Search"
                />
            </el-form-item>
            <el-form-item class="movie-row"> 
                <span class="text-gray-600 inline-flex items-center">导演名字</span>
                <el-input
                v-model="form.director"
                class="small-input"
                placeholder="Type something"
                :prefix-icon="Search"
                />
            </el-form-item>
            <el-form-item label="正面评价">
                <div class="slider-demo-block">
                    <el-slider v-model="form.positive" show-input />
                </div>
            </el-form-item>

            <el-form-item label="评分">
                <el-input-number
                v-model="form.movieMinScore"
                size="mini"
                :precision="2"
                :step="0.01"
                :max="form.movieMaxScore"
                :min="0"
                />
                至
                <el-input-number

                size="mini"
                :precision="2"
                :step="0.01"
                :max="5"
                :min="0"
                />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="searchMovie">查询</el-button>
                <el-button @click="onCancel">取消</el-button>
            </el-form-item>
          </div>
        </el-col>
        <div class="vertical-line"></div> 
        <el-col :span="12">
          <div class="grid-content ep-bg-purple-light" style="height: 100%;">

          </div>
        </el-col>
      </el-row>
    </div>
  </template>

  <script setup>
  import { ref } from 'vue'
  import { 
    // Calendar, 
    Search } from '@element-plus/icons-vue'

  const form = ref({
    title: '',
    region: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
    category: '',
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


  </script>

<style>
.movie-row {
  display: flex;
  align-items: center;
}
.small-input {
  width: 50%!important;
}

.vertical-line {
  position: absolute; 
  width: 1px; 
  height: 100%; 
  background-color: #a19f9f;
  left: 50%; 
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

</style>