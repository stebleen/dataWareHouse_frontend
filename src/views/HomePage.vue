<template>
  <el-container>
    <el-aside>
      <SideBar :selectedMenu="selectedComponent" @MenuSelect="handleMenuSelect" />
    </el-aside>
    <el-main>
      <MovieQuery v-if="selectedComponent === 'MovieQuery'" />
      <RunTime v-if="selectedComponent === 'RunTime'" />
      <RelationQuery v-if="selectedComponent === 'RelationQuery'" />
      <TraceQuery v-if="selectedComponent === 'TraceQuery'" />
    </el-main>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import MovieQuery from './MovieQuery.vue'
import RunTime from './RunTime.vue'
import SideBar from './SideBar.vue'
import TraceQuery from './TraceQuery.vue'
import RelationQuery from './RelationQuery.vue'

const selectedComponent = ref('')

const handleMenuSelect = (param) => {
  const item = param.item

  if (item === '1-1') {
    selectedComponent.value = 'MovieQuery'
  } else if (item === '1-2') {
    selectedComponent.value = 'RelationQuery'
  } else if (item === '2') {
    selectedComponent.value = 'TraceQuery'
  } else if (item === '3') {
    selectedComponent.value = 'RunTime'
  }
}
</script>