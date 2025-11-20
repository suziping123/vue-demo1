<template>
  <div>
    <div class="search_box">
      <input class = "my_box" v-model="searchForm.name" type="text" placeholder="请输入姓名" />
      <input class = "my_box" v-model="searchForm.age" type="text" placeholder="请输入年龄" />
      <input class = "my_box" v-model="searchForm.hobby" type="text" placeholder="请输入爱好" />
      <select v-model="searchForm.sex">
        <option value="男">男</option>
        <option value="女">女</option>
        <option value="">全部</option>
      </select>
      <button @click="resetSearch">重置</button>
    </div>
    <table>
      <thead>
        <tr>
          <th v-for="(val,index) of titles" :key="index">{{ val }}</th>
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
                  <select v-show="item.isEditing" v-model="item.editSex" class="edit-input,wideth:auto,height:auto">
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

<script setup lang="ts">
// 这里写逻辑
import { reactive, ref, computed } from 'vue';
// 表头
const titles = ['序号', '姓名', '性别', '年龄', '爱好','操作'];
const PersonList = reactive([
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
    })));
const searchForm = ref({ name: "", age: "", hobby: "", sex: "" });
const resetSearch = () => {
  searchForm.value = { name: "", age: "", hobby: "", sex: "" };
};
const startEdit = (item: any) => {
  item.isEditing = true;
  item.editName = item.name;
  item.editAge = item.age;
  item.editSex = item.sex;
  item.editHobby = item.hobby;
};
const cancelEdit = (item: any) => {
  item.isEditing = false;
  item.editName = item.name;
  item.editAge = item.age;
  item.editSex = item.sex;
  item.editHobby = item.hobby;
};
const saveEdit = (item: any) => {
  if (!item.editName.trim()) {
    alert('姓名不能为空！');
    return;
  };

  // 更新数据
  item.name = item.editName;
  item.age = item.editAge;
  item.sex = item.editSex;
  item.hobby = item.editHobby;
  item.isEditing = false;
}

const remove = (item: any) => {
  const index = PersonList.indexOf(item);
  PersonList.splice(index, 1);
  console.log(item);
}

const filteredList = computed(() => {
  return PersonList.filter((item) => {
    const matchName = !searchForm.value.name || item.name.includes(searchForm.value.name);
    const matchAge = !searchForm.value.age || String(item.age).includes(searchForm.value.age);
    const matchSex = !searchForm.value.sex || item.sex.includes(searchForm.value.sex);
    const matchHobby = !searchForm.value.hobby || item.hobby.includes(searchForm.value.hobby);
    
    return matchName && matchAge && matchHobby && matchSex;
  });
})


</script>

<style scoped>
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
   color: #000;
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
    width: 90%;
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