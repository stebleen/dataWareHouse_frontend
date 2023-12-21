<template>
    <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        text-color="#fff"
        :default-active="selectedMenu" 
        @select="MenuSelect"
        style="height: 100vh;"
    >
        <el-sub-menu index="1">
            <template #title>
                <el-icon><location /></el-icon>
                <span>数据应用</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="1-1">
                    <el-icon><icon-menu /></el-icon>
                    <span>电影查询</span>
                </el-menu-item>
                <el-menu-item index="1-2">
                    <el-icon><icon-menu /></el-icon>
                    <span>关系查询</span>
                </el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <span>溯源查询</span>
        </el-menu-item>
        <el-menu-item index="3">
            <el-icon><document /></el-icon>
            <span>执行时间</span>
        </el-menu-item>
    </el-menu>

</template>

<script setup>
import { defineEmits } from 'vue'
import { defineProps, ref } from 'vue'

const props = defineProps({
  selectedMenu: String,
})

const emit = defineEmits(['MenuSelect'])
const selectedMenu = ref(props.selectedMenu) // 创建一个响应式变量，初始值为 props.selectedMenu

const MenuSelect = (value) => {
  selectedMenu.value = value // 更新 selectedMenu 的值

  let param = {
    item: value
  }

  emit('MenuSelect', param)
}
</script>

<style scoped>

</style>