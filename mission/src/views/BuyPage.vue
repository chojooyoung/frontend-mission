<template>
  <div id="item-buy-page">
    <Header class="item-list-header" :pageName="headerText"/>
    <form class="buy-form" @submit.prevent="confirmOrder">
        <h1>결제정보</h1>
        <h2>상품 정보</h2>
        <div class="item-count">상품 갯수</div>
        총 {{this.getListcount()}} 개
        <div class="item-name">상품명</div>
        <div v-for="item in cartLists" :key="item.product_no">
            <div data-test="input-orderlist-name">{{item.name}}</div>
        </div>
        <div class="price">
            총 가격: {{this.listTotalPrice()}}원
        </div>
        <h2>주문 정보</h2>
        <div>주문자명</div>
        <input  data-test="input-orderer-name" type="text" required/>
        <div>전화번호</div>
        <input type="tel"
        data-test="input-orderer-phonenum"
        pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
        required/>
        <div>주소</div>
        <input type="text" data-test="input-orderer-address" required/>
        <div>결제 방법</div>
        <label >
            <input v-model='checkedValues'
            type="checkbox"
            name="cash"
            value="card"
            @change="clickCheckbox"
            />
            카드
        </label>
        <label>
            <input v-model='checkedValues'
            type="checkbox"
            name="cash"
            value="account"
            @change="clickCheckbox"
            />
            계좌
        </label>
        <button data-test="router-toCompletePage">최종 결제</button>
    </form>
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

export default {
  name: 'ItemListPage',
  components: {
    Header, Navgation,
  },
  data() {
    return {
      cartLists: [],
      checkedValues: [],
      itemLists: '',
      headerText: 'My Shopping Mall',
    };
  },
  methods: {
    ...mapGetters('cartList', ['getCartList', 'cartListsLength', 'cartListsTotalPrice']),
    ...mapMutations('cartList', ['clearCartList']),
    getBuyList() {
      return this.getCartList();
    },
    getListcount() {
      return this.cartListsLength();
    },
    listTotalPrice() {
      return this.cartListsTotalPrice();
    },
    initBindData() {
      this.cartLists = this.getCartList();
    },
    clickCheckbox(event) {
      for (let i = 0; i < this.checkedValues.length; i += 1) {
        if (this.checkedValues[i] !== event.target.value) {
          this.checkedValues.splice(i, 1);
        }
      }
    },
    confirmOrder() {
      this.$router.push('/Complete');
      this.clearCartList();
    },
  },
  created() {
    this.initBindData();
  },
};
</script>

<style>
.item-buy-page{
  max-width: 375px;
  width:100%;
}
.item-list-header{
  text-align: center;
}
.buy-form{
  margin:30px;
  text-align: left;
}
.item-count{
  font-weight: bold;
  font-size: 20px;;
}
.item-name{
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;;
}
.price{
  margin-top: 20px;
  font-size: 20px;
}
.nav-wrapper{
  margin-left: calc(-50vw + 50%);
  position: relative;
}
footer{
  height:100px;
}
</style>
