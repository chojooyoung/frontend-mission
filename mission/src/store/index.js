import { createStore } from 'vuex';
import cartList from './cartList';

export default createStore({
  modules: {
    cartList,
  },
});
