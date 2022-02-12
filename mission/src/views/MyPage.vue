<template>
    <Header :pageName="headerText"/>
    <Navgation />
</template>

<script>
import Header from '@/components/ItemList/Header.vue';
import Navgation from '@/components/ItemList/Navigation.vue';

export default {
  name: 'MyPage',
  components: {
    Header, Navgation,
  },
  data() {
    return {
      headerText: 'My Shopping Mall-MyPage',
    };
  },
};
</script>
