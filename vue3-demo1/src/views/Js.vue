<script setup lang="ts">
import { ref,reactive,watch,toRefs,computed } from 'vue'//提示一下function方法是没有缓存的，但是computed是可以缓存的（重复调用不消耗）

const usr = reactive([{"name":"张三","age":18}])
// let {name,age} = usr[0]//usr是个响应式对象，解构赋值
// 但是如果用toRefs()方法，那么name和age就是响应式对象了

let {name,age} = toRefs(usr[0])
const count = ref(0)
function add() {
  count.value++
  console.log(count.value)
}
function showusr() {
  for (let i = 0; i < usr.length; i++) {
    console.log(usr[i]);
  }
}
function addage() {
  for (let i = 0; i < usr.length; i++) {
    usr[i].age++
    console.log(usr[i]);
  }
}

function changeusr() {
  name.value += "~"//这个属性是解构对象，（非响应式）所以不能改变，但其实是改了的
}

watch(()=>usr,(newVal, oldVal) =>{
  console.log('用户数据变化了', newVal, oldVal);
},{deep: true})
</script>

<template>
  <div class="container">
    <table>
      <tr>
        <th>姓名</th>
        <th>年龄</th>
      </tr>
      <tr v-for="(item, index) in usr" :key="index">
        <td>{{ name }}</td>
        <td>{{ age }}</td>

      </tr>
      <tr>
        <td>{{ count }}</td>
      </tr>
    </table>
    <div class="btn">
      <button @click="showusr">显示用户数据</button>
      <button @click="add">点击给数字加1</button>
      <button @click="addage">点击给用户年龄加1</button>
      <button @click="changeusr">点击给用户姓名添加~</button>
    </div>

  </div>
</template>

<style scoped>
.btn {
  display: flex;
  padding: 10px;
  justify-content: space-between;
  margin-top: 20px;
  width:
}
</style>
