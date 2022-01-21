<template>
  <div id="item-list-page">
    <Header class="item-list-header" :pageName="headerText"/>
    <div class="item-wrapper">
      <Item  class="item-list" v-for="item in items" :item="item" :key="item.id"/>
    </div>
    </div>
</template>

<script>
import ItemList from '@/data/itemList';
import Header from '@/components/ItemList/Header.vue';
import Item from '@/components/ItemList/Item.vue';

export default {
  name: 'ItemListPage',
  components: {
    Header, Item,
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
  computed: {
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
}
</style>
