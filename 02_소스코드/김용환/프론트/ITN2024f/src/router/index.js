import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/example',
    component: () => import('../views/basic/example/ExampleView.vue')
  },
  {
    path: '/inquiry',
    component: () => import('../views/basic/Mypage/InquiryView.vue')
  },
  {
    path: '/inquiry/:iqid',
    component: () => import('../views/basic/Mypage/InquiryDetailView.vue')
  },
  {
    path: '/inquiry/write',
    component: () => import('../views/basic/Mypage/InquiryWriteView.vue')
  },
  {
    path: '/mypage',
    component: () => import('../views/basic/Mypage/MypageView.vue')
  },
  {
    path: '/mypage/detail/:paid',
    component: () => import('../views/basic/Mypage/MypageDetailView.vue')
  },
  {
    path: '/mypage/memberinfo',
    component: () => import('../views/basic/Mypage/MemberInfoView.vue')
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
