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

<style scoped>

</style>