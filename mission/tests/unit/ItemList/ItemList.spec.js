import { mount } from '@vue/test-utils';
import ItemListPage from '@/views/ItemList.vue';

describe('ItemListPage', () => {
  it('renders ItemListPage', async () => {
    const wrapper = mount(ItemListPage);

    expect(wrapper.find('#item-list-page').exists()).toBe(true);
  });

  it('renders HeaderComponent', () => {
    const wrapper = mount(ItemListPage);

    expect(wrapper.find('.item-list-header').exists()).toBe(true);
  });

  it('renders ItemComponent', () => {
    const wrapper = mount(ItemListPage);

    expect(wrapper.find('.item-list').exists()).toBe(true);
  });

  it('renders NavigationComponent', () => {
    const wrapper = mount(ItemListPage);

    expect(wrapper.find('.navigation-wrapper').exists()).toBe(true);
  });
});
