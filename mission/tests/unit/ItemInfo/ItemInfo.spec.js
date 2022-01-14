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

  it('renders and viding data an item-imgae', async () => {
    const wrapper = mount(ItemInfoPage);
    await wrapper.setData({ mainImageUrl: 'https://user-images.githubusercontent.com/66211721/149165057-fec02ae9-e0a4-4690-93f8-17328de38ab7.png' });
    await expect(wrapper.find('.info-main_img').attributes().src).toEqual(itemInfo[0].mainImageUrl);
  });

  it('checks the img style(square)', async () => {
    const wrapper = mount(ItemInfoPage);
    await wrapper.setData({ mainImageUrl: 'https://user-images.githubusercontent.com/66211721/149165057-fec02ae9-e0a4-4690-93f8-17328de38ab7.png' });
    await expect(wrapper.find('.info-main_img').element.style).toContain('width');
  });

  it('change like imgage at a time per like button click', async () => {
    const likeWrapper = mount(Like);
    await likeWrapper.find('.userDislikePost').trigger('click');
    expect(likeWrapper.find('.userDislikePost').exists()).toBe(true);
  });

  it('checks seller default profileimg rendering', async () => {
    const wrapper = mount(ItemInfoPage);
    await wrapper.setData({ author: { profileImageUrl: 'null' } });
    await expect(wrapper.find('.info-seller-defaultImg').exists()).toBe(true);
    await expect(wrapper.find('.info-seller-profileImg').exists()).toBe(false);
  });

  it('renders and viding data an seller-info', async () => {
    const wrapper = mount(ItemInfoPage);
    await wrapper.setData({
      author: {
        tag: '#지갑 #잡화',
        nickname: '지갑전문',
      },
    });
    await expect(wrapper.find('.info-seller-subinfo-name').text()).toEqual('지갑전문');
    await expect(wrapper.find('.info-seller-subinfo-tag').text()).toEqual('#지갑 #잡화');
  });
});
