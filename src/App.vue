<template>
  <Router-view />
</template>

<script>
export default {
  created(){
    this.$store.dispatch('login/getLogin')
  }
}
</script>