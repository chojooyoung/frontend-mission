import { mount } from '@vue/test-utils';
import ItemListPage from '@/views/ItemList.vue';
import Header from '@/components/ItemList/Header.vue';

describe('ItemListItem', () => {
  it('check HeaderComponent props render test', async () => {
    const wrapper = mount(ItemListPage);

    await wrapper.setData({ headerText: 'headerText' });

    const headerWrapper = await mount(Header);

    await expect(headerWrapper.find('.header-wrapper').exists()).toBe(true);
  });

  it('check HeaderComponent data binding ', async () => {
    const wrapper = mount(Header);

    await wrapper.setData({ headerName: 'headerText' });

    expect(wrapper.find('.header_visible').text()).toEqual('headerText');
  });

  it('check HeaderComponent operate scroll-event', async () => {
    const wrapper = mount(Header);

    await wrapper.setData({ scrollHeight: 100 });

    const wrappers = mount(Header);

    setTimeout(() => {
      expect(wrappers.find('.header_unvisible').exists()).toBe(true);
      expect(wrappers.find('.header_visible').exists()).toBe(false);
    }, 1000);
  });
});
