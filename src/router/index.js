import Vue from 'vue'
import Router from 'vue-router'
import Zhaopian from '@/components/page/zhaopian'
import Reying from '@/components/page/reying'
import Wode from '@/components/page/wode'
import Search from '@/components/page/search'
import CityChoose from '@/components/page/cityChoose'
import MovieDetail from '@/components/page/movieDetail'

Vue.use(Router);
let route =  [
  {
    path: '/zhaopian',
    name: 'zhaopian',
    component: Zhaopian
  },{
    path: '/',
    name: 'reying',
    alias: 'reying',
    component: Reying
  },{
    path: '/wode',
    name: 'wode',
    component: Wode
  },{
    path: '/search/:wasAt',
    name: 'search',
    component: Search
  },{
    path: '/cityChoose',
    name: 'cityChoose',
    component: CityChoose
  },{
    path: '/movieDetail/:wasAt/:movieId',
    name: 'movieDetail',
    component: MovieDetail
  }
];


  let router = new Router({
    routes:route
  });


  router.beforeEach((to, from, next) => {
    if (to.matched.length ===0) {                                        //如果未匹配到路由
      from.name ? next({ name:from.name }) : next('/');   //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
    } else {
      next();                                                                            //如果匹配到正确跳转
    }
  });

export default router;
