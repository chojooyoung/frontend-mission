import { createStore } from 'vuex';
import { mount, flushPromises } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import itemRoute from '@/router/cart';
import ItemListPage from '@/views/ItemList.vue';
import CartItem from '@/components/CartList/cartItem.vue';
import App from '@/App.vue';

describe('ItemListItem', () => {
  let wrapper;

  let routes = [
    {
      path: '/',
      name: 'Home',
      component: ItemListPage,
    },
  ];
  routes = [].concat(routes, itemRoute);

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
    mutations: { // 데이터를 수정하는 권한
      deleteCartList(state, deleteItemObject) {
        const arr = state.cartLists.filter(
          (item) => item.product_no !== deleteItemObject.product_no,
        );
        state.cartLists = arr;
      },
      changeCartListState(state) {
        state.isPutItemCart = !state.isPutItemCart;
      },
    },
  });

  beforeEach(async () => {
    wrapper = await mount(CartItem, {
      global: {
        plugins: [router, store],
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

    await wrapper.find('[data-test="router-iteminfo"]').trigger('click');
    await flushPromises();
    expect(Appwrapper.find('.info').exists()).toBe(true);
  });

  it('store default rendering test', async () => {
    expect(wrapper.find('[data-test="cartList-data-name"]').text()).toBe('핏이 좋은 수트');
  });

  it('store mutation(delete) test', async () => {
    await wrapper.find('[data-test="cartList-delete"]').trigger('click');
    expect(wrapper.find('[data-test="cartList-data"]').exists()).toBe(false);
  });

  it('renders cartListItem', () => {
    wrapper = mount(CartItem);

    expect(wrapper.find('.item-list-item').exists()).toBe(true);
  });

  it('renders original price if product is empty or undefined', async () => {
    wrapper = mount(CartItem);

    await wrapper.setData({});

    expect(wrapper.find('.item').exists()).toBe(false);
  });
});
