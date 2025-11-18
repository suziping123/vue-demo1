<!--
 * @Author: suziping123 3268845120@qq.com
 * @Date: 2025-11-18 10:49:18
 * @LastEditors: suziping123 3268845120@qq.com
 * @LastEditTime: 2025-11-18 13:43:05
 * @FilePath: \vue-demo1\vue3-demo1\src\views\Vue3demo3.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
    <div>
        <!-- ⻚⾯操作数据不需要 .value -->
        <div>姓名：{{ name }}</div>
        <div>年龄：{{ age }}</div>
        请输⼊姓名：<input type="text" v-model="name">
        <br>
        <button @click="add">年龄+1</button>
        <br>
        爱好：
        <ul>
            <li :key="item" v-for="item in hobby">{{ item }}</li>
        </ul>
        <button @click="addHobby">添加爱好</button>
        </div>
    <div class="message">
      <h1>{{ message }}</h1>
      <hr/>
      <h1>{{ reversedMessage(message) }}</h1>
    </div>
</template>

<script setup lang="ts">
// 这里写逻辑
import {reactive, ref} from "vue";
// name和age是⼀个RefImpl的实例对象，简称ref对象，它们的value属性是响应式的。
let name = ref('张三')
let age = ref(18)
// 使⽤reactive⽅法创建响应式对象
let hobby = reactive(['吃饭', '睡觉', '打⾖⾖'])
// 其他对象格式
let user = reactive({id: 1, name: '张三', age: 18})
console.log(user.id)
let userList = reactive([{id: 1, name: '张三', age: 18}, {id: 2, name: '张三', age: 18}])
console.log(userList[0].id)
// ⽅法
function add() {
 // JS中操作ref对象时候需要 .value
 age.value++
 console.log(age.value)
}
function addHobby() {
 hobby.push('看电影')
}

const message = "江畔何人初见月，江月何年初照人？";
function reversedMessage(message: string) {
    return message.split('，').reverse().join('');
}
</script>

<style scoped>
/* 这里写样式 */
.message {
    color:black;
    background: linear-gradient(to Right,#f2da63,#fe00d8);
    border-radius: 10px;
    margin: 20px 20px;
    min-height: 300px; /* 确保有足够高度体现垂直居中 */
    text-align: center;
    padding: 20px;
    /* Flexbox 居中 */
    display: flex;
    flex-direction: column;
    justify-content: center; /* 水平居中 */
    align-items: center;     /* 垂直居中 */ 
}
</style>