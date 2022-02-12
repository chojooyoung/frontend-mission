import BuyPage from '@/views/BuyPage.vue';
import CompletePage from '@/views/CompleteOrder.vue';
import store from '@/store/index';

const buyRoutes = [

  {
    path: '/Buy',
    name: 'BuyPage',
    component: BuyPage,
    meta: { auth: true }, // 인증이 필요한 페이지란 것을 알리는 태그
    // 라우터 beforeEnter 가드 함수.
    beforeEnter(to, from, next) {
      // 인증이 필요한 페이지이고(and), store를 불러와 로그인 상태가 아니라면
      if (to.meta.auth && !store.getters['cartList/isCarted']) {
        // next 키워드로 장바구니 상태페이지로 보내버린다.
        // eslint-disable-next-line no-alert
        alert('장바구니에 상품을 넣어주세요.');
        next('/cartList');
        return;
      }
      // 로그인을 한 상태면 그대로 페이지로 접근시킨다.
      next();
    },
  },

  {
    path: '/Complete',
    name: 'CompletePage',
    component: CompletePage,
  },

];

export default buyRoutes;
