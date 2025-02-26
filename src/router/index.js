import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '@/views/Index';
import Home from '@/views/Home';
import Goods from '@/views/Goods';
import Thanks from '@/views/Thanks';
import Login from '@/views/Login';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home',
    name: 'home',
    component: Index,
    children: [
      {
        path: 'home',
        component: Home
      },
      {
        path: 'goods',
        component: Goods
      },
      {
        path: 'thanks',
        component: Thanks
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
