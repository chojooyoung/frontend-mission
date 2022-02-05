import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import Navigation from '@/components/ItemList/Navigation.vue';
import ItemListPage from '@/views/ItemList.vue';
import CartListPage from '@/views/CartList.vue';
import MyPage from '@/views/MyPage.vue';
import WishListPage from '@/views/WishList.vue';

import cartRoute from '@/router/cart';
import userRoute from '@/router/user';
import wishRoute from '@/router/wish';
import App from '@/App.vue';

describe('itemListNavigation', () => {
  let wrapper;

  let routes = [
    {
      path: '/',
      name: 'Home',
      component: ItemListPage,
    },
  ];
  routes = [].concat(routes, cartRoute, userRoute, wishRoute);

  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
  });

  wrapper = mount(Navigation);

  it('cart routing test', async () => {
    router.push('/');
    await router.isReady();

    const Appwrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    await wrapper.find('[data-test="router-CartList"]').trigger('click');

    expect(Appwrapper.findComponent(CartListPage).exists()).toBe(true);
  });

  it('myInfo routing test', async () => {
    router.push('/');
    await router.isReady();

    const Appwrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    await wrapper.find('[data-test="router-MyPage"]').trigger('click');

    expect(Appwrapper.findComponent(MyPage).exists()).toBe(true);
  });

  it('cart routing test', async () => {
    router.push('/');
    await router.isReady();

    const Appwrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    await wrapper.find('[data-test="router-WishList"]').trigger('click');

    expect(Appwrapper.find(WishListPage).exists()).toBe(true);
  });
  it('check NavigationComponent render test', async () => {
    wrapper = mount(Navigation);

    expect(wrapper.find('.navgation-bar').exists()).toBe(true);
  });

  it('check NavigationComponent setData render test', async () => {
    wrapper = mount(Navigation);

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
