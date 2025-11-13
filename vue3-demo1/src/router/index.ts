/*
 * @Author: suziping123 3268845120@qq.com
 * @Date: 2025-11-11 13:49:45
 * @LastEditors: suziping123 3268845120@qq.com
 * @LastEditTime: 2025-11-13 15:37:08
 * @FilePath: \vue-demo1\vue3-demo1\src\router\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path:"/demo1",
      name:"demo1",
      component:() => import("../views/VueDemo1.vue"),
    },
    {
      path:"/demo2",
      name:"demo2",
      component:() => import("../views/VueDemo2.vue"),
    },
    {
      path:"/VueTest1",
      name:"VueTest1",
      component:() => import("../views/VueTest1.vue"),
    },
  ],
})

export default router
