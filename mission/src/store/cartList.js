export default {
  namespaced: true,
  state() { // 함수로 반환 왜? 데이터기 때문에.
    return {
      cartLists: [],
      isPutItemCart: '',
    };
  },
  getters: {
    getCartList(state) {
      return state.cartLists;
    },
    getisPutItemCart(state) {
      return state.isPutItemCart;
    },

  },
  mutations: { // 데이터를 수정하는 권한
    addToCartList(state, addItemObject) {
      state.cartLists.push(addItemObject);
    },
    deleteCartList(state, deleteItemObject) {
      const arr = state.cartLists.filter((item) => item.product_no !== deleteItemObject.product_no);
      state.cartLists = arr;
    },
    // eslint-disable-next-line no-unused-vars
    changeCartListToTrue(state) {
      state.isPutItemCart = true;
    },
    changeCartListToFalse(state) {
      state.isPutItemCart = false;
    },
    changeCartListState(state) {
      state.isPutItemCart = !state.isPutItemCart;
    },
  },
  actions: {// constext=>state,getters,commit, dispatch

  },

};
