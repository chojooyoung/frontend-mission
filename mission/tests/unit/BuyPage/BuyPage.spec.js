import { mount, flushPromises } from '@vue/test-utils';
import { createStore } from 'vuex';
import CartListPage from '@/views/CartList.vue';

describe('CartListPage', () => {
  let wrapper;

  const store = createStore({
    namespaced: true,
    state() { // 함수로 반환 왜? 데이터기 때문에.
      return {
        cartLists: [{
          description: '<div><p><strong>체형에 관계없이 누구에게나 맞는 수트!</strong></p> <img style="width: 100%;" src="https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-2.png"/> <p>연말 송년회에 아주 어울릴 수트 판매합니다!</p></div>',
          image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
          name: '핏이 좋은 수트',
          original_price: 298000,
          price: 198000,
          product_no: 'asdf1234',
        }],
      };
    },
    getters: {
      getCartList(state) {
        return state.cartLists;
      },
      cartListsLength(state) {
        return state.cartLists.length;
      },
      cartListsTotalPrice(state) {
        const price = state.cartLists.map((item) => item.price);
        const reducer = (accumulator, curr) => accumulator + curr;
        return price.reduce(reducer);
      },
    },
    mutations: { // 데이터를 수정하는 권한
      clearCartList(state) {
        state.cartLists = [];
      },
    },
  });
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    wrapper = mount(CartListPage, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouter,
        },
      },
    });
  });

  it('input data test', async () => {
    const testName = 'paul';
    const testPhoneNum = '010-1234-5678';
    const testAddress = 'seoul';

    await wrapper.find('[data-test="input-orderer-name"]').setValue(testName);
    await wrapper.find('[data-test="input-orderer-phonenum"]').setValue(testPhoneNum);
    await wrapper.find('[data-test="input-orderer-address"]').setValue(testAddress);

    expect(wrapper.find('[data-test="input-orderer-name"]').text()).toBe(testName);
    expect(wrapper.find('[data-test="input-orderer-phonenum"]').text()).toBe(testPhoneNum);
    expect(wrapper.find('[data-test="input-orderer-address"]').text()).toBe(testAddress);
  });

  it('render data test', async () => {
    const testName = '핏이 좋은 수트';
    await flushPromises();
    expect(wrapper.find('[data-test="input-orderlist-name"]').text()).toContain(testName);
  });

  it('routing test', async () => {
    const testName = 'paul';
    const testPhoneNum = '010-1234-5678';
    const testAddress = 'seoul';

    await wrapper.find('[data-test="input-orderer-name"]').setValue(testName);
    await wrapper.find('[data-test="input-orderer-phonenum"]').setValue(testPhoneNum);
    await wrapper.find('[data-test="input-orderer-address"]').setValue(testAddress);

    await wrapper.find('[data-test="router-toCompletePage"]').trigger('click');

    await flushPromises();
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith('/Complete');
  });
});
