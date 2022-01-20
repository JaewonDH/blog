import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';
Vue.use(VueRouter);
const router = new VueRouter({
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
      component: () => import('@/view/BlogList')
    },
    {
      path: '/BlogListDetail/:id',
      name: 'BlogListDetail',
      component: () => import('@/view/BlogListDetail')
    },
    {
      path: '/BlogWrite',
      name: 'BlogWrite',
      component: () => import('@/view/BlogWrite'),
      meta: { auth: true }
    },
    {
      path: '/CSSTest',
      name: 'CSSTest',
      component: () => import('@/view/CSSTest')
    },
    {
      path: '/Test',
      name: 'Test',
      component: () => import('@/view/Test')
    },
    {
      // 없는 페이지 설정 http://localhost:8080/34efdf/ 접속시 나오는 페이지
      path: '*',
      component: () => import('@/view/NotFound')
    }
  ]
});

router.beforeEach((to, from, next) => {
  // 인증이 안되어있을 경우 글쓰기 페이지로 가지 못하도록 예외 처리
  if (to.meta.auth && !store.state.LoginStore.isLogin) {
    //.catch(() => {}) 붙이지 않으면 콘솔에서 에러 남
    router.push({ path: '/' }).catch(() => {});
    return;
  } else if (to.path !== from.path) {
    next();
  }
});

export default router;
