import { mount } from '@vue/test-utils';
import Navigation from '@/components/ItemList/Navigation.vue';

describe('itemListNavigation', () => {
  it('check NavigationComponent render test', async () => {
    const wrapper = mount(Navigation);

    expect(wrapper.find('.navgation-bar').exists()).toBe(true);
  });

  it('check NavigationComponent setData render test', async () => {
    const wrapper = mount(Navigation);

    await wrapper.setData({
      navigationData: [{
        id: 1,
        navImg: '../assets/navigationHome.svg',
        navText: 'test',
        RouterNav: 'test',
      }],
    });
    expect(wrapper.find('.navigation-bar_icon').attributes().src).toEqual('../assets/navigationHome.svg');
    expect(wrapper.find('.navgation-bar').text()).toEqual('test');
  });
});
