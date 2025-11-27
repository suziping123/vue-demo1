<!-- todo_list:
 1 setup与组合式API的使用
 2 reactive与ref的使用与对比
 3 响应式系统的原理
 4 计算属性与侦听器的使用
 5 组件的使用
 6 路由的使用
  -->
 <template>
   <div class="information">
    <div>姓名：{{ name }}</div>
    <div>年龄：{{ age.age }}</div>
    <button class="agebt" @click="addAge">年龄+1</button>
    <button class="agebt" @click="reduceAge">年龄-1</button>
    <div>出生年份：{{ age.birth }}</div>
    <p>爱好：</p>
    <ul>
        <li v-for="(hobby, index) in hobbies" :key="index">{{ hobby }}</li>
    </ul>

    请输入姓名：<input type="text" v-model="name"/>
    <br/>
    请输入年龄：<input type="text" v-model="age.age"/>
    <br/>
    请输入出生年份：<input type="text" v-model="age.birth"/>
    <br/>
    <div>
        <input type="text" placeholder="请输入新的爱好" ref="inputHb"/>
        <button @click="addHobby">添加爱好</button>
    </div>
    
   </div>
 </template>
 
 <script setup lang="ts">
     // 这里写逻辑
    import { ref, reactive, watch } from 'vue'
    const name = ref('张三')

    // 这里是用age作响应式proxy来接收reaction
    const age = reactive({
        age: 20,
        birth: '2005'
    })
    function addAge() {
        age.age++;
    }
    function reduceAge() {
        age.age--;
    }
    // 这里用watch监听年龄和出生年份的变化
    watch(()=>age.age, (newVal, oldVal) => {
        console.log('年龄变化了', newVal, oldVal)
        if (newVal !== oldVal ) {
            age.birth = changeBirth(newVal).toString()
            console.log(`年龄变为 ${oldVal}，已更新出生日期为：${age.birth}`);
        }
    })
    watch(()=>age.birth, (newVal, oldVal) => {
        console.log('出生日期变化了', newVal, oldVal)
        if (newVal !== oldVal ) {
            age.age = changeAge(newVal)
            console.log(`出生日期变为 ${oldVal}，已更新年龄为：${age.age}`);
        }
    })
    // watch可以不止监听一个变量，也可以监听多个变量
    watch(()=>[age.age, age.birth], (newVal, oldVal) => {
        console.log('年龄和出生日期都变化了', newVal, oldVal)
    })
    // watch可以深度监听{deep: true}，意思是监听对象内部属性的变化，但是
    watch(()=>age, (newVal, oldVal) => {
        console.log('年龄和出生日期都变化了', newVal, oldVal)
    }, {deep: true})

    function changeBirth(age: number) {
        const today = new Date()
        const birth = today.getFullYear() - age
        return birth
    }
    function changeAge(birth: string) {
        const today = new Date()
        const birthYear = parseInt(birth,10)
        const age = today.getFullYear() - birthYear
        return age
    }
    // 这里是关于hobbies的逻辑
    const hobbies = ref(['打篮球', '打足球', '打乒乓球'])
    // inputHb是一个类型为HTMLInputElement的ref，InputElement是输入框的原生类型
    const inputHb = ref<HTMLInputElement | null>(null)
    function addHobby() {
        if (inputHb.value) {
            hobbies.value.push(inputHb.value.value)
            //清空输入框
            inputHb.value.value = ''
        }
    }
 </script>
 
 <style scoped>
 /* 这里写样式 */
 .information {
  padding: 20px;
  font-family: Arial, sans-serif;
  width: 100%; /* 让内容占满整个容器 */
  max-width: none; /* 移除最大宽度限制 */
}

.agebt {
    border-radius: 5px;
    background: linear-gradient(to left,#9382f1,#96e4fc);
}

.agebt:hover{
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
    background: linear-gradient(to right,#9382f1,#96e4fc);
    transition: all 1s
}


input {
  margin: 5px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

div {
  margin: 10px 0;
}
 </style>