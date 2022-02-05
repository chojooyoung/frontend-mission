<template>
  <div class="review-wrapper" v-for="review in reviewListData" :key="review.id">
    <div class="review-list">
      <div class="review-list-review">
        <div class="review-list-reviewer" >
          <div class="reviewer-nickname">
            {{review.writer}}
          </div>
          <div class="reviewer-time">{{this.timeForToday(review.created)}}</div>
        </div>
        <div class="review-title">{{review.title}}</div>
        <div class="review-content">{{review.content}}</div>
      </div>
      <img :src="review.img" class="review-list-review_img"
            style="width:100%;
            height:100%;
            max-width: 64px;
            max-height: 64px;"
      />
    </div>
    <div class="divider"></div>
  </div>
</template>

<script>
import reviewList from '@/data/review';

export default {
  name: 'ReviewList',
  props: {
    reviews: Array,
  },
  data() {
    return {
      reviewListData: '',
    };
  },

  methods: {
    initBindData() {
      setTimeout(() => {
        this.reviewListData = this.reviews;
      }, 1000);
    },
    timeForToday(value) {
      const today = new Date();
      const timeValue = new Date(value);

      const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
      if (betweenTime < 1) return '방금전';
      if (betweenTime < 60) {
        return `${betweenTime}분전`;
      }

      const betweenTimeHour = Math.floor(betweenTime / 60);
      if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간전`;
      }

      const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
      if (betweenTimeDay < 365) {
        return `${betweenTimeDay}일전`;
      }

      return `${Math.floor(betweenTimeDay / 365)}년전`;
    },
  },
  created() {
    this.initBindData();
  },
};
</script>

<style  scoped>
.divider{
  margin-top:10px;
  width:100%;
  max-width: 375px;
  border-bottom: solid 1px #D2D2D2;
}
.review-list{
  cursor: pointer;
  margin-top:20px;
  display: flex;
  width:100%;
  max-width: 340px;
  justify-content: space-between;
}
.review-list-review{
  display: flex;
  flex-direction: column;
  text-align: left;
  max-width: 276px;
  width:270px;

}
.review-list-reviewer{
  display: flex;
  max-width: 100px;
  width:100%;
  gap:20px
}
.reviewer-nickname{
  font-size: 12px;
}
.reviewer-time{
  color:#847F7F;
  font-size: 12px;
}
.review-title{
  max-width: 240px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.review-content{
  color:#847F7F;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
