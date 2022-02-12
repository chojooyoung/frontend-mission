<template>
  <div class="item-list-item">
    <div v-if="isNotFound()">장바구니에 상품이 없습니다.</div>
    <div v-else>
        <router-link data-test="router-iteminfo" :to="`/item/${this.id}`">
            <div class="item" >
                <img class="item-img"
                :src="itemInfo.image"/>
                <LikeButton class="like-button" :isLike="itemInfo.isLiked"/>
                <div class="item-price_info" data-test="cartList-data">
                    <div class="item-price_rate" v-if="isDiscounted()">{{getDiscountRate}}</div>
                    <div class="item-price">{{ addCommaToPrice(itemInfo.price)  }}</div>
                    <div class="item-origin_price" v-if="isDiscounted()">
                        {{addCommaToPrice(itemInfo.original_price)}}
                    </div>
                </div>
                <div class="item-text_info">
                    <div class="item-title" data-test="cartList-data">{{itemInfo.name}}</div>
                </div>
            </div>
        </router-link>
        <button class="delete"
        data-test="cartList-delete"
        @click="deleteButtonClick()">삭제하기</button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import LikeButton from '@/components/LikeButton.vue';

export default {
  name: 'CartItem',
  components: {
    LikeButton,
  },
  props: {
    item: { type: Object },
    key: String,
    id: { type: String, default: '' },
  },
  data() {
    return {
      itemInfo: this.item,
    };
  },
  methods: {
    ...mapMutations('cartList', ['deleteCartList', 'changeCartListState']),

    isNotFound() {
      if (this.itemInfo === undefined) {
        console.log(this.itemInfo);
        return true;
      }
      return this.itemInfo.length === 0;
    },
    deleteButtonClick() {
      this.deleteCartList(this.itemInfo.product_no);
      this.itemInfo = '';
      this.changeCartListState();
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
  },
};
</script>

<style>
.item{
  position: relative;
  cursor: pointer;
  width:140px;
  height:190px;
}

.item:hover{
  opacity: .7;
}

.item-img{
  border: solid 1px #847F7F;
  max-width:120px;
  max-height: 120px;
  width:100%;
  height:100%;
  border-radius: 10px;
}
.like-button{
  top:10px;
  left:105px;
  position: absolute;
}
.item-price_info{
  display: flex;
  justify-content: center;
  gap:5px;
}
.item-price_rate{
  color: red;
  font-size: 12px;
  margin-top: 7px;
}
.item-price{
  font-weight:bold;
  font-size: 14px;
  margin-top: 3px;
}
.item-origin_price{
  font-size: 10px;
  margin-top: 7px;
  color: #847F7F;
  text-decoration:line-through
}
.item-text_info{
  display: flex;
  justify-content: left;
  flex-direction: column;
}
.item-title{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: bold;
}
.item-content{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  color: #847F7F;
}
</style>
