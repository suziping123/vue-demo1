## 任务二：编写配置Vue 组件

### 组件结构设计

## 2.1 组件基础结构

- **组件名称**: VueTest1
- **框架版本**: Vue 3
- **开发语言**: TypeScript/JavaScript
- **样式方案**: Scoped CSS

### 核心功能模块

## 2.2 功能模块划分

### 2.2.1 计数器模块

- 显示当前计数值
- 支持递增/递减操作
- 实时响应式更新

### 2.2.2 搜索筛选模块

- 多条件联合搜索（姓名、年龄、爱好、性别）
- 实时筛选功能
- 一键重置搜索条件

### 2.2.3 数据表格模块

- 用户信息展示
- 行内编辑功能
- 数据删除操作

## 任务三：用户信息表格

### 3.1 数据层设计

```typescript
// 用户数据结构定义
interface User {
  name: string;
  sex: string;
  age: number;
  hobby: string;
  isEditing: boolean;
  editName: string;
  editAge: number;
  editSex: string;
  editHobby: string;
}

// 搜索表单结构
interface SearchForm {
  name: string;
  age: string;
  hobby: string;
  sex: string;
}
```

### 3.2 核心功能实现

```vue
<!-- 表格模板结构 -->
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
    <!-- 动态显示/编辑状态 -->
    <td>{{ index+1 }}</td>
    <td>
      <span v-show="!item.isEditing">{{ item.name }}</span>
      <input v-show="item.isEditing" v-model="item.editName">
    </td>
    <!-- 其他字段类似实现 -->
  </tr>
</table>
```

### 3.3 编辑功能机制

```typescript
// 编辑状态管理逻辑
startEdit(item: User) {
  // 1. 取消其他项的编辑状态
  // 2. 设置当前项为编辑状态
  // 3. 备份原始数据
}

saveEdit(item: User) {
  // 1. 数据验证（姓名非空）
  // 2. 更新数据到主对象
  // 3. 退出编辑状态
}

cancelEdit(item: User) {
  // 1. 退出编辑状态
  // 2. 恢复备份数据
}
```

### 3.4 搜索筛选方法

```typescript
// 计算属性实现实时筛选
filteredList() {
  return this.PersonList.filter((item) => {
    const matchName = !this.searchForm.name || item.name.includes(this.searchForm.name);
    const matchAge = !this.searchForm.age || String(item.age).includes(this.searchForm.age);
    const matchSex = !this.searchForm.sex || item.sex.includes(this.searchForm.sex);
    const matchHobby = !this.searchForm.hobby || item.hobby.includes(this.searchForm.hobby);
  
    return matchName && matchAge && matchSex && matchHobby;
  });
}
```

### 3.5 响应式UI设计

```css
/* 响应式布局设计 */
#VueTest1 {
  max-width: 1200px;
  margin: 0 auto;    /* 水平居中 */
  padding: 20px;
}

/* 搜索框弹性布局 */
.search_box {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;  /* 支持响应式换行 */
}

/* 编辑状态样式区分 */
.edit-input {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 4px 8px;
}

.save-btn { background-color: #4CAF50; }
.cancel-btn { background-color: #f44336; }
```
