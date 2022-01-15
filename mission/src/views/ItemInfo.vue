<template>
<div id='item-info-page'>
  <div class="info">
    <img class="info-main_img" :src="`${this.mainImageUrl}`" alt="itemImg"
    style="width:100%;
          height:100%;
          max-width: 375px;
          max-height: 375px;"
    />
    <div class="info-seller-wrapper">
      <!-- 판매자 정보 -->
      <div class="info-seller">
        <div v-if="this.author.profileImageUrl === 'null'">
          <img class="info-seller-defaultImg"
              src="../assets/basicUserAvatar.svg"
              alt="deafaultUserImg"/>
        </div>
        <div v-else>
          <img class="info-seller-profileImg"
               :src="`${this.author.profileImageUrl}`"
               alt="sellerProfileImg"
          />
        </div>
        <div class="info-seller-subinfo">
          <div class="info-seller-subinfo-name">{{this.author.nickname}}</div>
          <div class="info-seller-subinfo-tag">{{this.author.tag}}</div>
        </div>
        <Like class="like-button" :isLike="this.isLiked" />
      </div>
    </div>
    <div class="divider"></div>
      <!-- 상품 정보 -->
    <div class="info-item">
      <div class="info-item-title">{{this.title}}</div>
      <div class="info-item-priceinfo">
        <div v-if="this.isDiscount===false">
          <div class="info-item-priceinfo-price">{{this.price}}</div>
        </div>
        <div v-else>
          <div class="discount-price-info">
            <div class="info-item-priceinfo-rate">{{this.discountRate}}%</div>
            <div class="info-item-priceinfo-discountPrice">{{this.discountPrice}}
              <span class="won">원</span>
            </div>
            <div class="info-item-priceinfo-origin_price">{{this.price}}
              <span class="originwon">원</span>
            </div>
          </div>
        </div>
      </div>
      <div class="info-title">상품정보</div>
    </div>
      <div class="divider"></div>

      <div class="info-content" v-html="this.content"></div>

      <div class="info-review">리뷰</div>
      <div class="divider"></div>
      <ReviewList class="reviewlist" :postId="this.id"/>

    <!-- 구매버튼 -->
    <div class="bottom-botton">
      <div v-if="itemInfo[0].isDiscount===false">
        <button class="buy-botton">{{itemInfo[0].price}} 원 구매</button>
      </div>
      <div v-else>
        <button class="buy-botton">{{itemInfo[0].discountPrice}} 원 구매</button>
      </div>
    </div>
  </div>
  <footer></footer>
</div>
</template>

<script>
import itemInfo from '@/data/itemInfo';
import Like from '@/components/LikeButton.vue';
import ReviewList from '@/components/ReviewList.vue';

export default {
  name: 'ItemInfoPage',
  components: {
    Like, ReviewList,
  },
  data() {
    return {
      itemInfo,
      id: '',
      author: {},
      mainImageUrl: '',
      title: '',
      content: '',
      contentImageUrl: '',
      price: 0,
      createdDate: '',
      modifiedDate: '',
      likeCount: 0,
      viewCount: 0,
      isLiked: '',
      isDiscount: '',
      discountRate: 0,
      discountPrice: 0,
      priceToBuy: 0,
    };
  },
  methods: {
    initBindData() {
      this.id = itemInfo[0].id;
      this.author = itemInfo[0].author;
      this.mainImageUrl = itemInfo[0].mainImageUrl;
      this.author = itemInfo[0].author;
      this.isLiked = itemInfo[0].isLiked;
      this.title = itemInfo[0].title;
      this.price = itemInfo[0].price;
      this.discountRate = itemInfo[0].discountRate;
      this.discountPrice = itemInfo[0].discountPrice;
      this.content = itemInfo[0].content;
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
.info-seller-wrapper{
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
  margin-left: auto;
  cursor: pointer;
}
footer{
  height:50px;
}
</style>
