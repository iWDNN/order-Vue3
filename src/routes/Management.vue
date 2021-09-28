<template>
  <div class="wrap">
    <Nav />
    <Router-view />
  </div>
</template>

<script>
import Nav from '~/components/Nav'
import { mapState } from 'vuex'
export default {
  components:{
    Nav
  },
  computed:{
    ...mapState('status',[
      'collapsed',
      'navWidth'
    ])
  },
  
}
</script>

<style lang="scss" scoped>
.nav-blank{
  width:50px;
  height:100%;
  flex-shrink: 0;
}
</style>