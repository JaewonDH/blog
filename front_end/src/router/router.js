import Vue from 'vue';
import VueRouter from 'vue-router';
import BlogList from '../components/BlogList';
import BlogListDetail from '../components/BlogListDetail';
import BlogWrite from '../components/BlogWrite.vue';
import CSSTest from '../components/CSSTest.vue';
import Test from '../components/Test';

Vue.use(VueRouter);
let router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/', // 경로
      name: 'BlogList', // 해당 경로의 이름
      component: BlogList // 이동할 컴포넌트
    },

    {
      path: '/BlogListDetail/:id', // 경로
      name: 'BlogListDetail', // 해당 경로의 이름
      component: BlogListDetail // 이동할 컴포넌트
    },
    {
      path: '/BlogWrite', // 경로
      name: 'BlogWrite', // 해당 경로의 이름
      component: BlogWrite // 이동할 컴포넌트
    },
    {
      path: '/CSSTest', // 경로
      name: 'CSSTest', // 해당 경로의 이름
      component: CSSTest // 이동할 컴포넌트
    },
    {
      path: '/test', // 경로
      name: 'test', // 해당 경로의 이름
      component: Test // 이동할 컴포넌트
    }
  ]
});
export default router;
