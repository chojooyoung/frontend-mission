<template>
      <div className ="userLikePost" v-if="this.isLiked=== true">
        <img  src="../assets/like.svg" alt="" @click="likeButtonClick"/>
      </div>
      <div className ="userDislikePost" v-else>
        <img  src="../assets/cancelLike.svg" alt="" @click="likeButtonClick"/>
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
