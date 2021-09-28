<template>
  <Router-view />
</template>

<script>
export default {
  created(){
    this.$store.dispatch('login/getMemberInfo')
  }
}
</script>