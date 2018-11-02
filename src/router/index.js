import Vue from 'vue'
import Router from 'vue-router'
// import Layout from "@/views/Layout/layout.vue"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      name:"login",
      component:()=>import("@/views/Login/login.vue"),
      meta:{
        title:"登录"
      }
    },
    {
      path: '/layout',
      name: 'layout',
      component: ()=>import("@/views/Layout/layout.vue"),
      redirect:"/layout/home",    
      children:[
        {
          path:"/home",
          name:"home",
          component:()=>import("@/views/Home/home.vue"),
          meta:{
            title:"首页"
          }
        },
        {
          path:"userList",
          name:"userList",
          component:()=>import("@/views/User/userList.vue"),
          meta:{
            title:"用户列表"
          }
        },
        {
          path:"addUser",
          name:"addUser",
          component:()=>import("@/views/User/addUser.vue"),
          meta:{
            title:"添加用户"
          }
        },
        {
          path:"changePassword",
          name:"changePassword",
          component:()=>import("@/views/User/changePassword.vue"),
          meta:{
            title:"修改密码"
          }
        },
        {
          path:"editUserInfo",
          name:"editUserInfo",
          component:()=>import("@/views/User/editUserInfo.vue"),
          meta:{
            title:"修改个人信息"
          }
        },
        {
          path:"swiperList",
          name:"swiperList",
          component:()=>import("@/views/Swiper/swiperList.vue"),
          meta:{
            title:"轮播图列表"
          }
        },
        {
          path:"addSwiper",
          name:"addSwiper",
          component:()=>import("@/views/Swiper/addSwiper.vue"),
          meta:{
            title:"添加轮播图"
          }
        },
        {
          path:"bookList",
          name:"bookList",
          component:()=>import("@/views/Book/bookList.vue"),
          meta:{
            title:"图书列表"
          }
        },
        {
          path:"addBook",
          name:"addBook",
          component:()=>import("@/views/Book/addBook.vue"),
          meta:{
            title:"添加图书"
          }
        },
      ]
    }
  ]
})
