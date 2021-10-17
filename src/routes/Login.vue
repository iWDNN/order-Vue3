<template>
  <div class="wrap fcc">
    <div class="login-box fcc">
      <h1 class="title fcc">
        <span>ORDER</span>
        <img
          src="https://raw.githubusercontent.com/iWDNN/temp/master/order.png"
          alt="" />
      </h1>
      <form @submit.prevent="submitForm">
        <div class="form-title">
          <span>로그인</span>
        </div>
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
        <Router-link
          class="sign-up-btn"
          to="/sign_up">
          회원가입
        </Router-link>
      </form>
    </div>
  </div>
  <div class="wrap-background"></div>
</template>

<script>
export default {
  watch:{
    // username(val){
    //   const reg = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    //   if(reg.exec(val)!==null){
    //     return this.username = this.username.slice(0,-1)
    //   }
    // },
    username(){
      return this.username = this.username.replace(/[^a-zA-z0-9]/g, '');
    },
    password(val){
      const reg = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
      if(reg.exec(val)!==null){
        return this.password = this.password.slice(0,-1)
      }
    },
  },
  data(){
    return{
      username:'',
      password:'',
      animation:false
    }
  },
  methods:{
    submitForm(){
      const data = {
        username:this.username,
        password:this.password
      }
      console.log(data)
      this.$store.dispatch('login/login',data).then(this.Loading())
    },
    Loading(){
      this.$store.commit('login/updateLoading',true)
      setTimeout(()=>{
        this.$store.commit('login/updateLoading',false)
      },2200)
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
  // 전체화면
  @media screen and (min-width: 800px){
  .login-box{
    width:100%;
    height:100%;
    overflow:hidden;
    background-color:$m2;
    .title{
      width:40%;
      height:100%;
      margin-bottom:-6px;
      border-right:2px solid lighten($m2,20%);
      flex-direction: column;
      position:relative;
      span{
        display:none;
      }
      img{
        width:300px;
        height:300px;
      }
      // span{
      //   position:absolute;
      //   display: block;
      //   bottom:242px;
      //   background-color:$m2;
      //   font-family: 'Raleway', sans-serif;
      //   font-size:23px;
      //   letter-spacing: 16px;
      //   font-weight:700;
      //   color:lighten($m2, 70%);
      // }
    }
    form{
      width:60%;
      height:100%;
      display:flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border-left:2px solid lighten($m2,40%);
      background-color:#F0F5FB;
      .form-title{
        width:40%;
        height:10%;
        display:flex;
        justify-content: flex-start;
        align-items: center;
        font-size:25px;
        font-weight: 700;
        margin-left:15px;
      }
      .line{
        width:40%;
        display:flex;
        flex-direction: column;
        margin:20px 0;
        label{
          background-color:$m1;
          margin-bottom:5px;
          margin-left:5px;   
          font-size:14px;
          font-weight: 700;
          color:$gray-600;
        }
        input{
          width:100%;
          height:45px;
          border:none;
          box-sizing: border-box;
          border-radius: 15px;
          padding-left:10px;
          outline:none;
          &::placeholder{
            color:$gray-400;
          }
        }
      }
      .login-btn{
        display:block;
        margin-top:20px;
        width:40%;
        height:47px;
        border:1px solid lighten($m2, 20%);;
        border-radius: 15px;
        font-size:15px;
        font-weight: 700;
        background-color:lighten($m2, 20%);
        transition:.2s;
        color:$m5;
        opacity: 0.6;
        box-sizing: border-box;
        &:hover{
          background-color:$m1;
          color:$m2;
          border:1px solid $m2;
        }
      }
      .sign-up-btn{
        font-size:13px;
        color:lighten($m2, 20%);
        text-decoration: none;
        margin-top:40px;
        margin-bottom:15px;
        &:hover{
          color:$m4;
        }
      }
    }
  }
  }


  //모바일
  @media screen and (max-width: 800px){
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
      background-color:$m1;
      color:lighten($m2, 20%);
      // color:$m6;
      img{
        display:none;
      }
    }
    form{
      width:60%;
      height:80%;
      display:flex;
      align-items: center;
      flex-direction: column;
      background-color:$m1;
      color:$m1;
      .form-title{
        display:none;
      }
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
          position:relative;
        }
        input{
          height:47px;
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
          background-color:$m1;
          color:$m2;
          border:1px solid $m2;
        }
      }
    }
    .sign-up-btn{
      font-size:13px;
      color:lighten($m2, 20%);
      text-decoration: none;
      margin-top:32px;
      margin-bottom:15px;
      &:hover{
        color:$m4;
      }
    }
  }
  }
}
</style>