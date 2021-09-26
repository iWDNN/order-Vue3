<template>
  <div class="wrap fcc">
    <div class="login-box fcc">
      <h1 class="title fcc"></h1>
      <form @submit.prevent="submitForm">
        <div class="line">
          <label for="username">아이디</label>
          <input
            id="username"
            v-model="username"
            type="text" />
        </div>
        <div class="line">
          <label for="password">비밀번호</label>
          <input
            id="password"
            v-model="password"
            type="password" />
        </div>
        <div class="line">
          <label for="name">이름</label>
          <input
            id="name"
            v-model="name"
            type="text" />
        </div>
        <div class="line">
          <label for="phoneNum">전화번호</label>
          <input
            id="phoneNum"
            v-model="phoneNum"
            type="text" />
        </div>
        <div class="line">
          <label for="address">주소</label>
          <input
            id="address"
            v-model="address"
            type="text" />
        </div>
        <button type="submit">
          회원가입
        </button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      username:'',
      password:'',
      name:'',
      phoneNum:'',
      address:''
    }
  },
  methods:{
    submitForm(){
      const data = {
        username:this.username,
        password:this.password,
        name:this.name,
        phoneNum:this.phoneNum,
        address:this.address,
      }
      this.$store.dispatch('register/regUser',data)
    }
  }
}
</script>