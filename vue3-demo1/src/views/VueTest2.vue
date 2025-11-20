<template>
  <div class="container">
    <h1>🛒 购物车应用</h1>
    
    <!-- 添加商品区域 -->
    <div class="section">
      <h2>添加商品</h2>
      <div class="form-group">
        <label for="itemName">商品名称</label>
        <input 
          type="text" 
          id="itemName" 
          v-model="itemName" 
          placeholder="输入商品名称"
        >
      </div>
      
      <div class="form-group">
        <label for="itemPrice">商品价格</label>
        <input 
          type="number" 
          id="itemPrice" 
          v-model="itemPrice" 
          placeholder="输入商品价格" 
          min="0" 
          step="0.01"
        >
      </div>
      
      <div class="form-group">
        <label for="itemQuantity">商品数量</label>
        <input 
          type="number" 
          id="itemQuantity" 
          v-model="itemQuantity" 
          value="1" 
          min="1"
        >
      </div>
      
      <button @click="addItem">添加到购物车</button>
    </div>
    
    <!-- 购物车统计 -->
    <div class="stats">
      <div class="stat-box">
        <div>商品种类</div>
        <div class="stat-value">{{ cartItems.length }}</div>
      </div>
      <div class="stat-box">
        <div>商品总数</div>
        <div class="stat-value">{{ getTotalQuantity() }}</div>
      </div>
      <div class="stat-box">
        <div>总金额</div>
        <div class="stat-value">¥{{ getTotalPrice() }}</div>
      </div>
    </div>
    
    <!-- 购物车列表 -->
    <div class="section">
      <h2>购物车</h2>
      
      <div v-if="cartItems.length === 0" class="empty-cart">
        <p>购物车为空，快去添加商品吧！</p>
      </div>
      
      <table v-else>
        <thead>
          <tr>
            <th>商品名称</th>
            <th>单价</th>
            <th>数量</th>
            <th>小计</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartItems" :key="item.id">
            <td>{{ item.name }}</td>
            <td>¥{{ item.price }}</td>
            <td>
              <div class="quantity-controls">
                <button class="quantity-btn" @click="decreaseQuantity(item.id)">-</button>
                <span class="quantity-input">{{ item.quantity }}</span>
                <button class="quantity-btn" @click="increaseQuantity(item.id)">+</button>
              </div>
            </td>
            <td>¥{{ (item.price * item.quantity).toFixed(2) }}</td>
            <td>
              <button class="danger" @click="removeItem(item.id)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <!-- 购物车摘要 -->
      <div v-if="cartItems.length > 0" class="summary">
        <div class="summary-item">
          <span>商品总价:</span>
          <span>¥{{ getTotalPrice() }}</span>
        </div>
        <div class="summary-item summary-total">
          <span>总计:</span>
          <span>¥{{ getTotalPrice() }}</span>
        </div>
      </div>
      
      <!-- 操作按钮 -->
      <div v-if="cartItems.length > 0" class="actions">
        <button class="danger" @click="clearCart">清空购物车</button>
        <button @click="resetForm">继续购物</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

// 步骤1：导入必要的函数
import { ref, reactive } from 'vue'

// 步骤2：使用 ref 创建响应式数据
// 创建三个ref响应式数据：itemName, itemPrice, itemQuantity
const itemName = ref('')
const itemPrice = ref(0)
const itemQuantity = ref(1)

// 步骤3：使用 reactive 创建响应式对象
// 创建一个reactive响应式对象：cartItems（数组）
const cartItems = reactive([])

// 步骤4：实现添加商品功能
function addItem() {
  // 1. 验证表单数据是否有效
  // 2. 创建新商品对象（包含id、name、price、quantity）
  // 3. 将新商品添加到cartItems数组中
  // 4. 调用resetForm重置表单
}

// 步骤5：实现删除商品功能
function removeItem(itemId) {
  // 1. 根据itemId找到商品在数组中的索引
  // 2. 使用splice方法从cartItems中删除该商品
}

// 步骤6：实现增加商品数量功能
function increaseQuantity(itemId) {
  // 1. 根据itemId找到对应商品
  // 2. 增加该商品的quantity属性
}

// 步骤7：实现减少商品数量功能
function decreaseQuantity(itemId) {
  // 1. 根据itemId找到对应商品
  // 2. 减少该商品的quantity属性（注意：数量不能小于1）
}

// 步骤8：实现清空购物车功能
function clearCart() {
  // 清空cartItems数组
}

// 步骤9：实现重置表单功能
function resetForm() {
  // 重置itemName, itemPrice, itemQuantity为初始值
}

// 步骤10：实现计算总数量功能
function getTotalQuantity() {
  // 使用reduce方法计算所有商品数量的总和
  // 返回总数量
}

// 步骤11：实现计算总价格功能
function getTotalPrice() {
  // 使用reduce方法计算所有商品价格的总和（价格*数量）
  // 返回总价格，保留两位小数
}
</script>

<style scoped>
/* 样式代码保持不变 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #2c3e50;
}

.section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
}

h2 {
  margin-bottom: 15px;
  color: #3498db;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2980b9;
}

button.danger {
  background-color: #e74c3c;
}

button.danger:hover {
  background-color: #c0392b;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

th, td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f8f9fa;
  font-weight: bold;
}

tr:hover {
  background-color: #f5f5f5;
}

.quantity-controls {
  display: flex;
  align-items: center;
}

.quantity-btn {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  border-radius: 4px;
  cursor: pointer;
  border: none;
}

.quantity-input {
  width: 50px;
  text-align: center;
  margin: 0 10px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.summary {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 6px;
  margin-top: 20px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.summary-total {
  font-weight: bold;
  font-size: 18px;
  color: #2c3e50;
  border-top: 1px solid #ddd;
  padding-top: 10px;
}

.empty-cart {
  text-align: center;
  padding: 30px;
  color: #7f8c8d;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.stats {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
}

.stat-box {
  flex: 1;
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 6px;
  text-align: center;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #3498db;
}
</style>