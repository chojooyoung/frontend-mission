<template>
  <div id="item-list-page">
    <Header class="item-list-header" :pageName="headerText"/>
    </div>
</template>

<script>
import ItemList from '@/data/itemList';
import Header from '@/components/ItemList/Header.vue';

export default {
  name: 'ItemListPage',
  components: {
    Header,
  },
  data() {
    return {
      itemLists: '',
      headerText: '',
    };
  },
  methods: {
    initBindData() {
      this.itemLists = ItemList;
      this.headerText = ItemList.pageInfo.pageName;
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
#item-list-page{
  height: 1000px;
}
</style>
