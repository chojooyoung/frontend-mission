import { createRouter, createWebHistory } from 'vue-router';
import NotFound from '@/views/NotFound.vue';
import ItemListPage from '@/views/ItemList.vue';
import userRoute from './user';
import wishRoute from './wish';
import itemRoute from './item';
import cartRoute from './cart';
import buyRoute from './buy';

let routes = [
  {
    path: '/',
    name: 'Home',
    component: ItemListPage,
  },

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
routes = [].concat(routes, itemRoute, wishRoute, userRoute, cartRoute, buyRoute);

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
