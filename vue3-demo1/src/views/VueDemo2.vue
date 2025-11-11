<template>
    <div class="container">
        <table>
            <thead>
                <tr class="t-head">
                    <th>序号</th>
                    <th>姓名</th>
                    <th>性别</th>
                    <th>年龄</th>
                    <th>爱好</th>
                </tr>
            </thead>
            <tbody>
                <!--:v-bind的语法糖， -->
                <tr v-for="(item,index) in peopleList" :key="index">
                    <td>{{ index+1 }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.sex }}</td>
                    <td>{{ item.age }}</td>
                    <td>{{ item.hobby }}</td>
                </tr>
            </tbody>
        </table>
        <br/>
        <!-- @v-on的语法糖，可以绑定方法、事件、修饰符、Inline Statement（表达式count++诸如此类） -->
        <span>{{ count }}</span>
        <br/>
        <button @click="decrement" style="font-size: 10px;">-</button>
        <br/>
        <button @click="increment" style="font-size: 10px;">+</button>
        <br/>
        <input type="text" v-model="inputName" placeholder="请输出姓名"/>
        <div>输入的姓名是：{{ inputName }}</div>
        <br/>
        <div class="area" v-on="{click: btnClick,mousemove: mouseMove}">监听鼠标移动和点击</div>
        <!-- 条件渲染+Inline Statement-->
        <button @click="isShow = !isShow">{{ isShow ? '隐藏' : '显示' }}</button>
        <h2 v-if="isShow">条件渲染</h2>
        <!-- 选择渲染 -->
        <br/>
        <p v-if="currentPerson && currentPerson.age < 18">18岁以下</p>
        <p v-else-if="currentPerson && currentPerson.age >= 18">18岁以上</p>
        <p v-else>不在名单中</p>
        <!-- 显示渲染 -->
        <!-- 调整年龄Inline Statement -->
        <button @click="currentPerson.age++">年龄+1</button>
        <button @click="currentPerson.age--">年龄-1</button>

    </div>
</template>

<script>
export default {
  name: 'ComponentName',
  data() {
    return {
      // 数据属性
      isShow: true
      ,count: 0
      ,peopleList: [
        { name: '张三', sex: '男', age: 18, hobby: '看小电影' },
        { name: '李四', sex: '女', age: 11, hobby: '看小说' },
        { name: '王五', sex: '未知', age: 30, hobby: '听音乐' },
        { name: '赵六', sex: '保密', age: 12, hobby: '看电影' }
      ]
      ,inputName: ''
    }
  },
  methods: {
    // 方法
    increment() {
        this.count++
    }
    ,decrement() {
        this.count--
    }
    ,btnClick() {
        console.log('按钮被点击了')
    }
    ,mouseMove() {
        console.log('鼠标移动了')
    }
  },
  mounted() {
    // 生命周期钩子
  },
  computed: {
    currentPerson() {
      return this.peopleList.find(person => person.name === this.inputName)
    }
  }
}
</script>

<style scoped>
/* 这里写样式 */
table{
    border-collapse: collapse;
    width: 100%;
    border: 1px solid #b42020;
    text-align: center;
    border-inline: 1px solid #b42020;
}
th, td {
            border: 1px solid #333; /* 为所有表头单元格和标准单元格添加边框 */
            padding: 8px 12px; /* 添加内边距，使内容不紧贴边框，更美观 */
        }

.t-head {
    background: linear-gradient(to right, #32961e, #097462); /* 可选：为表头设置浅灰色背景，增强可读性 */
}

.area {
    width: 100px;
    height: 100px;
    color: #000;;
    background: #ddd;
    margin: 4px;
}
</style>