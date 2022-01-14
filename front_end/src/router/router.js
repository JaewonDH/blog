import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
export default new VueRouter({
  mode: 'history',
  routes: [
    {
      // http://localhost:8080 접속시 redirect 리스트 페이지 표시
      //처음 페이지 집입시
      path: '/',
      redirect: '/BlogList'
    },
    {
      path: '/BlogList',
      name: 'BlogList',
      component: () => import('@/components/BlogList')
    },
    {
      path: '/BlogListDetail/:id',
      name: 'BlogListDetail',
      component: () => import('@/components/BlogListDetail')
    },
    {
      path: '/BlogWrite',
      name: 'BlogWrite',
      component: () => import('@/components/BlogWrite')
    },
    {
      path: '/CSSTest',
      name: 'CSSTest',
      component: () => import('@/components/CSSTest')
    },
    {
      path: '/Test',
      name: 'Test',
      component: () => import('@/components/Test')
    },
    {
      // 없는 페이지 설정 http://localhost:8080/34efdf/ 접속시 나오는 페이지
      path: '*',
      component: () => import('@/components/NotFound')
    }
  ]
});
