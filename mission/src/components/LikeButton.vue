<template>
      <div class ="userLikePost" v-if="isLiked=== true">
        <img  src="../assets/like_likeButton.svg" alt="" @click="likeButtonClick"/>
      </div>
      <div class ="userDislikePost" v-else>
        <img  src="../assets/unlike_likeButton.svg" alt="" @click="likeButtonClick"/>
      </div>

</template>

<script>
export default {
  name: 'like',
  props: {
    isLike: Boolean,
  },
  data() {
    return {
      isLiked: this.isLike,
    };
  },

  methods: {
    likeButtonClick() {
      this.isLiked = !this.isLiked;
    },
  },
};
</script>

<style scoped>

</style>
