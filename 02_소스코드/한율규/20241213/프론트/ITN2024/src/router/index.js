import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    component: () => import('../views/HomeView.vue')
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
  
  //회원가입 , 로그인 , 홈
  {
    path: '/register',
    component: () => import('../views/auth/RegisterView.vue')
  },
  {
    path: '/login',
    component: () => import('../views/auth/LoginView.vue')
  },

  // 고객센터 - 공지사항
  {
    path: '/notice',
    component: () => import('../views/basic/Center/notice/NoticeView.vue')
  },
  {
    path: '/add-notice',
    component: () => import('../views/basic/Center/notice/AddNotice.vue')
  },
  {
    path: '/notice/:noid',
    component: () => import('../views/basic/Center/notice/NoticeDetail.vue')
  },

  //쇼핑카트
  {
    // path(/gallery), component(GalleryView.vue)
    path: '/cart',
    component: () => import('../views/advanced/cart/CartView.vue')
  },
  {
    // path(/add-gallery), component(AddGallery.vue)
    path: '/add-cart',
    component: () => import('../views/advanced/cart/AddCart.vue')
  },
  {
    // path(/fileDb/:uuid), component(FileDbDetail.vue)
    path: '/cart/:uuid',
    component: () => import('../views/advanced/cart/CartDetail.vue')
  },

//관리자
{
  path: "/AdminHome",
  component: () => import("../views/admin/AdminHomeVue.vue"),
},
{
  path: "/AdminMember",
  component: () => import("../views/admin/AdminMemberVue.vue"),
},
{
  path: "/AdminMerchandise",
  component: () => import("../views/admin/AdminMerchandiseVue.vue"),
},
{
  path: "/AdminMerchandiseAdd",
  component: () => import("../views/admin/AdminMerchandiseAdd.vue"),
},
{
  path: "/AdminMerchandiseUpdate/:prid",
  component: () => import("../views/admin/AdminMerchandiseUpdate.vue"),
},
{
  path: "/AdminMerchandise/:prid",
  component: () => import("../views/admin/AdminMerchandiseDetailView.vue"),
},
{
  path: "/AdminAnouncement",
  component: () => import("../views/admin/AdminAnnouncementVue.vue"),
},
{
  path: "/AdminAnouncementAdd",
  component: () => import("../views/admin/AdminAnnouncementAdd.vue"),
},
{
  path: "/AdminAnouncement/:noid",
  component: () => import("../views/admin/AdminAnnouncementDetailView.vue"),
},
{
  path: "/AdminAnouncementUpdate/:noid",
  component: () => import("../views/admin/AdminAnnouncementUpdate.vue"),
},
{
  path: "/AdminFaq",
  component: () => import("../views/admin/AdminFaqVue.vue"),
},
{
  path: "/AdminFaqDetailView/:iqid",
  component: () => import("../views/admin/AdminFaqDetailView.vue"),
},
{
  path: "/AdminOrder",
  component: () => import("../views/admin/AdminOrderVue.vue"),
},
{
  path: "/AdminOrderDetail",
  component: () => import("../views/admin/AdminOrderDetailVue.vue"),
},

//상품
{
  path: '/Pmv',
  component: () => import('../views/basic/product/ProductMainView.vue')
},
{
  path: '/jeogori',
  component: () => import('../views/basic/product/ProductJeogoriView.vue')
},
{
  path: '/bottoms',
  component: () => import('../views/basic/product/ProductBottomsView.vue')
},
{
  path: '/Pdv/:prid',
  component: () => import('../views/basic/product/ProductDetails.vue')
},
{
  path: '/Prw',
  component: () => import('../views/basic/product/ProductReviews.vue')
},
{
  path: '/Durumagi',
  component: () => import('../views/basic/product/ProductDurumagiView.vue')
},

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
