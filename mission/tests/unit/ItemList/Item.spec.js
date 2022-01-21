import { mount } from '@vue/test-utils';
import ItemListPage from '@/views/ItemList.vue';
import Item from '@/components/ItemList/Item.vue';

describe('ItemListItem', () => {
  it('redners ItemListItem', () => {
    const wrapper = mount(ItemListPage);

    expect(wrapper.find('.item-list-item').exists()).toBe(true);
  });

  it('redners ItemComponent props data', async () => {
    const wrapper = await mount(Item);

    await wrapper.setData({
      itemInfo: {
        id: 1,
        mainImageUrl: 'https://user-images.githubusercontent.com/66211721/149165057-fec02ae9-e0a4-4690-93f8-17328de38ab7.png',
        title: '남성용 반지갑',
        content: '짱짱한 가죽 지갑입니다.',
      },
    });

    expect(wrapper.find('.item-title').text()).toEqual('남성용 반지갑');

    expect(wrapper.find('.item-img').attributes().src).toEqual('https://user-images.githubusercontent.com/66211721/149165057-fec02ae9-e0a4-4690-93f8-17328de38ab7.png');

    expect(wrapper.find('.item-content').text()).toEqual('짱짱한 가죽 지갑입니다.');
  });

  it('redners original price if product is discounted', async () => {
    const testOriginalPrice = 19800;
    const testPrice = 12510;
    const testDistcountRate = ((testOriginalPrice - testPrice) / testOriginalPrice) * 100;

    const wrapper = mount(Item);

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

  it('redners original price if product is empty or undefined', async () => {
    const wrapper = mount(Item);

    await wrapper.setData({});

    expect(wrapper.find('.item').exists()).toBe(false);
  });
});
