import { mount, flushPromises } from '@vue/test-utils';
import wishGet from '@/api/repositories/WishRepository';
import WishListPage from '@/views/WishList.vue';
import Item from '@/components/ItemList/Item.vue';

describe('ItemListPage api testing', () => {
  let wrapper;
  let itemWrapper;

  beforeEach(() => {
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

    wishGet.get = jest.fn().mockResolvedValue(res);
    wrapper = mount(WishListPage);
    itemWrapper = mount(Item);
  });

  it('api repository call test', () => {
    expect(wishGet.get).toHaveBeenCalledTimes(1);
  });

  it('api repository data test', () => {
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
    wishGet.get().then((data) => {
      expect(data).toEqual(res);
    });
  });

  it('api binding test', async () => {
    await wishGet.get();
    await flushPromises();
    const items = wrapper.findAll('.item-wrapper');
    await expect(items).toHaveLength(1);
  });

  it('renders ItemComponent', async () => {
    await flushPromises();

    await expect(wrapper.find('.item-wrapper').exists()).toBe(true);
  });
});

describe('ItemListPage', () => {
  it('renders HeaderComponent', () => {
    const wrapper = mount(WishListPage);

    expect(wrapper.find('.item-list-header').exists()).toBe(true);
  });

  it('renders NavigationComponent', () => {
    const wrapper = mount(WishListPage);

    expect(wrapper.find('.navigation-wrapper').exists()).toBe(true);
  });
});
