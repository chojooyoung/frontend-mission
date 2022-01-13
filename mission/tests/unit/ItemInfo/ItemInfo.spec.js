import { mount, shallow } from '@vue/test-utils';
import ItemInfoPage from '@/views/ItemInfo.vue';
import itemInfo from '@/data/itemInfo';
import Like from '@/components/Like.vue';

describe('ItemInfoPage', () => {
  it('redners ItemInfoPage', () => {
    const wrapper = mount(ItemInfoPage);

    expect(wrapper.find('#item-info-page').exists()).toBe(true);
  });

  it('has mainimage in ItemInfoPage', () => {
    const wrapper = mount(ItemInfoPage);
    expect(wrapper.find('.info-main_img').exists()).toBe(true);
  });

  it('renders an item-imgae', () => {
    const wrapper = mount(ItemInfoPage);
    expect(wrapper.find('.info-main_img').attributes().src).toEqual(itemInfo[0].mainImageUrl);
  });

  it('change like imgage at a time per like button click', async () => {
    const likeWrapper = mount(Like);
    await likeWrapper.find('.userDislikePost').trigger('click');
    expect(likeWrapper.find('.userDislikePost').exists()).toBe(true);
  });
});
