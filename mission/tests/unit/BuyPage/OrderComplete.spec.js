import { mount, flushPromises } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import CartListPage from '@/views/CompleteOrder.vue';
import BuyRoute from '@/router/buy';
import ItemListPage from '@/views/ItemList.vue';
import App from '@/App.vue';

describe('CartListPage', () => {
  let wrapper;
  let routes = [
    {
      path: '/',
      name: 'Home',
      component: ItemListPage,
    },
  ];
  routes = [].concat(routes, BuyRoute);

  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
  });

  beforeEach(() => {
    wrapper = mount(CartListPage, {
      global: {
        plugins: [router],
      },
    });
  });

  it('routing test', async () => {
    router.push('/');
    await router.isReady();

    const Appwrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    await wrapper.find('[data-test="router-home"]').trigger('click');
    await flushPromises();
    expect(Appwrapper.find('#item-list-page').exists()).toBe(true);
  });
});
