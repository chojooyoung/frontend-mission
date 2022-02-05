import { mount, create } from '@vue/test-utils';
import ReviewList from '@/components/ReviewList.vue';
import ItemInfoPage from '@/views/ItemInfo.vue';
import itemInfo from '@/data/itemInfo';
import Like from '@/components/LikeButton.vue';

describe('ItemInfoPage', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ItemInfoPage);
  });
  it('redners ItemInfoPage', () => {
    expect(wrapper.find('#item-info-page').exists()).toBe(true);
  });

  it('has mainimage in ItemInfoPage', () => {
    expect(wrapper.find('.info-main_img').exists()).toBe(true);
  });

  it('renders and viding data an item-imgae', async () => {
    await wrapper.setData({
      itemInfo:
      {
        image: 'https://user-images.githubusercontent.com/66211721/149165057-fec02ae9-e0a4-4690-93f8-17328de38ab7.png',
      },
    });
    expect(wrapper.find('.info-main_img').attributes().src).toEqual(itemInfo[0].mainImageUrl);
  });

  it('change like imgage at a time per like button click', async () => {
    const likeWrapper = mount(Like);
    await likeWrapper.find('.userDislikePost').trigger('click');
    expect(likeWrapper.find('.userDislikePost').exists()).toBe(true);
  });

  it('checks seller default profileimg rendering', async () => {
    await wrapper.setData({ author: { image: 'null' } });
    expect(wrapper.find('.info-seller-defaultImg').exists()).toBe(true);
    expect(wrapper.find('.info-seller-profileImg').exists()).toBe(false);
  });

  it('renders and viding data an seller-info', async () => {
    await wrapper.setData({
      itemInfo: {
        seller: {
          tag: ['지갑', '잡화'],
          name: '지갑전문',
        },
      },
    });
    expect(wrapper.find('.info-seller-subinfo-name').text()).toEqual('지갑전문');
    expect(wrapper.find('.info-seller-subinfo-tag').text()).toEqual('#지갑 #잡화');
  });

  it('renders and viding data an item-info', async () => {
    await wrapper.setData({
      itemInfo: {
        name: '지갑',
        price: '100000',
        description: '<div class="content" style="text-align:left; margin-left:20px;">호불호 없는 지갑입니다.</div>',
      },
    });
    expect(wrapper.find('.info-item-title').text()).toEqual('지갑');
    expect(wrapper.find('.info-item-priceinfo-price').text()).toEqual('100,000 원');
    expect(wrapper.find('.content').text()).toEqual('호불호 없는 지갑입니다.');
  });


  