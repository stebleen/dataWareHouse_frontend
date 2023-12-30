<template>
    <el-tabs type="border-card">
        <h1>MySQL</h1>
        <!-- <el-tab-pane label="MySQL"> -->
            <el-table :data="MySQLData" stripe style="width: 100%">
                <el-table-column prop="actor1" label="演员1" />
                <el-table-column prop="actor2" label="演员2" />
                <el-table-column prop="number" label="合作次数" />
            </el-table>
        <!-- </el-tab-pane> -->
        <h1>Hive</h1>
        <!-- <el-tab-pane label="Hive"> -->
            <el-table :data="HiveData" stripe style="width: 100%">
                <el-table-column prop="actor1" label="演员1" />
                <el-table-column prop="actor2" label="演员2" />
                <el-table-column prop="number" label="合作次数" />
            </el-table>
        <!-- </el-tab-pane> -->
        <h1>Neo4j</h1>
        <!-- <el-tab-pane label="Neo4j"> -->
            <el-table :data="Neo4jData" stripe style="width: 100%">
                <el-table-column prop="actor1" label="演员1" />
                <el-table-column prop="actor2" label="演员2" />
                <el-table-column prop="number" label="合作次数" />
            </el-table>
        <!-- </el-tab-pane> -->
    </el-tabs>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

const MySQLData = ref([]);
const HiveData = ref([]);
const Neo4jData = ref([]);

const fetchMySQLData = async () => {
    try {
      const response = await fetch('https://mock.apifox.com/m1/3838210-0-default/neo4j/cooperation/actor_director');
      const responseData = await response.json();
      console.log('fetchMySQLData:',responseData.relation);

      MySQLData.value = responseData.relation;
      
    } catch (error) {
      console.error('Error fetching MySQL data:', error);
    }
};

const fetchHiveData = async () => {
    try {
      const response = await fetch('https://mock.apifox.com/m1/3838210-0-default/neo4j/cooperation/actor_director');
      const responseData = await response.json();
      console.log('fetchHiveData:',responseData.relation);

      HiveData.value = responseData.relation;
      
    } catch (error) {
      console.error('Error fetching Hive data:', error);
    }
};

const fetchNeo4jData = async () => {
    try {
      const response = await fetch('https://mock.apifox.com/m1/3838210-0-default/neo4j/cooperation/actor_director');
      const responseData = await response.json();
      console.log('fetchNeo4jData:',responseData.relation);

      Neo4jData.value = responseData.relation;
      
    } catch (error) {
      console.error('Error fetching Neo4j data:', error);
    }
};

onMounted(async () => {
  await fetchMySQLData();
  await fetchHiveData();
  await fetchNeo4jData();

  await nextTick(); // 等待下一次DOM更新
});
</script>