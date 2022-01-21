<template>
  <div class="header-wrapper">
      <div :class="{
        header_visible: isShow(),
       header_unvisible: !isShow()}"
       >{{headerName}}
       </div>
  </div>
</template>

<script>
export default {
  name: 'ItemListItem',
  props: {
    pageName: String,
  },
  data() {
    return {
      headerName: this.pageName,
      scrollHeight: 0,
    };
  },
  methods: {
    isShow() {
      if (this.scrollHeight === 0) {
        return true;
      }
      return false;
    },
    updateScrollHeight() {
      this.scrollHeight = window.scrollY;
    },
  },
  mounted() {
    window.addEventListener('scroll', this.updateScrollHeight);
  },
};
</script>

<style>
.header-wrapper{
  align-content: center;
  align-items: center;
  position: relative;
  display: flex;
  justify-content: center;
}
.header_visible {
    animation: fade-in 1s;
    animation-fill-mode: forwards;
    font-size: 24px;
    position: fixed;
    width: 100%;
    max-width:358px;
    top: 0;
}

.header_unvisible {
    animation: fade-out 1s;
    animation-fill-mode: forwards;
    font-size: 24px;
    position: fixed;
    width: 100%;
    max-width:358px;
    top: 0;

}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-out {
  from {
    opacity: 1;

  }
  to {
    opacity: 0;
  }
}
</style>
