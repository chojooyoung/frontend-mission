import { mount } from '@vue/test-utils';
import ItemListPage from '@/views/ItemList.vue';
import Header from '@/components/ItemList/Header.vue';

describe('itemListHeader', () => {
  it('check HeaderComponent props render test', async () => {
    const wrapper = mount(ItemListPage);

    await wrapper.setData({ headerText: 'headerText' });

    const headerWrapper = await mount(Header);

    expect(headerWrapper.find('.header-wrapper').exists()).toBe(true);
  });

  it('check HeaderComponent setProps render test', () => {
    const headerWrapper = mount(Header, {
      propsData: {
        pageName: 'headerText',
      },
    });
    expect(headerWrapper.props().pageName).toBe('headerText');
    expect(headerWrapper.find('.header-wrapper').exists()).toBe(true);
  });

  it('check HeaderComponent data binding ', async () => {
    const wrapper = mount(Header);

    await wrapper.setData({ headerName: 'headerText' });

    expect(wrapper.find('.header_visible').text()).toEqual('headerText');
  });

  it('check operate handle scroll-event method', () => {
    const updateScrollHeight = jest.fn();
    const isShow = jest.fn();
    // eslint-disable-next-line no-unused-vars
    const wrapper = mount(Header, {
      methods: { updateScrollHeight, isShow },
    });
    window.dispatchEvent(new Event('scroll'));
    expect(updateScrollHeight).toHaveBeenCalled();
  });

  it('check HeaderComponent operate scroll-event', async () => {
    const wrapper = mount(Header);

    await wrapper.setData({ scrollHeight: 100 });

    expect(wrapper.find('.header_unvisible').exists()).toBe(true);
    expect(wrapper.find('.header_visible').exists()).toBe(false);
  });
});
