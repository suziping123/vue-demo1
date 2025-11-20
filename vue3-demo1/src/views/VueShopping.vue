<!--
 * @Author: suziping123 3268845120@qq.com
 * @Date: 2025-11-20 16:12:19
 * @LastEditors: suziping123 3268845120@qq.com
 * @LastEditTime: 2025-11-20 17:10:07
 * @FilePath: \vue-demo1\vue3-demo1\src\views\VueShopping.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="container">
    <h1>🛒 购物车应用</h1>
  
    <div class="addGoods">
      <h2 class="font-size:20px">添加商品</h2>
      <from class="add">
          <label for="goodsname">商品名称</label>
          <input type="text" id="goodsname" v-model="itemName" placeholder="请输入商品名称">
          <label for="goodsprice">商品价格</label>
          <input type="text" id="goodsprice" v-model="itemPrice" placeholder="请输入商品价格" min="0" step="0.01">
          <label for="goodsnum">商品数量</label>
          <input type="text" id="goodsnum" v-model="itemNum" placeholder="请输入商品数量" value="1" mian="1">
          <br/>
          <button @click="addGoods">添加到购物车</button>
      </from>
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
            <div class="stat-value">{{ getTotalPrice() }}¥</div>
        </div>
    </div>
    <!-- 购物车列表 -->
    <div class="cartList">
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
                <br/>
                <div>总计：{{ getTotalPrice() }}¥</div>
            </div>
            <button @click="clearCart">清空购物车</button>
            <button @click="continueShopping">继续购物</button>
            <button @click="placeOrder">下单</button>
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
    if (!itemName.value || !itemPrice.value) {
        alert('请填写完整信息！')
        return
    }
    cartItems.push({
        name:itemName.value,
        price:itemPrice.value,
        num:itemNum.value
    })
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
.container{
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: black 1px solid;
    border-radius: 20px;
    background: linear-gradient(to);
    padding: 20px;
}
.addGoods{
    border: black 1px solid;
    box-shadow: 20cap;
    padding: 20px;
    text-align: left;
    margin-bottom: 20px;
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
}
.stat{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: black 1px solid;
}
.stat-value{
    font-size: 20px;
    color: rgb(72, 111, 126);
}
</style>