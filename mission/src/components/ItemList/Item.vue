<template>
  <div class="item-list-item">
    <div v-if="isNotFound()">상품검색 결과가 없습니다.</div>
    <div v-else>
      <div class=item>
      <img class="item-img" :src="itemInfo.mainImageUrl"/>
      <div class="item-price_info">
        <div class="item-price_rate" v-if="isDiscounted()">{{getDiscountRate}}</div>
        <div class="item-price">{{ addCommaToPrice(itemInfo.price)  }}</div>
        <div class="item-origin_price" v-if="isDiscounted()">
        {{addCommaToPrice(itemInfo.original_price)}}
        </div>
      </div>
      <div class="item-text_info">
        <div class="item-title">{{itemInfo.title}}</div>
        <div class="item-content">{{itemInfo.content}}</div>
      </div>
    </div>
</div>
  </div>
</template>

<script>
export default {
  name: 'ItemListItem',
  props: {
    item: {},
    key: String,
  },
  data() {
    return {
      itemInfo: this.item,
    };
  },
  methods: {
    isNotFound() {
      if (this.itemInfo === undefined) {
        return true;
      }
      return this.itemInfo.length === 0;
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
