<template>
  <div id="item-list-page">
    <Header class="item-list-header" :pageName="headerText"/>
    <div class="item-wrapper">
      <Item  class="item-list" v-for="item in items" :item="item" :key="item.id"/>
    </div>
    <div class="nav-wrapper">
      <Navgation />
    </div>
    <footer></footer>
  </div>
</template>

<script>
import ItemList from '@/data/itemList';
import Header from '@/components/ItemList/Header.vue';
import Item from '@/components/ItemList/Item.vue';
import Navgation from '@/components/ItemList/Navigation.vue';

export default {
  name: 'ItemListPage',
  components: {
    Header, Item, Navgation,
  },
  data() {
    return {
      itemLists: '',
      headerText: '',
      items: [],
    };
  },
  methods: {
    initBindData() {
      this.itemLists = ItemList;
      this.headerText = ItemList.pageInfo.pageName;
      this.items = ItemList.items;
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
