<template>
<div id='item-info-page'>
  <div class="info">
    <img class="info-main_img" :src="`${itemInfo[0].mainImageUrl}`" alt="itemImg"/>
    <div class="info-seller-wrapper">
      <!-- 판매자 정보 -->
      <div class="info-seller">
        <div v-if="itemInfo[0].author.profileImageUrl === 'null'">
          <img src="../assets/basicUserAvatar.svg" alt="deafaultUserImg"/>
        </div>
        <div v-else>
          <img class="info-seller-profileImg"
               :src="`${itemInfo[0].author.profileImageUrl}`"
               alt="sellerProfileImg"
          />
        </div>
        <div class="info-seller-subinfo">
          <div class="info-seller-subinfo-name">{{itemInfo[0].author.nickname}}</div>
          <div class="info-seller-subinfo-tag">{{itemInfo[0].author.tag}}</div>
        </div>
        <Like class="like-button" :isLike="itemInfo[0].isLiked" />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import itemInfo from '@/data/itemInfo';
import Like from '@/components/Like.vue';

export default {
  name: 'ItemInfoPage',
  components: {
    Like,
  },
  data() {
    return {
      itemInfo,
    };
  },
  methods: {

  },
  computed: {

  },
};

</script>

<style scoped>
.info{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.info-main_img{
  width:100%;
  height:100%;
  max-width: 375px;
  max-height: 375px;

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
.like-button{
  margin-left: auto;
}
</style>
