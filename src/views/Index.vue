<script>
  import MHeader from '@/common/MHeader.vue'
  export default {
    components: {
      MHeader
    }
  }
</script>

<template>
  <div>
    <m-header></m-header>
    <router-view />
  </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../assets/style/mixin";

.main {
  min-height: calc(100vh - 454px);
  background: #ededed;
  overflow: hidden;
  width: 100%;
}

.bn {
  border-style: none;
  border-width: 0;
  border: none;
}

.move_img {
  position: fixed;
  @include wh(40px);
  width: 45px;
  z-index: 29;
  height: 45px;
  div {
    @extend .bn;
  }
  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    display: block;
    @extend .bn;
  }
}
</style>