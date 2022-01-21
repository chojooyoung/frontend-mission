<template>
<div class="navigation-wrapper">
    <div class="navgation-bar" v-for="navItem in navigationData" :key="navItem.id">
        <img class="navigation-bar_icon" :src="navItem.navImg"/>
        {{navItem.navText}}
    </div>
</div>
</template>

<script>
import reviewList from '@/data/navigation';

export default {
  name: 'ItemListPage',
  data() {
    return {
      navigationData: [],
    };
  },
  methods: {
    initBindData() {
      this.navigationData = reviewList;
    },
  },
  created() {
    this.initBindData();
  },
};
</script>

<style scoped>
</style>
