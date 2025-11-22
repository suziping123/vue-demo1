<!--
 * @Author: suziping123 3268845120@qq.com
 * @Date: 2025-11-20 16:12:19
 * @LastEditors: suziping123 3268845120@qq.com
 * @LastEditTime: 2025-11-21 23:55:33
 * @FilePath: \vue-demo1\vue3-demo1\src\views\VueShopping.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="container">
    <h1>🛒 购物车应用</h1>
  
    <div class="addGoods">
      <h2 class="font-size:20px">添加商品</h2>
      <hr style="background: linear-gradient(to right, transparent,  black 50%, transparent);">
      <form class="add" @submit.prevent="addGoods">
          <label for="goodsname">商品名称</label>
          <input type="text" id="goodsname" v-model="itemName" placeholder="请输入商品名称">
          <label for="goodsprice">商品价格</label>
          <input type="number" id="goodsprice" v-model.number="itemPrice" placeholder="请输入商品价格" min="0" step="0.01">
          <label for="goodsnum">商品数量</label>
          <input type="number" id="goodsnum" v-model.number="itemNum" placeholder="请输入商品数量" value="1" mian="1">
          <br/>
          <button type="submit" class="myadd">添加到购物车</button>
      </form>
    </div>
    
    <!-- 统计 -->
    <div class="statis">
        <div class="stat">
            <div>商品种类</div>
            <div class="stat-value">{{ cartItems.length }}</div>
        </div>
        <div class="stat">
            <div>商品总数</div>
            <div class="stat-value">{{ getTotalNum() }}</div>
        </div>
        <div class="stat">
            <div>总金额</div>
            <div class="stat-value">{{ getTotalPrice() }}￥</div>
        </div>
    </div>
    
    <!-- 购物车列表 -->
    <div class="cartList">
        <h1 class="cart">购物车</h1>
        <table v-if="cartItems.length">
            <thead>
                <tr>
                    <th>商品名称</th>
                    <th>商品价格</th>
                    <th>商品数量</th>
                    <th>小计</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in cartItems" :key="index">
                    <td>{{ item.name }}</td>
                    <td>{{ item.price }}</td>
                    <td>
                        <button @click="item.num--">-</button>
                        {{ item.num }}
                        <button @click="item.num++">+</button>
                    </td>
                    <td>{{ item.price * item.num }}</td>
                    <td>
                        <button @click="cartItems.splice(index,1)">删除</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-else>购物车为空</div>
        <div class="tfoot">
            <div>商品总价{{ getTotalPrice() }}</div>
            <div>总计：{{ getTotalPrice() }}¥</div>
            <button class="setting" @click="clearCart">清空购物车</button>
            <button class="setting" @click="continueShopping">继续购物</button>
            <button class="setting" @click="placeOrder">下单</button>
        </div>
    </div>
</div>
  
</template>

<script setup lang="ts">
// 这里写逻辑
import { ref, reactive } from 'vue'
// 定义商品接口类型
interface cartItem {
  name: string;
  price: number;
  num: number;
}
const itemName = ref('')
const itemPrice = ref(0)
const itemNum = ref(1)
const cartItems = reactive<cartItem[]>([])
function addGoods(){
    const trimmedName = itemName.value.trim()
    if (!trimmedName) {
        alert('商品名称不能为空！')
        return
    }
    const price = parseFloat(itemPrice.value.toFixed(2))
    if (isNaN(price) || price <= 0) {
        alert('请输入有效的商品价格（必须大于0）！')
        return
    }
    // 验证数量
    const num = Math.floor(itemNum.value)
    if (isNaN(num) || num < 1) {
        alert('请输入有效的商品数量（必须为正整数）！')
        return
    }
    cartItems.push({
        name:trimmedName,
        price:price,
        num: num
    })
    // 清空输入框
    itemName.value = ''
    itemPrice.value = 0
    itemNum.value = 1
}
function getTotalNum(){
    let totalNum = 0
    cartItems.forEach(item=>{
        totalNum += item.num
    })
    return totalNum
}

function getTotalPrice(){
    let totalPrice = 0
    cartItems.forEach(item=>{
        totalPrice += item.price * item.num
    })
    return totalPrice
}



function clearCart() {
    cartItems.length = 0
}
function continueShopping() {
    window.location.reload()
}
function placeOrder() {
    alert('订单已提交！')
    clearCart()
}

</script>

<style scoped>
/* 这里写样式 */
table{
    text-align: center;
    border-collapse: collapse;
    border: 1px solid black;
}
th{
    padding: 2px;
    border: 1px solid black;
}
td{
    padding: 2px;
    border: 1px solid black;
}
h1{
    color: rgb(12, 129, 123);
}
.myadd{
    margin: 5px;
    background: linear-gradient(90deg,
        rgba(255,255,255,1) 0%, 
        rgb(131, 236, 179) 100%);
        /* 由aqua（）到rgb(131, 236, 179) */
    background-size: 200% 100%;  /* 扩大背景尺寸 */
    background-position: 0% 0%;  /* 初始位置 */
    border: none;
    border-radius: 10px;
    transition: background 1s,box-shadow 1s;
    box-shadow: 4px 4px 2px 2px rgba(0,0,0,0.2), 0 2px 2px 0 rgba(0,0,0,0.19);
}
.myadd:hover{
    background-position: 90% 100%;  /* 悬停时改变位置 */
    box-shadow: 0px 2px 8px 1px rgba(0, 0, 0, 0.23);
}  
.container{
    text-align: center;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: rgb(29, 28, 28) 1px solid;
    border-radius: 20px;
    background: linear-gradient(to);
    padding: 20px;
     /* 设置一个合适的宽度 */
    /* 关键：左右外边距设为 auto，实现水平居中 */
    margin: 0 auto;
    /* 可选：为容器添加内边距和背景色，使其更美观 */
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
.addGoods{
    border: rgb(155, 150, 150) 1px solid;
    box-shadow: 20cap;
    padding: 20px;
    text-align: left;
    margin-bottom: 10px;
    border-radius: 10px;
}
.add{
    display: flex;
    flex-direction: column;
}
.statis{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* 两者之间的距离 */
    gap: 20px;
    margin-top: 10px;
}
.stat{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgb(226, 225, 225);
    width: 80px;
}
.stat-value{
    font-size: 20px;
    color: rgb(72, 111, 126);
}
.setting{
    margin: 10px;
    width: 100px;
    border: 0;
    border-radius: 5px;
    background-color: rgb(87, 174, 231,0.5);
}
.cartList{
    margin-top: 10px;
    padding: 5px;
    border: 1px solid rgb(155, 150, 150);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.cart{
    align-self: flex-start; /* 单独让这个标题靠左 */
     margin-left: 10px; /* 可选，增加一点左边距 */
}
</style>