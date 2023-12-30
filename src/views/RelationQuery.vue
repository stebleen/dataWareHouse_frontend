<template>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">按照演员和导演关系查询</el-menu-item>
      <el-sub-menu index="2">
        <template #title>按照演员合作关系查询</template>
        <el-menu-item index="3">经常合作的演员</el-menu-item>
        <el-menu-item index="4">最受关注的演员组合</el-menu-item>
      </el-sub-menu>

    </el-menu>

    <div v-if="showCards1" class="card-container">
        <h1 class="title">经常合作的导演和演员</h1>
        <el-form-item class="database">
          <el-radio-group v-model="radio" >
            <el-radio :label="1">MySQL</el-radio>
            <el-radio :label="2">Hive</el-radio>
            <el-radio :label="3">Neo4j</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="cards-wrapper">
        <el-card
            :key="index"
            v-for="(card, index) in cardData"
            :header="card.name"
            shadow="hover"
            class="card-item"
        >
            <el-row class="card-content" :gutter="20">
            <el-col span="8">
                <p>导演: {{ card.director }}</p>
            </el-col>
            <el-col span="8">
                <p>演员: {{ card.actor }}</p>
            </el-col>
            <el-col span="8">
                <p>合作次数: {{ card.num }}</p>
            </el-col>
            </el-row>
        </el-card>
        </div>
    </div>


    <div v-if="showCards2" class="card-container">
        <h1 class="title">经常合作的演员</h1>
        <el-form-item class="database">
          <el-radio-group v-model="radio" >
            <el-radio :label="1">MySQL</el-radio>
            <el-radio :label="2">Hive</el-radio>
            <el-radio :label="3">Neo4j</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="cards-wrapper">
        <el-card
            :key="index"
            v-for="(card, index) in cardData"
            :header="card.name"
            shadow="hover"
            class="card-item"
        >
            <el-row class="card-content" :gutter="20">
            <el-col span="8">
                <p>演员: {{ card.actor1 }}</p>
            </el-col>
            <el-col span="8">
                <p>演员: {{ card.actor2 }}</p>
            </el-col>
            <el-col span="8">
                <p>合作次数: {{ card.num }}</p>
            </el-col>
            </el-row>
        </el-card>
        </div>
    </div>

    <div v-if="showCards3" class="card-container">
        <h1 class="title">最受关注的演员组合</h1>
        <el-row :gutter="20" style="display: flex; justify-content: center;">
          <el-col span="12">
            <el-form-item>
              <el-radio-group v-model="radio" >
                <el-radio :label="1">MySQL</el-radio>
                <el-radio :label="2">Hive</el-radio>
                <el-radio :label="3">Neo4j</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <span>输入电影类型&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <el-input
            v-model="inputType"
            class="input"
            placeholder="Please Input Movie Type"
            :prefix-icon="Search"
            />
          </el-col>
        </el-row>
        
        <div class="cards-wrapper">
        <el-card
        :key="index"
        v-for="(card, index) in cardData"
        :header="card.name"
        shadow="hover"
        class="card-item"
        >
            <el-row class="card-content" :gutter="20">
            <el-col span="12">
                <p>演员: {{ card.actor1 }}</p>
            </el-col>
            <el-col span="12">
                <p>演员: {{ card.actor2 }}</p>
            </el-col>
            
            </el-row>
        </el-card>
        </div>
    </div>

  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { Search } from '@element-plus/icons-vue'

  const inputType = ref('');
  const radio = ref(1);

  
  const activeIndex = ref('1');

  const showCards1 = ref(false);
  const showCards2 = ref(false);
  const showCards3 = ref(false);

  const cardData = ref([]);


  const handleSelect = async (index) => {
    activeIndex.value = index;
    showCards1.value = false; 
    showCards2.value = false; 
    showCards3.value = false; 

    if (index === '1') {
      if (radio.value === 1) {
        await fetchMySQLData();
      } else if (radio.value === 2) {
        await fetchHiveData();
      } else if (radio.value === 3) {
        await fetchNeo4jData();
      }
      showCards1.value = true;
      showCards2.value = false;
      showCards3.value = false;
    } else if (index === '3') {
      showCards1.value = false;
      showCards2.value = true;
      showCards3.value = false;
      if (radio.value === 1) {
        await fetchMySQLData();
      } else if (radio.value === 2) {
        await fetchHiveData();
      } else if (radio.value === 3) {
        await fetchNeo4jData();
      }
    } else if (index === '4') {
      showCards1.value = false;
      showCards2.value = false;
      showCards3.value = true;
      if (radio.value === 1) {
        await fetchMySQLData();
      } else if (radio.value === 2) {
        await fetchHiveData();
      } else if (radio.value === 3) {
        await fetchNeo4jData();
      }
    }
  };

  const fetchMySQLData = async () => {
    try {
      const response = await fetch('https://mock.apifox.com/m1/3838210-0-default/neo4j/cooperation/actor_director');
      const responseData = await response.json();
      console.log('fetchMySQLData:',responseData.relation);

      showCards1.value = true;
      cardData.value = [];
      cardData.value = responseData.relation.map(item => ({
        director: item.director,
        actor: item.actor,
        num: item.number.toString() // Convert to string if needed
      }));
      
    } catch (error) {
      console.error('Error fetching MySQL data:', error);
    }
  };

  const fetchHiveData = async () => {
    try {
      const response = await fetch('https://mock.apifox.com/m1/3838210-0-default/neo4j/cooperation/actor_director');
      const responseData = await response.json();
      console.log('fetchHiveData:',responseData.relation);
      
      cardData.value = [];
      cardData.value = responseData.relation.map(item => ({
        director: item.director,
        actor: item.actor,
        num: item.number.toString() // Convert to string if needed
      }));

    } catch (error) {
      console.error('Error fetching Hive data:', error);
    }
  };

  const fetchNeo4jData = async () => {
    try {
      const response = await fetch('https://mock.apifox.com/m1/3838210-0-default/neo4j/cooperation/actor_director');
      const responseData = await response.json();
      console.log('fetchNeo4jData:',responseData.relation);
      
      cardData.value = [];
      cardData.value = responseData.relation.map(item => ({
        director: item.director,
        actor: item.actor,
        num: item.number.toString() // Convert to string if needed
      }));
    } catch (error) {
      console.error('Error fetching Neo4j data:', error);
    }
  };

  onMounted(() => {
    fetchMySQLData();
  });

  
  // const handleSelect = (index) => {
  //   activeIndex.value = index;
  //   if (index === '1') {
  //       performActorDirectorQuery();
  //   } else if (index === '3') {
  //       performActorCollaborationQuery();
  //   } else if (index === '4'){
  //       performPopularActorQuery();
  //   }
  // };

  // const performActorDirectorQuery = () => {
  //   showCards2.value = false;
  //   showCards3.value = false;
  //   cardData.value = [
  //       { director: '导演A', actor: '演员A', num:'5' },
  //       { director: '导演B', actor: '演员B', num:'5' },
  //       { director: '导演A', actor: '演员A', num:'5' },
  //       { director: '导演B', actor: '演员B', num:'5' },
  //       { director: '导演A', actor: '演员A', num:'5' },
  //       { director: '导演B', actor: '演员B', num:'5' },
  //       { director: '导演A', actor: '演员A', num:'5' },
  //       { director: '导演B', actor: '演员B', num:'5' },
  //       { director: '导演A', actor: '演员A', num:'5' },
  //       { director: '导演B', actor: '演员B', num:'5' },
  //       { director: '导演A', actor: '演员A', num:'5' },
  //       { director: '导演B', actor: '演员B', num:'5' },
  //   ];
  //   showCards1.value = true;
  // };

  // const performActorCollaborationQuery = () => {
  //   showCards1.value = false;
  //   showCards3.value = false;
  //   cardData.value = [
  //       { actor1: '演员A', actor2: '演员A', num:'5' },
  //       { actor1: '演员A', actor2: '演员A', num:'5' },
  //       { actor1: '演员A', actor2: '演员A', num:'5' },
  //       { actor1: '演员A', actor2: '演员A', num:'5' },
  //       { actor1: '演员A', actor2: '演员A', num:'5' },
  //       { actor1: '演员A', actor2: '演员A', num:'5' },
  //       { actor1: '演员A', actor2: '演员A', num:'5' },
  //       { actor1: '演员A', actor2: '演员A', num:'5' },
  //   ];
  //   showCards2.value = true;
  // };

  // const performPopularActorQuery = () => {
  //   showCards1.value = false;
  //   showCards2.value = false;
  //   cardData.value = [
  //       { actor1: '演员A', actor2: '演员A' },
  //       { actor1: '演员A', actor2: '演员A' },
  //       { actor1: '演员A', actor2: '演员A' },
  //       { actor1: '演员A', actor2: '演员A' },
  //       { actor1: '演员A', actor2: '演员A' },
  //       { actor1: '演员A', actor2: '演员A' },
  //       { actor1: '演员A', actor2: '演员A' },
  //       { actor1: '演员A', actor2: '演员A' },
  //   ];
  //   showCards3.value = true;
  // };
  // onMounted(() => {
  //   performActorDirectorQuery(); // 初始化数据
  // });

  
  </script>
  <style>
  .database {
    margin-left:40%;
  }
  
  .title {
    margin-bottom: 20px;
  }
  
  .cards-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    max-width: 1200px;
    width: 100%;
  }
  .input{
    width:50%!important;
  }

  </style>