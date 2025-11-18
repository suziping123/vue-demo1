<template>
  <div class="ripple-demo">
    <div class="container">
      <h1>Vue 3 波纹按钮效果</h1>
      <p class="subtitle">点击任意按钮体验波纹动画效果</p>
      
      <div class="button-container">
        <button 
          v-for="(button, index) in buttons" 
          :key="index"
          class="ripple-button" 
          :class="button.type"
          @click="createRipple($event, index)"
        >
          {{ button.text }}
          <!-- 使用 Vue 的 v-for 来渲染波纹 -->
          <span 
            v-for="ripple in ripples[index]" 
            :key="ripple.id"
            class="ripple"
            :style="{
              left: ripple.x + 'px',
              top: ripple.y + 'px',
              width: ripple.size + 'px',
              height: ripple.size + 'px'
            }"
          ></span>
        </button>
      </div>
      
      <div class="explanation">
        <h2>实现原理</h2>
        <p>这个波纹效果是通过 Vue 3 的响应式系统实现的：</p>
        
        <p>1. 当按钮被点击时，<span class="highlight">createRipple</span> 函数被调用</p>
        
        <p>2. 函数计算波纹的位置和大小：</p>
        <div class="code-block">
          const diameter = Math.max(button.clientWidth, button.clientHeight);<br>
          const radius = diameter / 2;<br>
          const x = e.offsetX - radius;<br>
          const y = e.offsetY - radius;
        </div>
        
        <p>3. 将波纹数据添加到响应式数组：</p>
        <div class="code-block">
          ripples.value[buttonIndex].push({<br>
          &nbsp;&nbsp;id: Date.now() + Math.random(),<br>
          &nbsp;&nbsp;x, y, size: diameter<br>
          });
        </div>
        
        <p>4. Vue 自动更新 DOM，CSS 动画触发波纹效果</p>
        
        <p>5. 动画完成后自动移除波纹数据</p>
        
        <p>这种方法利用了 Vue 3 的响应式系统，比直接操作 DOM 更符合 Vue 的理念。</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// 按钮配置
const buttons = reactive([
  { text: '主要按钮', type: 'primary' },
  { text: '次要按钮', type: 'secondary' },
  { text: '成功按钮', type: 'success' },
  { text: '警告按钮', type: 'warning' },
  { text: '信息按钮', type: 'info' }
])

// 为每个按钮创建一个波纹数组
const ripples = ref<Array<Array<{
  id: number;
  x: number;
  y: number;
  size: number;
}>>>(buttons.map(() => []))

// 创建波纹效果
const createRipple = (e: MouseEvent, buttonIndex: number) => {
  const button = e.currentTarget as HTMLButtonElement;
  
  // 计算波纹大小和位置
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;
  const x = e.offsetX - radius;
  const y = e.offsetY - radius;
  
  // 创建波纹数据
  const ripple = {
    id: Date.now() + Math.random(), // 唯一ID
    x,
    y,
    size: diameter
  };
  
  // 添加到对应按钮的波纹数组
  ripples.value[buttonIndex].push(ripple);
  
  // 600ms后移除波纹（动画持续时间）
  setTimeout(() => {
    const index = ripples.value[buttonIndex].findIndex(r => r.id === ripple.id);
    if (index > -1) {
      ripples.value[buttonIndex].splice(index, 1);
    }
  }, 600);
}
</script>

<style scoped>
.ripple-demo {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.container {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 800px;
  width: 100%;
}

h1 {
  color: white;
  margin-bottom: 10px;
  font-size: 2.5rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.subtitle {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 40px;
  font-size: 1.2rem;
}

.button-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-bottom: 40px;
}

.ripple-button {
  position: relative;
  border: none;
  font-size: 18px;
  color: #FFFFFF;
  padding: 15px 30px;
  text-align: center;
  transition: all 0.3s;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
  border-radius: 50px;
  font-weight: 600;
  letter-spacing: 1px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  min-width: 150px;
}

.ripple-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}

.ripple-button:active {
  transform: translateY(1px);
}

/* 波纹效果核心代码 */
.ripple {
  position: absolute;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.7);
  transform: scale(0);
  animation: ripple-animation 0.6s linear;
  pointer-events: none;
}

@keyframes ripple-animation {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

/* 不同样式的按钮 */
.primary {
  background: linear-gradient(45deg, #FF416C, #FF4B2B);
}

.secondary {
  background: linear-gradient(45deg, #36D1DC, #5B86E5);
}

.success {
  background: linear-gradient(45deg, #00b09b, #96c93d);
}

.warning {
  background: linear-gradient(45deg, #f46b45, #eea849);
}

.info {
  background: linear-gradient(45deg, #4A00E0, #8E2DE2);
}

.explanation {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 15px;
  padding: 25px;
  margin-top: 30px;
  text-align: left;
}

.explanation h2 {
  color: white;
  margin-bottom: 15px;
  font-size: 1.5rem;
}

.explanation p {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin-bottom: 15px;
}

.code-block {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 15px;
  margin: 15px 0;
  font-family: 'Courier New', monospace;
  color: #fff;
  overflow-x: auto;
}

.highlight {
  color: #FFD700;
  font-weight: bold;
}
</style>