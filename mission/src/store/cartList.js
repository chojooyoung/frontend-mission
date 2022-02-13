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
    isCarted(state) {
      return state.cartLists.length !== 0;
    },
    cartListsLength(state) {
      return state.cartLists.length;
    },
    cartListsTotalPrice(state) {
      const price = state.cartLists.map((item) => item.price);
      const reducer = (accumulator, curr) => accumulator + curr;
      return price.reduce(reducer);
    },

  },
  mutations: { // 데이터를 수정하는 권한
    addToCartList(state, addItemObject) {
      state.cartLists.push(addItemObject);
    },
    deleteCartList(state, itemNumber) {
      const arr = state.cartLists.filter((item) => item.product_no !== itemNumber);
      state.cartLists = arr;
    },
    clearCartList(state) {
      state.cartLists = [];
    },
    changeCartListState(state) {
      state.isPutItemCart = !state.isPutItemCart;
    },
  },
  actions: {// constext=>state,getters,commit, dispatch

  },

};
