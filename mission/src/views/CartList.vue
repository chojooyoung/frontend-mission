<template>
  <div id="item-cart-page">
    <Header class="item-list-header" :pageName="headerText"/>
    <div class="top-wrapper">
      <div class="cart-title">장바구니 목록</div>
      <router-link data-test="router-buy" :to="'/Buy'">
        <button class="buy-button">구매</button>
      </router-link>
    </div>
    <div class="item-wrapper">
      <div v-if="isBindData()">
      <Item  class="item-list"
      v-for="item in cartLists"
      :item="item"
      :key="item.product_no"
      :id="item.product_no"/>
      </div>
      <div v-else>
        장바구니에 상품이 없습니다.
      </div>
    </div>
    <div class="nav-wrapper">
      <Navgation />
    </div>
    <footer></footer>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Header from '@/components/ItemList/Header.vue';
import Navgation from '@/components/ItemList/Navigation.vue';
import Item from '@/components/CartList/cartItem.vue';

export default {
  name: 'CartList',
  components: {
    Header, Item, Navgation,
  },
  data() {
    return {
      headerText: 'My Shopping Mall',
      cartLists: [{}],
    };
  },
  methods: {
    ...mapGetters('cartList', ['getCartList']),
    initBindData() {
      this.cartLists = this.getCartList();
      console.log(this.cartLists);
    },

    isBindData() {
      if (this.cartLists.length > 0) {
        return true;
      }
      return false;
    },

  },
  created() {
    this.initBindData();
  },
};
</script>

<style>
.item-cart-page{
  max-width: 375px;
  width:100%;
}
.item-list-header{
  text-align: center;
}
.top-wrapper{
  display: flex;
  justify-content: space-between;
}
.cart-title{
  font-weight: bold;
  font-size: 24px;
  margin-top:50px;
  text-align: left;
}
.item-wrapper{
  margin-top: 40px;
}
.item-wrapper{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap:20px
}
.buy-button{
  margin-top:55px;
  max-width:100px;
  width:100%;
  height:30px;
  border:solid 0.1px gray;
  border-radius: 5px;
  background: white;
}
.nav-wrapper{
  margin-left: calc(-50vw + 50%);
  position: relative;
}
footer{
  height:100px;
}
</style>
