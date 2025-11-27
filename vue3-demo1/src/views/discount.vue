<script setup lang="ts">
import { ref, computed,onMounted,onUnmounted,watch,watchEffect } from 'vue'
// 一：页面停留时间追踪 
const startTime = ref<number>(Date.now())
const stayTime = ref<number>(0) // 停留时间（秒）
const stayTip = ref<string>('')
let timer: number | null = null
// ========== 生命周期钩子 ==========
onMounted(() => {
  // 每5秒更新一次停留时间
  timer = window.setInterval(() => {
    updateStayTime()
    console.log(`用户已停留：${stayTime.value}秒`) // 控制台输出
  }, 5000)
  updateStayTime() // 初始化
})

onUnmounted(() => {
  // 清理定时器，避免内存泄漏
  if (timer) clearInterval(timer)
})

// 计算停留时间并处理提示
const updateStayTime = () => {
  stayTime.value = Math.floor((Date.now() - startTime.value) / 1000)
  // 超过30秒提示
  if (stayTime.value === 30) {
    alert(`您已浏览较长事件，建议休息`)
  }
}
const price = ref(0)
const quantity = ref(1)
const discountType = ref(1)
const isFreeShipping = ref(false)
// 计算折后单价
const computedPrice = computed(() => {
  if (discountType.value === 1) {
    return price.value
  }
  return price.value * discountType.value
})

const goodsAllPrice = computed(() => {
  return computedPrice.value * quantity.value
})

const resultPrice = computed(() => {
  if (isFreeShipping.value) {
    return goodsAllPrice.value + transportFee.value
  }
  return goodsAllPrice.value
})
// 运费（包邮时为0，否则10元）
const transportFee = computed(() => {
  if (isFreeShipping.value) {
    return 0
  }
  return 10
})

function resetPrice() {
  price.value = 0
  quantity.value = 1
  discountType.value = 1
  isFreeShipping.value = false
}

// 搜索建议部分
// 模拟搜索建议数据（根据图片内容调整）
const mockSuggestions = [
  '电脑',
  '电影票',
  '电池',
  '电话',
  '荣耀',
  '王者荣耀皮肤',
  '皮大衣',
  '大肉肠'
]
const searchKeyword = ref('')
const isFocused = ref(false)
const highlightedIndex = ref(-1)


// 计算属性：过滤搜索建议
const filteredSuggestions = computed(() => {
  if (!searchKeyword.value.trim()) {
    return mockSuggestions.slice(0, 5) // 空值时显前五个
  }
  
  const keyword = searchKeyword.value.toLowerCase()
  return mockSuggestions.filter(item => 
    item.toLowerCase().includes(keyword)
  ).slice(0, 8)
})

// 控制下拉面板显示
const showSuggestions = computed(() => {
  return searchKeyword.value.length > 0 || isFocused.value
})

// 搜索处理（带防抖）
let searchTimer = null
const handleSearch = () => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    highlightedIndex.value = -1
  }, 300);
}

// 高亮匹配文本
const highlightMatch = (text, keyword) => {
  if (!keyword.trim()) return text
  const regex = new RegExp(`(${keyword})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}

// 选择建议
const selectSuggestion = (suggestion) => {
  searchKeyword.value = suggestion
  isFocused.value = false
  // 执行搜索逻辑
  performSearch(suggestion)
}

// 键盘导航
const highlightNext = () => {
  if (highlightedIndex.value < filteredSuggestions.value.length - 1) {
    highlightedIndex.value++
  }
}

const highlightPrev = () => {
  if (highlightedIndex.value > 0) {
    highlightedIndex.value--
  }
}

const selectHighlighted = () => {
  if (highlightedIndex.value >= 0 && filteredSuggestions.value.length > 0) {
    selectSuggestion(filteredSuggestions.value[highlightedIndex.value])
  } else if (searchKeyword.value.trim()) {
    performSearch(searchKeyword.value)
  }
}

// 输入框失去焦点处理
const handleBlur = () => {
  // 延迟隐藏，确保能捕获点击事件
  setTimeout(() => {
    isFocused.value = false
  }, 200)
}

// 清空搜索
const clearSearch = () => {
  searchKeyword.value = ''
  highlightedIndex.value = -1
}

// 执行搜索
const performSearch = (keyword) => {
  console.log('执行搜索:', keyword)
  // 这里添加实际搜索逻辑
  alert(`搜索: ${keyword}`)
}
</script>

<template>
  <div class="container_dis">
    <div class="stay-tracker">
      <h3>页面停留追踪</h3>
      <p>当前停留时间：<span class="time">{{ stayTime }} 秒</span></p>
      <p class="tip" v-if="stayTip">{{ stayTip }}</p>
    </div>
    <div class="search-wrapper">
      <!-- 搜索框区域 -->
      <div class="search-box" :class="{ 'search-focused': isFocused }">
        <div class="search-icon">🔍</div>
        <input
          type="text"
          v-model="searchKeyword"
          @input="handleSearch"
          @focus="isFocused = true"
          @blur="handleBlur"
          @keydown.down="highlightNext"
          @keydown.up="highlightPrev"
          @keydown.enter="selectHighlighted"
          placeholder="搜索框的效果"
          class="search-input"
        />
        <button v-if="searchKeyword" @click="clearSearch" class="clear-btn">×</button>
      </div>

      <!-- 下拉建议面板 - 使用绝对定位浮在内容上方 -->
      <div 
        v-show="showSuggestions && filteredSuggestions.length > 0 && isFocused"
        class="suggestions-dropdown"
      >
        <div
          v-for="(suggestion, index) in filteredSuggestions"
          :key="index"
          :class="['suggestion-item', { highlighted: index === highlightedIndex }]"
          @mousedown="selectSuggestion(suggestion)"
          @mouseenter="highlightedIndex = index"
        >
          <div class="suggestion-content">
            <span class="suggestion-text" v-html="highlightMatch(suggestion, searchKeyword)"></span>
          </div>
        </div>
      </div>
    </div>

    <div class="calculator-header">
      <h1>商品价格计算器</h1>
      <p>输入商品信息，实时计算最终价格</p>
    </div>
    <div class="goods">
      <div class="goodinfo">
        <div class="input_group">
          <label>商品原价：</label>
          <input type="number" v-model.number="price" min="0" />
        </div>
        <div class="input_group">
          <label>商品数量：</label>
          <input type="number" v-model.number="quantity" min="1" />
        </div>
        <div class="input_group">
          <label>折扣类型：</label>
          <select v-model="discountType">
            <option value="1">无折扣</option>
            <option value="0.9">9折</option>
            <option value="0.8">8折</option>
            <option value="0.7">7折</option>
          </select>
        </div>
        <div class="input_group">
          <label>是否包邮：</label>
          <input type="checkbox" v-model="isFreeShipping" />
        </div>
      </div>
    </div>

    <div class="divider"></div>

    <div class="computed_result">
      <div class="result-header">计算结果</div>
      <div class="result">
        <label>折后单价：</label>
        <span>{{ computedPrice }}</span>
      </div>
      <div class="result">
        <label>商品总价：</label>
        <span>{{ goodsAllPrice }}</span>
      </div>
      <div class="result">
        <label>运费：</label>
        <span>{{ transportFee }}</span>
      </div>
      <div class="result">
        <label>最终价格：</label>
        <span>{{ resultPrice }}</span>
      </div>
    </div>
    <button class="btn" @click="resetPrice">重置价格</button>
  </div>
</template>

<style scoped>
.container_dis {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  text-align: center;
  background:linear-gradient(45deg ,rgba(239, 173, 111, 0.9),rgba(250, 38, 38, 0.9));
}

.calculator-header {
  display: flex;
  flex-direction: column;
  text-align: center;
  color: #2c3e50;
  margin: 0;
}

.goodinfo {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}

.input_group {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin: 0.5rem 0;
}
.input_group label {
  width: 80px;
  color: #34495e;
}
.input_group input, select {
  flex: 1;
  padding: 0.6rem;
  border: 1px solid #bdc3c7;
  border-radius: 6px;
  font-size: 1rem;
}
.checkbox {
  width: auto;
  height: auto;
}

.divider {
  height: 1px;
  background: linear-gradient(to right, transparent, #000000, transparent);
  margin: 1.5rem 0;
}

.computed_result {
  margin: auto;
}
.result-header {
  text-align: center;
  color: #2c3e50;
  margin: 0.5rem 0;
}
.result {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.5rem 0;
  color: #34495e;
}
.result label {
  width: 80px;
}
.result span {
  font-weight: 500;
  color: #2c3e50;
  font-size: 1.1rem;
}
.btn {
  padding: 10px;
  background-color: rgba(60, 221, 221, 0.5);
  border: none;
  border-radius: 10px;
  font-size: 20px;
  transition: all 2s cubic-bezier(0.25, 0.4, 0.7, 1);
  /* cubic-bezier(0.25, 0.8, 0.25, 1) co创建一个缓动函数，用于创建平滑的过渡效果 */
  color: white; /* 确保文字颜色与背景对比明显 */
  cursor: pointer; /* 提示按钮可点击 */
}
.btn:hover {
  background-color: #1d0d05
}
.btn:active {
  background-color: #ffffff;
}







.search-wrapper {
  position: relative;
  max-width: 600px;
  margin: 20px auto;
  z-index: 1000; /* 确保下拉面板在最上层 */
}

/* 搜索框样式 */
.search-box {
  display: flex;
  align-items: center;
  border: 2px solid #dfe1e5;
  border-radius: 24px;
  background: white;
  padding: 8px 16px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px 1px rgba(64, 60, 67, 0.16);
}

.search-box.search-focused {
  border-color: #4285f4;
  box-shadow: 0 2px 8px 1px rgba(64, 60, 67, 0.24);
}

.search-icon {
  margin-right: 8px;
  color: #9aa0a6;
  font-size: 16px;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  padding: 8px 0;
  background: transparent;
}

.clear-btn {
  background: none;
  border: none;
  font-size: 20px;
  color: #70757a;
  cursor: pointer;
  padding: 4px;
  margin-left: 8px;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.clear-btn:hover {
  background-color: #f1f3f4;
}

/* 下拉建议面板样式 - 关键部分 */
.suggestions-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e0e0e0;
  border-top: none;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 300px;
  overflow-y: auto;
  margin-top: 4px;
  z-index: 1001; /* 确保在搜索框之上 */
}

.suggestion-item {
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #f8f9fa;
  transition: background-color 0.2s;
}

.suggestion-item:hover,
.suggestion-item.highlighted {
  background-color: #f8f9fa;
}

.suggestion-item:last-child {
  border-bottom: none;
}

.suggestion-content {
  display: flex;
  align-items: center;
}

.suggestion-text {
  color: #3c4043;
  font-size: 14px;
}

.suggestion-text mark {
  background-color: #feffcd;
  font-weight: bold;
  color: #1a73e8;
}

/* 页面内容区域 */
.page-content {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  z-index: 1; /* 确保在下拉面板之下 */
  position: relative;
}
</style>
