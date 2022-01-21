import { mount } from '@vue/test-utils';
import ItemListPage from '@/views/ItemList.vue';
import Item from '@/components/ItemList/Item.vue';

describe('ItemListItem', () => {
  it('redners ItemListItem', () => {
    const wrapper = mount(ItemListPage);

    expect(wrapper.find('.item-list-item').exists()).toBe(true);
  });

  it('redners ItemComponent props data', async () => {
    const wrapper = mount(ItemListPage);

    const itemWrapper = setTimeout(() => {
      mount(Item);
    }, 1000);

    await setTimeout(() => {
      wrapper.setData({
        items: [
          {
            id: 1,
            mainImageUrl: 'https://user-images.githubusercontent.com/66211721/149165057-fec02ae9-e0a4-4690-93f8-17328de38ab7.png',
            title: '남성용 반지갑',
            content: '짱짱한 가죽 지갑입니다.',
          },
        ],
      });
    }, 1000);

    setTimeout(() => {
      expect(itemWrapper.find('.item-title').text()).toEqual('남성용 반지갑');

      expect(itemWrapper.find('.item-img').attributes().src).toEqual('https://user-images.githubusercontent.com/66211721/149165057-fec02ae9-e0a4-4690-93f8-17328de38ab7.png');

      expect(itemWrapper.find('.item-content').text()).toEqual('짱짱한 가죽 지갑입니다.');
    }, 1000);
  });

  it('redners original price if product is discounted', async () => {
    const testOriginalPrice = 19800;
    const testPrice = 12510;
    const testDistcountRate = ((testOriginalPrice - testPrice) / testOriginalPrice) * 100;

    const wrapper = mount(ItemListPage);

    const itemWrapper = setTimeout(() => {
      mount(Item);
    }, 1000);

    await setTimeout(() => {
      wrapper.setData({
        items: [
          {
            price: testPrice,
            original_price: testOriginalPrice,
          },
        ],
      });
    }, 1000);

    setTimeout(() => {
      expect(itemWrapper.find('.item-price_rate').text()).toEqual(`${testDistcountRate.toFixed(0)}%`);

      expect(itemWrapper.find('.item-price').text()).toEqual(`${testPrice.toLocaleString()}`);

      expect(itemWrapper.find('.item-origin_price').text()).toEqual(`${testOriginalPrice.toLocaleString()}`);
    }, 1000);
  });
});
