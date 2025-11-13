<template>
<div id = "VueTest1">
    <div class="center_box">
        <div class="counnter">
            {{ count }}
        </div>
        <button @click="increment">+</button>
        <button @click="decrement">-</button>
    </div>
    <br/>
    <hr/>
    <div class="search_box" >
        <input class="my_box" v-model="searchForm.name" type="text" placeholder="请输入姓名" />
        <input class="my_box" v-model="searchForm.age" type="text" placeholder="请输入年龄" />
        <input class="my_box" v-model="searchForm.hobby" type="text" placeholder="请输入爱好" />
        <!-- <div class="gender-radio-group">
            <label>性别：</label>
            <label>
                <input type="radio" v-model="searchForm.sex" value="">全部
            </label>
            <label>
                <input type="radio" v-model="searchForm.sex" value="男">男
            </label>
            <label>
                <input type="radio" v-model="searchForm.sex" value="女">女
            </label>
        </div> -->
        <select v-model="searchForm.sex" style="width: auto; height: auto;">
            <option value="男">男</option>
            <option value="女">女</option>
            <option value="">全部</option>
        </select>
        <button @click="resetSearch">重置</button>
    </div>
    <table>
        <thead>
            <tr>
                <th>序号</th>
                <th>姓名</th>
                <th>性别</th>
                <th>年龄</th>
                <th>爱好</th>
                <th>操作</th>
            </tr>
        </thead>
        <tr v-for="(item,index) in filteredList" :key="index">
            <td >{{ index+1 }}</td>
            <td>
                <span v-show="!item.isEditing">{{ item.name }}</span>
                <input v-show="item.isEditing" v-model="item.editName" class="edit-input">
            </td>
            <td >
                <span v-show="!item.isEditing">{{ item.sex }}</span>
                <select v-show="item.isEditing" v-model="item.editSex" class="edit-input">
                    <option value="男">男</option>
                    <option value="女">女</option>
                </select>
            </td>
            <td >
                <span v-show="!item.isEditing">{{ item.age }}</span>
                <input v-show="item.isEditing" v-model.number="item.editAge" type="number" class="edit-input">
            </td>
            <td >
                <span v-show="!item.isEditing">{{ item.hobby }}</span>
                <input v-show="item.isEditing" v-model="item.editHobby" class="edit-input">
            </td>
            <td >
                <button @click="startEdit(item)">编辑</button>
                <button @click="remove(item)">删除</button>

                <!-- 编辑状态下的按钮 -->
                <button v-show="item.isEditing" @click="saveEdit(item)" class="save-btn">保存</button>
                <button v-show="item.isEditing" @click="cancelEdit(item)" class="cancel-btn">取消</button>
            </td>
        </tr>

    </table>
</div>

</template>

<script lang="ts">
// 这里写逻辑
    export default {
        name: 'VueTest1',
        data() {
            return {
                count: 0,
                PersonList:[
                    {"name":"张三","sex":"男","age":18,"hobby":"看电影"},
                    {"name":"李四","sex":"女","age":11,"hobby":"看小说"},
                    {"name":"王五","sex":" 男","age":30,"hobby":"听音乐"},
                    {"name":"赵六","sex":"女","age":12,"hobby":"看电影"},
                    {"name":"小七","sex":"女","age":18,"hobby":"看电影"},
                ].map(item => ({
                    ...item,
                    isEditing: false, // 编辑状态标识
                    editName: item.name,
                    editAge: item.age,
                    editSex: item.sex,
                    editHobby: item.hobby
                })),
                searchForm: { 
                    name: "",
                    age: "",
                    hobby: "",
                    sex: "" 
                }
            }
        },
        methods: {
            increment() {
                this.count++;
            },
            decrement() {
                this.count--;
            },
            // 开始编辑
            startEdit(item: any) {
                // 先取消其他项的编辑状态
                this.PersonList.forEach(person => {
                    if (person !== item && person.isEditing) {
                        this.cancelEdit(person);
                    }
                });

                // 设置当前项为编辑状态
                item.isEditing = true;
                // 备份原始数据
                item.editName = item.name;
                item.editAge = item.age;
                item.editSex = item.sex;
                item.editHobby = item.hobby;
            },

            // 保存编辑
            saveEdit(item: any) {
                if (!item.editName.trim()) {
                    alert('姓名不能为空！');
                    return;
                }

                // 更新数据
                item.name = item.editName;
                item.age = item.editAge;
                item.sex = item.editSex;
                item.hobby = item.editHobby;
                item.isEditing = false;

                console.log('保存编辑:', item);
            },

            // 取消编辑
            cancelEdit(item: any) {
                item.isEditing = false;
                // 恢复备份数据
                item.editName = item.name;
                item.editAge = item.age;
                item.editSex = item.sex;
                item.editHobby = item.hobby;
            },
            remove(item: any) {
                const index = this.PersonList.indexOf(item);
                if (index > -1) {
                    this.PersonList.splice(index, 1);
                    console.log(item);
                }
            },
            resetSearch() {
                this.searchForm = { name: "", age: "", hobby: "", sex: "" };
            },
        },
        computed: {
            filteredList() {
                return this.PersonList.filter((item) => {
                    const matchName = !this.searchForm.name || item.name.includes(this.searchForm.name);
                    const matchAge = !this.searchForm.age || String(item.age).includes(this.searchForm.age);
                    const matchSex = !this.searchForm.sex || item.sex.includes(this.searchForm.sex);
                    const matchHobby = !this.searchForm.hobby || item.hobby.includes(this.searchForm.hobby);
                    return matchName && matchAge && matchSex && matchHobby;
                });
            },
        },
    }

</script>

<style scoped>
#VueTest1 {
    max-width: 1200px; /* 设置最大宽度 */
    margin: 0 auto;    /* 水平居中 */
    padding: 20px;     /* 添加内边距 */
}
/* 这里写样式 */
button{
    width: auto;
    height: 30px;
    border-radius: 10px;
    background-color: #fe864f;
    color: #fff;
    font-size: 16px;
    border: none;
    cursor: pointer;
}
td{
   text-align: center; 
}
thead{
    
    background: linear-gradient(to Right,#a8ef9b,#a5e117);
}
table{
    width: 100%;
    /* 合并单元格 */
    border-collapse: collapse;
    background: #ddd;
}
/* 优化下拉菜单样式 */
select {
    height: 34px;
    border-radius: 10px;
    padding: 0 10px;
    border: 1px solid #ddd;
}

.center_box{
    /* 修改为居中 */
    justify-content: center; /* 改为居中 */
    display: flex;
    align-items: center; /* 垂直居中 */
    gap: 20px; /* 按钮间距 */
}
.counnter{
    width: 200px;
    border-radius: 20px;
    background: linear-gradient(to right, #078bff, #00f2fe);
    text-align: center;
}
.search_box{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;	
    padding:auto auto 10px auto;
}
.my_box{
    width: 90px;
    height: 30px;
    border-radius: 10px;
    background: #fff;
    text-align: center;
    outline: none;
    padding-left: 10px;
}
.edit-input {
    width: 80%;
    padding: 4px 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

.save-btn {
    background-color: #4CAF50 !important; /* 绿色 */
    margin-right: 5px;
}

.cancel-btn {
    background-color: #f44336 !important; /* 红色 */
}


</style>