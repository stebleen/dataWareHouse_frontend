<template>
    <el-tabs type="border-card">
        <div class="input">
            <el-row>
                <el-col span="12">
                    <el-input v-model="inputType" placeholder="Please Input Movie Type" :prefix-icon="Search">
                        <!-- <template #append>
                        <span>输入电影类型</span>
                        </template> -->
                    </el-input>
                </el-col>
                <el-col span="12">
                    <el-button class="type-button" @click="searchType">查询</el-button>
                </el-col>
            </el-row>
        </div>
        <h1>MySQL</h1>
        <!-- <el-tab-pane label="MySQL"> -->
            <el-table :data="MySQLData" stripe style="width: 100%">
                <el-table-column prop="actor1" label="演员1" />
                <el-table-column prop="actor2" label="演员2" />
                <el-table-column prop="heat" label="热度" />
            </el-table>
        <!-- </el-tab-pane> -->
        <h1>Hive</h1>
        <!-- <el-tab-pane label="Hive"> -->
            <el-table :data="HiveData" stripe style="width: 100%">
                <el-table-column prop="actor1" label="演员1" />
                <el-table-column prop="actor2" label="演员2" />
                <el-table-column prop="heat" label="热度" />
            </el-table>
        <!-- </el-tab-pane> -->
        <h1>Neo4j</h1>
        <!-- <el-tab-pane label="Neo4j"> -->
            <el-table :data="Neo4jData" stripe style="width: 100%">
                <el-table-column prop="actor1" label="演员1" />
                <el-table-column prop="actor2" label="演员2" />
                <el-table-column prop="heat" label="热度" />
            </el-table>
        <!-- </el-tab-pane> -->
    </el-tabs>
</template>

<script setup>
import { ref, onMounted, nextTick} from 'vue'
import { Search } from '@element-plus/icons-vue'

const inputType = ref('');

const MySQLData = ref([]);
const HiveData = ref([]);
const Neo4jData = ref([]);

const searchType = () =>{
    console.log('input',inputType.value);
    fetchHiveData(inputType.value);
    fetchMySQLData(inputType.value);
    fetchNeo4jData(inputType.value);
}

const fetchMySQLData = async (category) => {
    try {
        const queryParams = new URLSearchParams();
        queryParams.append('category', category);

        const response = await fetch(`https://mock.apifox.com/m1/3838210-0-default/neo4j/cooperation/high_heat_actors?apifoxApiId=137819497`);

        const responseData = await response.json();
        console.log('fetchMySQLData:',responseData.relation);

        MySQLData.value = responseData.relation;
      
    } catch (error) {
        console.error('Error fetching MySQL data:', error);
    }
};

const fetchHiveData = async (category) => {
    try {
        const queryParams = new URLSearchParams();
        queryParams.append('category', category);

        // const response = await fetch(`https://mock.apifox.com/m1/3838210-0-default/neo4j/cooperation/high_heat_actors?${queryParams.toString()}`);

        const response = await fetch(`https://mock.apifox.com/m1/3838210-0-default/neo4j/cooperation/high_heat_actors?apifoxApiId=137819497`);

        const responseData = await response.json();
        console.log('fetchHiveData:',responseData.relation);

        HiveData.value = responseData.relation;
      
    } catch (error) {
        console.error('Error fetching Hive data:', error);
    }
};

const fetchNeo4jData = async (category) => {
    try {
        const queryParams = new URLSearchParams();
        queryParams.append('category', category);

        // const response = await fetch(`https://mock.apifox.com/m1/3838210-0-default/neo4j/cooperation/high_heat_actors?${queryParams.toString()}`);

        const response = await fetch(`https://mock.apifox.com/m1/3838210-0-default/neo4j/cooperation/high_heat_actors?apifoxApiId=137819497`);


        const responseData = await response.json();
        console.log('fetchNeo4jData:',responseData.relation);

        Neo4jData.value = responseData.relation;
      
    } catch (error) {
        console.error('Error fetching Neo4j data:', error);
    }
};

onMounted(async () => {
  await fetchMySQLData(inputType.value);
  await fetchHiveData(inputType.value);
  await fetchNeo4jData(inputType.value);

  await nextTick(); // 等待下一次DOM更新
});
</script>

<style scoped>
.input{
    margin-top: 3%;
    margin-bottom:3%;
}
</style>