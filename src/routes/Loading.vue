<template>
  <div class="loading-animation fcc">
    <div class="ani-wrap fcc">
      <div class="title">
        ORDER
      </div>
      <div class="bar">
        <div class="background-bar"></div>
        <div class="loading-bar"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created(){
    setTimeout(this.toMain,1800)
  },
  methods:{
    toMain(){
      this.$router.push('/manage/main')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>