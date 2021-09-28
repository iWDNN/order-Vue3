<template>
  <div class="wrap fcc">
    <div class="reg-box fa">
      <h1 class="title">
        <span>회원가입</span>
        <Router-link
          class="home-btn fcc"
          to="/login">
          <img
            src="https://raw.githubusercontent.com/iWDNN/temp/master/back-arrow-white.png"
            alt="" />
        </Router-link>
      </h1>
      <form
        class="fcc"
        @submit.prevent="submitRegForm">
        <div class="line">
          <input
            id="username"
            placeholder="아이디"
            v-model="username"
            type="text" />
          <input
            id="password"
            placeholder="비밀번호"
            v-model="password"
            type="password" />
          <input
            id="name"
            placeholder="이름"
            v-model="name"
            type="text" />
          <input
            id="phoneNum"
            placeholder="전화번호"
            v-model="phoneNum"
            type="text" />
          <input
            id="address"
            placeholder="주소"
            v-model="address"
            type="text" />
        </div>
        <button
          class="reg-btn"
          type="submit">
          회원가입
        </button>
      </form>
    </div>
  </div>
  <div class="wrap-background"></div>
</template>
<script>
export default {
  created(){
    this.$store.dispatch('login/getMemberInfo')
  },
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
    submitRegForm(){
      const data = {
        username:this.username,
        password:this.password,
        name:this.name,
        phoneNum:this.phoneNum,
        address:this.address,
      }
      console.log(data)
      this.$store.dispatch('register/regUser', data)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap-background{
  position:absolute;
  z-index:1;
  width:100vw;
  height:100vh;
  filter:grayscale(0.5) opacity(0.9);
  background-image:url('https://images.unsplash.com/photo-1588675646184-f5b0b0b0b2de?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80');
  background-position: center;
  background-size:cover;
}
.wrap{
  position:absolute;
  width:100vw;
  height:100vh;
  .reg-box{
    width:300px;
    height:400px;
    background-color:$m1;
    border:1px solid $m1;
    flex-direction: column;
    border-radius:15px;
    .title{
      width:90%;
      display:flex;
      justify-content: space-between;
      margin-top:50px;
      margin-bottom:20px;
      padding-left:10px;
      flex-shrink: 0;
      span{
        color:$m5;
        font-size:20px;
        font-weight:700;
        margin:0;
        padding:0;
      }
      .home-btn{
        width:25px;
        height:25px;
        img{
          width:100%;
          height:100%;
          padding-bottom:5px;
          padding-right:5px;
        }
      }
    }
    form{
      width:90%;
      flex-direction: column;
      .line{
        width:100%;
        display:flex;
        flex-direction: column;
        border-radius: 5px;
        overflow: hidden;
        input{
          width:100%;
          height:37px;
          padding-left:10px;
          outline:none;
          border:none;
          border-bottom:2px solid $gray-400;
        }
      }
      .reg-btn{
        display:block;
        margin-top:20px;
        width:90%;
        height:42px;
        border:1px solid $m2;
        border-radius: 15px;
        font-size:13px;
        font-weight: 700;
        background-color:$m2;
        transition:.2s;
        color:$m5;
        opacity: 0.6;
        &:hover{
          background-color:$m1;
          color:$m5;
          border:1px solid $m5;
        }
      }
    }
  }

}
</style>