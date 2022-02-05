import { mount } from '@vue/test-utils';
import ReviewList from '@/components/ReviewList.vue';

describe('ItemInfoPage', () => {
  it('redners reviewList', () => {
    const Reviewwrapper = mount(ReviewList);
    expect(Reviewwrapper.find('.review-list').exists()).toBe(true);
  });

  it('checks reviewer nickname filter by method', async () => {
    const Reviewwrapper = mount(ReviewList);
    await Reviewwrapper.setData({
      reviews: {
        name: 'chojoo',
      },
    });
    expect(Reviewwrapper.find('.reviewer-nickname').text()).toEqual('cho***');
  });
  it('checks review time filter by method', async () => {
    const Reviewwrapper = mount(ReviewList);
    await Reviewwrapper.setData({
      created: '2021-12-02T19:19:18',
    });
    expect(Reviewwrapper.find('.reviewer-time').text()).toEqual('44일전');
  });

  it('redners reviewList-title', () => {
    const Reviewwrapper = mount(ReviewList);

    expect(Reviewwrapper.find('.review-title').exists()).toBe(true);
  });
  it('redners reviewList-content', () => {
    const Reviewwrapper = mount(ReviewList);

    expect(Reviewwrapper.find('.review-content').exists()).toBe(true);
  });

  it('redners reviewList-img', () => {
    const Reviewwrapper = mount(ReviewList);

    expect(Reviewwrapper.find('.review-list-review_img').exists()).toBe(true);
  });

  it('checks the img style(square)', async () => {
    const Reviewwrapper = mount(ReviewList);

    expect(Reviewwrapper.find('.review-list-review_img').element.style).toContain('width');
  });
});
