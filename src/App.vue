<template>
  <div id="app">
    <router-view class="main" />
  </div>
</template>

<script>

</script>

<style lang="scss">
  @import 'assets/style/index.scss';

  #app {
    height: 100%;
  }

  .main {
    background-color: #ededed;
    overflow: hidden;
    width: 100%;
  }
</style>
