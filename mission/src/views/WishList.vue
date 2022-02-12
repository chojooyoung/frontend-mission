<template>
  <div id="item-list-page">
    <Header class="item-list-header" :pageName="headerText"/>
    <div class="item-wrapper">
      <Item  class="item-list"
      v-for="item in itemLists"
      :item="item"
      :key="item.product_no"
      :id="item.product_no"/>
    </div>
    <div class="nav-wrapper">
      <Navgation />
    </div>
    <footer></footer>
  </div>
</template>

<script>
import RepositoryFactory from '@/api/RepositoryFactory';
import Header from '@/components/ItemList/Header.vue';
import Item from '@/components/ItemList/Item.vue';
import Navgation from '@/components/ItemList/Navigation.vue';

const WishRepository = RepositoryFactory.get('wish');

export default {
  name: 'ItemListPage',
  components: {
    Header, Item, Navgation,
  },
  data() {
    return {
      itemLists: '',
      headerText: 'My Shopping Mall-WishList',
    };
  },
  methods: {
    async initBindData() {
      const wishListData = await WishRepository.get();
      if (wishListData.status === 200) {
        this.itemLists = wishListData.data.items;
      }
    },

  },

  created() {
    this.initBindData();
  },
};
</script>

<style>
.item-list-page{
  max-width: 375px;
  width:100%;
}
.item-list-header{
  text-align: center;
}
.item-wrapper{
  margin-top: 40px;
}
.item-wrapper{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap:20px
}
.nav-wrapper{
  margin-left: calc(-50vw + 50%);
  position: relative;
}
footer{
  height:100px;
}
</style>
