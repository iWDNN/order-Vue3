<template>
  <div class="wrap fcc">
    <h1 class="logo-box fcc">
      <img
        src="https://raw.githubusercontent.com/iWDNN/temp/master/order.png"
        alt="" />
    </h1>
    <div class="reg-box">
      <h1 class="title fcc">
        <span>회원가입</span>
      </h1>
      <form
        class="fcc"
        @submit.prevent="submitRegForm">
        <div class="line">
          <input
            id="username"
            placeholder="아이디(영문,숫자로만 입력해주세요)"
            v-model="username"
            maxlength="15"
            minlength="3"
            type="text" />
          <input
            id="password"
            placeholder="비밀번호"
            v-model="password"
            maxlength="15"
            minlength="7"
            type="password" />
          <input
            id="name"
            placeholder="이름"
            v-model="name"
            type="text" />
          <input
            id="phoneNum"
            placeholder="전화번호( - 없이 입력해주세요)"
            maxlength="11"
            minlength="9"
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
      <Router-link
        class="home-btn fcc"
        to="/login">
        <img
          src="https://raw.githubusercontent.com/iWDNN/temp/master/back-arrow-white.png"
          alt="" />
      </Router-link>
    </div>
  </div>
</template>
<script>
export default {
  created(){
    this.$store.dispatch('login/getLogin')
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
  watch:{
    username(){
      return this.username = this.username.replace(/[^a-zA-z0-9]/g, '');
    },
    password(val){
      const reg = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
      if(reg.exec(val)!==null){
        return this.password = this.password.slice(0,-1)
      }
    },
    phoneNum(){
      return this.phoneNum = this.phoneNum.replace(/[^0-9]/g, '');
    },
  },
  computed:{
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
      this.$store.dispatch('signUp/regUser', data)
    },
    handleOnInput(e)  {
      e.value = e.value.replace(/[^A-Za-z]/ig, '')
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap{
  position:absolute;
  width:100vw;
  height:100vh;
  // 전체화면
  @media screen and (min-width: 800px){
    .logo-box{
      width:40%;
      height:100%;
      font-family: "Oswald", sans-serif;
      font-weight: 700;
      font-size:41px;
      color:lighten($m2, 70%);
      border-right:2px solid lighten($m2,20%);
      background-color:$m2;
      img{
        margin-right:1px;
        margin-bottom:-7px;
        width:300px;
        height:300px;
      }
    }
    .reg-box{
      width:60%;
      height:100%;
      display:flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color:#F0F5FB;
      .title{
        width:40%;
        height:10%;
        display:flex;
        justify-content: flex-start;
        align-items: center;
        font-size:25px;
        font-weight: 700;
        margin-left:15px;
      }
      form{
        width:40%;
        display:flex;
        flex-direction: column;
        .line{
          width:100%;
          box-sizing: border-box;
          flex-direction: column;
          input{
            width:100%;
            height:50px;
            border:none;
            box-sizing: border-box;
            padding-left:10px;
            border-bottom:1px solid $gray-200;
            &::placeholder{
              color:$gray-400;
            }
            &:first-child{
              border-top-left-radius: 10px;
              border-top-right-radius: 10px;
            }
            &:last-child{
              border-bottom-left-radius: 10px;
              border-bottom-right-radius: 10px;
            }
          }
        }
        .reg-btn{
          width:100%;
        }
      }
      .home-btn{
        width:50px;
        height:30px;
        border-radius:20px;
        background-color:lighten($m2, 20%);
        opacity: 0.6;
        transition:.2s;
        margin-top:30px;
        img{
          width:20px;
          height:20px;
        }
        &:hover{
          background-color:$m2;
        }
      }
    }
  }
  // 모바일
  @media screen and (max-width: 800px){
    .logo-box{
      display: none;
    }
    .reg-box{
      width:300px;
      height:400px;
      background-color:$m1;
      border:1px solid $m1;
      flex-direction: column;
      display:flex;
      align-items: center;
      border-radius:15px;
      position:relative;
      .title{
        width:90%;
        display:flex;
        margin-top:44px;
        margin-bottom:30px;
        flex-shrink: 0;
        span{
          color:lighten($m2, 20%);
          font-size:20px;
          font-weight:700;
          margin:0;
          padding:0;
        }
      }
      form{
        width:75%;
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
            border-bottom:2px solid $gray-200;
            &::placeholder{
              color:$gray-400;
            }
          }
        }
        .reg-btn{
          display:block;
          margin-top:30px;
          width:60%;
          &:hover{
            background-color:$m1;
          }
        }
      }
      .home-btn{
        position:absolute;
        bottom:-50px;
        width:50px;
        height:30px;
        border-radius:20px;
        background-color:lighten($m2, 20%);
        opacity: 0.6;
        transition:.2s;
        img{
          width:20px;
          height:20px;
        }
        &:hover{
          background-color:$m2;
        }
      }
    }
  }
}
</style>