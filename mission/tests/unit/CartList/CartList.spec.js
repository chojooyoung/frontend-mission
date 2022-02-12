import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import CartListPage from '@/views/CartList.vue';

describe('CartListPage', () => {
  let wrapper;
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
        plugins: [store],
      },
    });
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
