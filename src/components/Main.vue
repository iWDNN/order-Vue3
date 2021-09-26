<template>
  <div class="container">
    <header class="header">
      <button @click="logout">
        로그아웃
      </button>
    </header>
    <section class="section"></section>
  </div>
</template>

<script>
export default {
  methods:{
    logout(){
      this.$store.dispatch('login/logOut')
    }
  }
}
</script>