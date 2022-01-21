import { mount } from '@vue/test-utils';
import ItemListPage from '@/views/ItemList.vue';

describe('ItemListPage', () => {
  it('redners ItemListPage', async () => {
    const wrapper = mount(ItemListPage);

    expect(wrapper.find('#item-list-page').exists()).toBe(true);
  });

  it('redners HeaderComponent', () => {
    const wrapper = mount(ItemListPage);

    expect(wrapper.find('.item-list-header').exists()).toBe(true);
  });

  it('redners ItemComponent', () => {
    const wrapper = mount(ItemListPage);

    expect(wrapper.find('.item-list').exists()).toBe(true);
  });
});
