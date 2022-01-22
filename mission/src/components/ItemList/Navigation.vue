<template>
<div class="navigation-wrapper">
    <div class="navgation-bar" v-for="navItem in navigationData" :key="navItem.id">
        <img class="navigation-bar_icon" :src="navItem.navImg"/>
        <div class="navgation-bar_name">{{navItem.navText}}</div>
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
.navigation-wrapper{
    position: fixed;
    padding: 0px;
    bottom:0;
    border-top: solid 1px gray;
    width:100%;
    height:100%;
    max-height: 50px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;

}
.navgation-bar{
    /* margin-top: 10px; */
    max-width: 100px;
    max-height: 40px;
    width:100%;
    height: 100%;
}
.navgation-bar:hover{
    margin:0px;
    background-color: gray;
}
.navgation-bar_name{
    font-size: 12px;
}
</style>
