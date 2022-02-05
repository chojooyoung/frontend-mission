import { mount, flushPromises } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import itemGet from '@/api/repositories/ItemRepository';
import itemRoute from '@/router/item';
import ItemInfoPage from '@/views/ItemInfo.vue';
import ItemListPage from '@/views/ItemList.vue';
import Item from '@/components/ItemList/Item.vue';
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

  beforeEach(async () => {
    const itemsList = [{
      description: '아주 잘 맞는 수트',
      image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
      name: '핏이 좋은 수트',
      original_price: 298000,
      price: 198000,
      product_no: 'asdf1234',
    }];
    const res = {
      data: { items: itemsList },
    };

    itemGet.get = jest.fn().mockResolvedValue(res);

    wrapper = await mount(Item, {
      global: {
        plugins: [router],
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
    await itemGet.get();

    await wrapper.find('[data-test="router-iteminfo"]').trigger('click');
    setTimeout(() => {
      expect(Appwrapper.find('.info').exists()).toBe(true);
    }, 200);
  });

  it('renders ItemListItem', () => {
    wrapper = mount(Item);

    expect(wrapper.find('.item-list-item').exists()).toBe(true);
  });

  it('renders ItemComponent binding props data ', async () => {
    wrapper = await mount(Item);

    await wrapper.setData({
      itemInfo: {
        id: 1,
        image: 'https://user-images.githubusercontent.com/66211721/149165057-fec02ae9-e0a4-4690-93f8-17328de38ab7.png',
        name: '남성용 반지갑',
        description: '짱짱한 가죽 지갑입니다.',
      },
    });

    expect(wrapper.find('.item-title').text()).toEqual('남성용 반지갑');

    expect(wrapper.find('.item-img').attributes().src).toEqual('https://user-images.githubusercontent.com/66211721/149165057-fec02ae9-e0a4-4690-93f8-17328de38ab7.png');

    expect(wrapper.find('.item-content').text()).toEqual('짱짱한 가죽 지갑입니다.');
  });

  it('renders original price if product is discounted', async () => {
    const testOriginalPrice = 19800;
    const testPrice = 12510;
    const testDistcountRate = ((testOriginalPrice - testPrice) / testOriginalPrice) * 100;

    wrapper = mount(Item);

    await wrapper.setData({
      itemInfo: {
        price: testPrice,
        original_price: testOriginalPrice,
      },
    });

    expect(wrapper.find('.item-price_rate').text()).toEqual(`${testDistcountRate.toFixed(0)}%`);

    expect(wrapper.find('.item-price').text()).toEqual(`${testPrice.toLocaleString()}원`);

    expect(wrapper.find('.item-origin_price').text()).toEqual(`${testOriginalPrice.toLocaleString()}원`);
  });

  it('renders original price if product is empty or undefined', async () => {
    wrapper = mount(Item);

    await wrapper.setData({});

    expect(wrapper.find('.item').exists()).toBe(false);
  });
});
