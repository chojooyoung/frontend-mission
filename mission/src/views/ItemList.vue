<template>
  <div id="item-list-page">
    <Header class="item-list-header" :pageName="headerText"/>
    <div class="item-wrapper">
      <Item  class="item-list"
      v-for="item in itemLists"
      :item="item"
      :key="item.id"/>
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

const ItemRepository = RepositoryFactory.get('items');

export default {
  name: 'ItemListPage',
  components: {
    Header, Item, Navgation,
  },
  data() {
    return {
      itemLists: '',
      headerText: 'My Shopping Mall',
    };
  },
  methods: {
    async initBindData() {
      const itemListData = await ItemRepository.get();
      if (itemListData.status === 200) {
        console.log(itemListData);
        this.itemLists = itemListData.data.items;
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
