import { mount, create } from '@vue/test-utils';
import ReviewList from '@/components/ReviewList.vue';
import ItemInfoPage from '@/views/ItemInfo.vue';
import itemInfo from '@/data/itemInfo';
import Like from '@/components/LikeButton.vue';

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
    expect(wrapper.find('.info-main_img').attributes().src).toEqual(itemInfo[0].mainImageUrl);
  });

  it('checks the img style(square)', async () => {
    const wrapper = mount(ItemInfoPage);
    await wrapper.setData({ mainImageUrl: 'https://user-images.githubusercontent.com/66211721/149165057-fec02ae9-e0a4-4690-93f8-17328de38ab7.png' });
    expect(wrapper.find('.info-main_img').element.style).toContain('width');
  });

  it('change like imgage at a time per like button click', async () => {
    const likeWrapper = mount(Like);
    await likeWrapper.find('.userDislikePost').trigger('click');
    expect(likeWrapper.find('.userDislikePost').exists()).toBe(true);
  });

  it('checks seller default profileimg rendering', async () => {
    const wrapper = mount(ItemInfoPage);
    await wrapper.setData({ author: { profileImageUrl: 'null' } });
    expect(wrapper.find('.info-seller-defaultImg').exists()).toBe(true);
    expect(wrapper.find('.info-seller-profileImg').exists()).toBe(false);
  });

  it('renders and viding data an seller-info', async () => {
    const wrapper = mount(ItemInfoPage);
    await wrapper.setData({
      author: {
        tag: '#지갑 #잡화',
        nickname: '지갑전문',
      },
    });
    expect(wrapper.find('.info-seller-subinfo-name').text()).toEqual('지갑전문');
    expect(wrapper.find('.info-seller-subinfo-tag').text()).toEqual('#지갑 #잡화');
  });

  it('renders and viding data an item-info', async () => {
    const wrapper = mount(ItemInfoPage);
    await wrapper.setData({
      title: '지갑',
      isDiscount: 'true',
      price: '100000',
      discountRate: 30,
      content: '<div class="content" style="text-align:left; margin-left:20px;">호불호 없는 지갑입니다.</div>',
    });
    expect(wrapper.find('.info-item-title').text()).toEqual('지갑');
    expect(wrapper.find('.info-item-priceinfo-rate').text()).toEqual('30%');
    expect(wrapper.find('.info-item-priceinfo-origin_price').text()).toEqual('100,000 원');
    expect(wrapper.find('.content').text()).toEqual('호불호 없는 지갑입니다.');
  });

  // 리뷰 컴포넌트 테스팅
  it('redners reviewList', () => {
    const wrapper = mount(ReviewList);
    expect(wrapper.find('.review-list').exists()).toBe(true);
  });

  it('checks reviewer nickname filter by method', async () => {
    const wrapper = mount(ReviewList);
    await wrapper.setData({
      id: 1,
      reviewer: {
        id: 1,
        nickname: 'chojoo',
      },
    });
    expect(wrapper.find('.reviewer-nickname').text()).toEqual('cho***');
  });
  it('checks review time filter by method', async () => {
    const wrapper = mount(ReviewList);
    await wrapper.setData({
      id: 3,
      createdDate: '2021-12-02T19:19:18',
    });
    expect(wrapper.find('.reviewer-time').text()).toEqual('44일전');
  });

  it('redners reviewList-title', () => {
    const wrapper = mount(ReviewList);
    expect(wrapper.find('.review-title').exists()).toBe(true);
  });
  it('redners reviewList-content', () => {
    const wrapper = mount(ReviewList);
    expect(wrapper.find('.review-content').exists()).toBe(true);
  });

  it('redners reviewList-img', () => {
    const wrapper = mount(ReviewList);
    expect(wrapper.find('.review-list-review_img').exists()).toBe(true);
  });

  it('checks the img style(square)', async () => {
    const wrapper = mount(ReviewList);
    expect(wrapper.find('.review-list-review_img').element.style).toContain('width');
  });
});
