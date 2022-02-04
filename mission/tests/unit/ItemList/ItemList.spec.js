import { mount, flushPromises } from '@vue/test-utils';
import itemGet from '@/api/repositories/ItemRepository';
import ItemListPage from '@/views/ItemList.vue';
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

    itemGet.get = jest.fn().mockResolvedValue(res);
    wrapper = mount(ItemListPage);
    itemWrapper = mount(Item);

    // use mockImplementation
    // jest.mock('@/api/repositories/ItemRepository', () => jest.fn().mockImplementation(() => ({
    //   get: jest.fn(() => ({
    //     data: [{
    //       description: '아주 잘 맞는 수트',
    //       image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
    //       name: '핏이 좋은 수트',
    //       original_price: 298000,
    //       price: 198000,
    //       product_no: 'asdf1234',
    //     }],
    //   })),
    // })));
  });

  it('api repository call test', () => {
    expect(itemGet.get).toHaveBeenCalledTimes(1);
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
    itemGet.get().then((data) => {
      expect(data).toEqual(res);
    });
  });
});

describe('ItemListPage', () => {
  it('renders HeaderComponent', () => {
    const wrapper = mount(ItemListPage);

    expect(wrapper.find('.item-list-header').exists()).toBe(true);
  });

  it('renders NavigationComponent', () => {
    const wrapper = mount(ItemListPage);

    expect(wrapper.find('.navigation-wrapper').exists()).toBe(true);
  });
});
