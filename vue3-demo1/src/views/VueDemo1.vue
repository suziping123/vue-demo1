<template>
    <span>{{ count }}</span>
    <!-- v-on 绑定事件,缩写为 @ -->
    <button @click="count++">点我加1</button>
    <button @click="count--">点我减1</button>
  <div>
    
  </div>
</template>

<script setup>
// 这里写逻辑
    import { ref } from 'vue'
    const count = ref(0)
</script>

<style scoped>
/* 这里写样式 */
span {
  color: red;
  font-weight: bold;
}
button {
  background-color: blue;
  color: white;
}
</style>