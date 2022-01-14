<template>
    <div></div>
</template>

<script>
import reviewList from '@/data/review';

export default {
  name: 'reviewList',
  props: {
    postId: String,
  },
  data() {
    return {
      reviewListData: [{}],
    };
  },

  methods: {
    initBindData() {
      this.reviewListData = reviewList;
    },
  },
  created() {
    this.initBindData();
  },
};
</script>

<style scoped>

</style>
