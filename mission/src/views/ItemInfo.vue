<template>
<div id='item-info-page'>
  <div class="info">
    <img class="info-main_img" :src="`${itemInfo.image}`" alt="itemImg"/>
    <div class="info-seller-wrapper">
      <!-- 판매자 정보 -->
      <div class="info-seller">
        <div v-if="itemInfo.seller.profile_image === 'null'">
          <img class="info-seller-defaultImg"
              src="../assets/basicUserAvatar.svg"
              alt="deafaultUserImg"/>
        </div>
        <div v-else>
          <img class="info-seller-profileImg"
               :src="`${itemInfo.seller.profile_image}`"
               alt="sellerProfileImg"
          />
        </div>
        <div class="info-seller-subinfo">
          <div class="info-seller-subinfo-name">{{itemInfo.seller.name}}</div>
          <span class="info-seller-subinfo-tag"
          v-for="tag in itemInfo.seller.hash_tags"
          :key="tag"
          >#{{tag}}</span>
        </div>
        <Like class="like-button" :isLike="isLiked" />
        <img
        data
        v-if="getisPutItemCart()"
        @click="cartButtonClick()"
        data-test="itemInfo-store-iscarted"
        class="cart-img"
        src="../assets/isCarted.svg"
        alt="caet-img"/>
        <img
        v-else
        @click="cartButtonClick()"
        data-test="itemInfo-store-discarted"
        class="cart-img"
        src="../assets/navigationCart.svg"
        alt="caet-img"/>
      </div>
    </div>
    <div class="divider"></div>
      <!-- 상품 정보 -->
    <div class="info-item">
      <div class="info-item-title">{{itemInfo.name}}</div>
      <div class="info-item-priceinfo">
        <div v-if="isDiscounted===false">
          <div class="info-item-priceinfo-price">{{itemInfo.price}}</div>
        </div>
        <div v-else>
          <div class="discount-price-info">
            <div class="info-item-priceinfo-rate">{{getDiscountRate}}</div>
            <div class="info-item-priceinfo-discountPrice">{{itemInfo.price}}
              <span class="won">원</span>
            </div>
            <div class="info-item-priceinfo-origin_price">{{itemInfo.original_price}}
              <span class="originwon">원</span>
            </div>
          </div>
        </div>
      </div>
      <div class="info-title">상품정보</div>
    </div>
      <div class="divider"></div>

      <div class="info-content" v-html="itemInfo.description"></div>

      <div class="info-review">리뷰</div>
      <div class="divider"></div>
      <ReviewList class="reviewlist" :reviews="itemInfo.reviews"/>

    <!-- 구매버튼 -->
    <div class="bottom-botton">
        <button class="buy-botton">{{itemInfo.price}} 원 구매</button>
    </div>
  </div>
  <footer></footer>
</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Like from '@/components/LikeButton.vue';
import ReviewList from '@/components/ReviewList.vue';
import RepositoryFactory from '@/api/RepositoryFactory';

const ItemRepository = RepositoryFactory.get('items');

export default {
  name: 'ItemInfoPage',
  components: {
    Like, ReviewList,
  },
  props: {
    itemId: { type: String, default: '' },
  },
  data() {
    return {
      itemInfo: {
        seller: {},
        reviews: [{}],
      },
      isPutItemCart: false,
    };
  },
  methods: {
    ...mapGetters('cartList', ['getisPutItemCart', 'getCartList']),
    ...mapMutations('cartList', ['addToCartList', 'deleteCartList', 'changeCartListState']),
    async initBindData() {
      const itemInfos = await ItemRepository.getItem(this.itemId);
      if (itemInfos.status === 200) {
        this.itemInfo = itemInfos.data.item;
      }
    },
    getIscarted() {
      return this.getisPutItemCart();
    },
    cartButtonClick() {
      if (this.getIscarted() === true) {
        this.deleteCartList(this.itemInfo.product_no);
        // eslint-disable-next-line no-alert
        alert('장바구니에서 제거되었습니다.');
      } else {
        this.addToCartList(this.itemInfo);
        // eslint-disable-next-line no-alert
        alert('상품이 장바구니에 추가 하였습니다.');
      }
      this.changeCartListState();// this.$store.commit('cartList/changeCartListState');
    },
    addCommaToprice(price) {
      return price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
    },
    isDiscounted() {
      return Object.prototype.hasOwnProperty.call(this.itemInfo, 'original_price');
    },
    addCommaToPrice(value) {
      if (value === undefined) {
        return false;
      }
      return `${value.toLocaleString()}원`;
    },
  },
  computed: {
    getDiscountRate() {
      const rate = (
        (this.itemInfo.original_price - this.itemInfo.price)
      / this.itemInfo.original_price) * 100;
      return `${Number.prototype.toFixed.call(rate, 0)}%`;
    },
    getDiscountPrice() {
      return this.itemInfo.original_price - this.itemInfo.price;
    },
  },
  created() {
    this.initBindData();
  },
};

</script>

<style scoped>
.divider{
  margin-top:10px;
  width:100%;
  max-width: 375px;
  border-bottom: solid 1px #D2D2D2;
}
.info{
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.bottom-botton{
  width:100%;
  background-color: rgba(0, 0, 0, 0.5);
  border-top: solid 1px #D2D2D2;
  position:fixed;
  /* top:579px; */
  bottom:0;
}
.buy-botton{
  cursor: pointer;
  max-width:250px;
  width:100%;
  height:50px;
  border:none;
  border-radius: 5px;
  background-color: black;
  color:white;
}
.buy-botton:hover{
  background-color: gray;
  }
.info-main_img{
  width:100%;
  height:100%;
  max-width: 375px;
  max-height: 375px;
}
.info-seller-wrapper{
  margin-top:20px;
  max-width: 340px;
  width:100%;
}
.info-seller{
  max-width: 340px;
  display: flex;
  width:100%;
  height:100%;
  gap: 10px;
}
.info-seller-profileImg{
  border-radius: 50px;
  width:40px;
  height:40px;
}

.info-seller-subinfo-name{
  text-align: left;
  font-weight: bold;
  }
.info-seller-subinfo-tag{
  color:#847F7F;
  font-size: 12px;
  }
.cart-img{
  margin-top:17px;
  margin-left: auto;
  width:25px;
  height:25px;
}

.info-item{
  margin-top:20px;
  max-width: 340px;
  width:100%;
  height:100%;
  text-align: left;
}
.info-item-title{
  font-size: 30px;
  font-weight: bold;
}
.discount-price-info{
  max-width: 170px;
  width:100%;
  display: flex;
  margin-top:10px;
  margin-left:5px;
  justify-content: space-between;
}
.info-item-priceinfo-price{
  font-weight: bold;
}
.info-item-priceinfo-rate{
  color: red;
    font-size: 16px;
}
.info-item-priceinfo-discountPrice{
  font-weight: bold;
}
.won{
    font-size: 12px;
}
.info-item-priceinfo-origin_price{
  margin-top:4px;
  font-size: 12px;
  color: #847F7F;
  text-decoration:line-through
}
.originwon{
  font-size: 8px;
  color: #847F7F;
}

.info-title{
  font-size: 20px;
  font-weight: bold;
  margin-top:40px;
}

.info-content{
  margin-top:20px;
  max-width: 375px;
  width:100%;
}

.info-review{
  margin-top:20px;
  max-width: 340px;
  width:100%;
  display:flex;
  justify-content: left;
  font-size: 20px;
  font-weight: bold;
}

.like-button{
  position: relative;
  top:20px;
  left:160px;
  cursor: pointer;
}
footer{
  height:50px;
}
</style>
