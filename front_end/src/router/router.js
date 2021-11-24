import Vue from 'vue'
import VueRouter from 'vue-router'
import BlogList from '../components/BlogList'
import BlogListDetail from '../components/BlogListDetail'
import BlogWrite from '../components/BlogWrite.vue'


Vue.use(VueRouter)
let router = new VueRouter({
  mode: 'history', 
  routes: [
      {
        path: "/", // 경로
        name: "BlogList", // 해당 경로의 이름 
        component: BlogList // 이동할 컴포넌트
      },        

      {
        path: "/BlogListDetail", // 경로
        name: "BlogListDetail", // 해당 경로의 이름 
        component: BlogListDetail // 이동할 컴포넌트
      },        
      {
        path: "/BlogWrite", // 경로
        name: "BlogWrite", // 해당 경로의 이름 
        component: BlogWrite // 이동할 컴포넌트
      },        
  ]
}) 
export default router;