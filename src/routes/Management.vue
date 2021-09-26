<template>
  <div class="wrap">
    <Nav />
    <div class="nav-blank"></div>
    <Router-view />
  </div>
</template>

<script>
import Nav from '~/components/Nav'
export default {
  components:{
    Nav
  }
}
</script>

<style lang="scss" scoped>
.nav-blank{
  width:50px;
  height:100%;
  flex-shrink: 0;
}
</style>