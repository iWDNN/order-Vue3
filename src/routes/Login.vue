<template>
  <div class="wrap fcc">
    <div class="login-box fcc">
      <h1 class="title fcc">
        <span>T</span>EST
      </h1>
      <form>
        <div class="line">
          <label for="email">아이디</label>
          <input
            v-model="email"
            id="email"
            type="email" />
        </div>
        <div class="line">
          <label for="password">비밀번호</label>
          <input
            v-model="password"
            id="password"
            type="password" />
        </div>
        <button
          class="login-btn"
          @click="submitForm">
          로그인
        </button>
        <button @click="test2">
          test2
        </button>
      </form>
      <Router-link to="/sign_up">
        회원가입
      </Router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      email:'',
      password:''
    }
  },
  created(){
    this.$store.dispatch('login/getMemberInfo')
  },
  methods:{
    submitForm(){
      const data = {
        email:this.email,
        password:this.password
      }
      console.log(data)
      this.$store.dispatch('login/login',data)
    },
    // test2(){
    //   const data = {
    //     username:'test',
    //     password:'1234'
    //   }
    //   axios.post('http://13.124.45.246:8080/users/login',data)
    //     .then(res=>{
    //       console.log(res)
    //     })
    //     .catch(err=>{
    //       console.log(err)
    //     })

    // }
  }
}
</script>
<style lang="scss" scoped>
.wrap{
  width:100vw;
  height:100vh;
  .login-box{
    width:300px;
    height:400px;
    background-color:white;
    border:1px solid $gray-800;
    flex-direction: column;
    border-radius:15px;
    .title{
      height:25%;
      font-family: "Oswald", sans-serif;
      font-weight: 700;
      font-size:36px;
      span{
        font-size:40px;
      }
    }
    form{
      display:flex;
      align-items: center;
      flex-direction: column;
      width:60%;
      height:75%;
      .line{
        display:flex;
        flex-direction: column;
        align-items: center;
        margin:10px 0;
        box-sizing: border-box;
        width:100%;
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
          border: 1px solid black;
          border-radius: 15px;
          transition:.4s;
          &:hover{
            width:280px;
          }
          &:focus{
            width:280px;
          }
        }
      }
      .login-btn{
        display:block;
        margin-top:20px;
        width:130px;
        height:35px;
        border:1px solid black;
        border-radius: 15px;
        font-size:12px;
        background-color: white;
        transition:.2s;
        &:hover{
          background-color:invert($color: #FFF);
          color:white;
          border:1px solid white;
        }
      }
    }
  }
}
</style>