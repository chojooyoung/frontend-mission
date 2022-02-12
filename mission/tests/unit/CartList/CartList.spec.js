import { mount, flushPromises } from '@vue/test-utils';
import { createStore } from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';
import CartListPage from '@/views/CartList.vue';
import BuyRoute from '@/router/buy';
import ItemListPage from '@/views/ItemList.vue';
import App from '@/App.vue';

describe('CartListPage', () => {
  let wrapper;
  let routes = [
    {
      path: '/',
      name: 'Home',
      component: ItemListPage,
    },
  ];
  routes = [].concat(routes, BuyRoute);

  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
  });
  const store = createStore({
    namespaced: true,
    state() { // 함수로 반환 왜? 데이터기 때문에.
      return {
        cartLists: [
          {
            description: '<div><p><strong>체형에 관계없이 누구에게나 맞는 수트!</strong></p> <img style="width: 100%;" src="https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-2.png"/> <p>연말 송년회에 아주 어울릴 수트 판매합니다!</p></div>',
            image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
            name: '핏이 좋은 수트',
            original_price: 298000,
            price: 198000,
            product_no: 'asdf1234',
          },
        ],
        isPutItemCart: '',
      };
    },
    getters: {
      getCartList(state) {
        return state.cartLists;
      },
    },
  });

  beforeEach(() => {
    wrapper = mount(CartListPage, {
      global: {
        plugins: [store, router],
      },
    });
  });

  it('routing test', async () => {
    router.push('/');
    await router.isReady();

    const Appwrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    await wrapper.find('[data-test="router-buy"]').trigger('click');
    await flushPromises();
    expect(Appwrapper.find('.item-buy-page').exists()).toBe(true);
  });

  it('renders HeaderComponent', () => {
    expect(wrapper.find('.item-list-header').exists()).toBe(true);
  });

  it('renders itemComponent', () => {
    expect(wrapper.find('.item-wrapper').exists()).toBe(true);
  });

  it('renders NavigationComponent', () => {
    expect(wrapper.find('.nav-wrapper').exists()).toBe(true);
  });
});
