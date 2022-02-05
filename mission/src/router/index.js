import { createRouter, createWebHistory } from 'vue-router';
import NotFound from '@/views/NotFound.vue';
import ItemListPage from '@/views/ItemList.vue';
import ItemInfo from '@/views/ItemInfo.vue';
import WishList from '@/views/WishList.vue';
import wishRoute from './wish';
import itemRoute from './item';

let routes = [
  {
    path: '/',
    name: 'Home',
    component: ItemListPage,
  },
  // {
  //   path: '/item/:itemId',
  //   name: 'itemInfo',
  //   component: ItemInfo,
  //   props: true,
  // },
  // {
  //   path: '/WishList',
  //   name: 'WishList',
  //   component: WishList,
  // },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/:notFount(.*)',
    component: NotFound,
  },
];
routes = [].concat(routes, itemRoute, wishRoute);

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
