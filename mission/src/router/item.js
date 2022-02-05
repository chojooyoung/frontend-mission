import WishList from '@/views/WishList.vue';
import ItemInfo from '@/views/ItemInfo.vue';

const itemRoutes = [

  {
    path: '/item/:itemId',
    name: 'itemInfo',
    component: ItemInfo,
    props: true,
  },

];

export default itemRoutes;
