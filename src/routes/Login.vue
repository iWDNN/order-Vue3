<template>
  <div class="wrap fcc">
    <div class="login-box fcc">
      <h1 class="title fcc">
        ORDER
      </h1>
      <form @submit.prevent="submitForm">
        <div class="line">
          <label for="username">아이디</label>
          <input
            placeholder="아이디"
            v-model="username"
            id="username"
            type="text" />
        </div>
        <div class="line">
          <label for="password">비밀번호</label>
          <input
            placeholder="비밀번호"
            v-model="password"
            id="password"
            type="password" />
        </div>
        <button
          class="login-btn">
          로그인
        </button>
      </form>
      <Router-link
        class="sign-up-btn"
        to="/sign_up">
        회원가입
      </Router-link>
    </div>
  </div>
  <div class="wrap-background"></div>
</template>

<script>
export default {
  data(){
    return{
      username:'',
      password:''
    }
  },
  // creadted(){
  //   this.$store.dispatch('login/getMemberInfo')
  // },
  methods:{
    submitForm(){
      const data = {
        username:this.username,
        password:this.password
      }
      console.log(data)
      this.$store.dispatch('login/login',data)
    },
    test2(){
      const isLogin = this.$store.getters['login/getisLogin']
      console.log(isLogin)
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
  background-color:$m6;
  // filter:grayscale(0.5) opacity(0.9);
  // background-image:url('https://images.unsplash.com/photo-1588675646184-f5b0b0b0b2de?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80');
  // background-position: center;
  // background-size:cover;
}
.wrap{
  position:absolute;
  width:100vw;
  height:100vh;
  .login-box{
    width:300px;
    height:400px;
    background-color:$m1;
    border:1px solid $m1;
    flex-direction: column;
    border-radius:15px;
    .title{
      height:25%;
      font-family: "Oswald", sans-serif;
      font-weight: 700;
      font-size:41px;
      color:lighten($m2, 20%);
    }
    form{
      width:60%;
      height:70%;
      display:flex;
      align-items: center;
      flex-direction: column;
      color:$m1;
      .line{
        display:flex;
        flex-direction: column;
        align-items: center;
        margin:10px 0;
        box-sizing: border-box;
        width:100%;
        color:lighten($m2, 20%);
        label{
          font-size:12px;
          margin-bottom:5px;        
        }
        input{
          font-size:13px;
          display: block;
          width:100%;
          height:35px;
          padding:5px 10px;
          outline:none;
          border: 1px solid $m1;
          border-radius: 15px;
          transition:.4s;
          &::placeholder{
            color:$gray-400;
          }
          &:hover{
            text-align:center;
            width:260px;
          }
          &:hover::placeholder{
            color:$m5;
          }
          &:focus{
            text-align:center;
            width:260px;
          }
        }
      }
      .login-btn{
        display:block;
        margin-top:20px;
        width:90%;
        height:42px;
        border:1px solid lighten($m2, 20%);;
        border-radius: 15px;
        font-size:13px;
        font-weight: 700;
        background-color:lighten($m2, 20%);
        transition:.2s;
        color:$m5;
        opacity: 0.6;
        &:hover{
          background-color:$m5;
          color:$m2;
          border:1px solid $m2;
        }
      }
    }
    .sign-up-btn{
      font-size:13px;
      color:lighten($m2, 20%);
      text-decoration: none;
      margin-bottom:15px;
    }
  }
}
</style>