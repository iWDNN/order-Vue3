<template>
  <div
    class="container"
    :style="{ 'margin-left': navWidth}">
    <div class="info">
      <header class="header fa">
        <button
          class="btn"
          @click="logout">
          로그아웃
        </button>
        <button
          class="btn"
          @click="test">
          test
        </button>
      </header>
      <section class="Main-section">
        <div class="title fa">
          <h1>{{ store.name }}</h1>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import VueCookies from 'vue-cookies'
import { mapState } from 'vuex'
export default {
  data(){
    return{
    }
  },
  computed:{
    ...mapState('status',[
      'collapsed',
      'navWidth',
    ]),
    ...mapState('restaurant',[
      'store',
    ]),
    
  },
  methods:{
    logout(){
      this.$store.dispatch('login/logOut')
    },
    submitResForm(){
      const data = {
        name:this.name,
        description:this.description,
        licenseImage:this.licenseImage,
      }
      this.$store.dispatch('restaurant/regRes',data)
    },
    test(){
    }
    
  }
}
</script>
<style lang="scss" scoped>
.container{
  .info{
    .header{
      justify-content: flex-end;
      .btn{
        width:130px;
        height:35px;
        outline:none;       
        border:1px solid $m2;
        border-radius: 15px;
        background-color:transparent;
        transition: 0.2s linear;
        font-size:12px;
        margin-right:10px;
        &:hover{
          background-color:$m2;
          color:$m5;
          border:1px solid $m5;
        }
      }
      .logout{
      }
    }
    .Main-section{
      display: flex;
      flex-direction: column;
      .title{
        width:90%;
        height:60px;
        border-radius: 10px;
        background-color:$m2;
        box-sizing: border-box;
        margin: 0 20px; // 임시방편
        h1{
          color:$m5;
          padding-left:30px;
          font-family: 'Oswald',sans-serif;
          font-weight: 700;
          font-size:30px;
        }
      }
    }
  }
  .modal{
    border:1px solid $m2;
    background-color: $m5;
    border-radius: 10px;
    .box{
      width:80%;
      height:100%;
      flex-direction: column;
      .title{
        color:$m2;
        margin-bottom:50px;
        font-size:20px;
        font-weight: 700;
      }
      form{
        display: flex;
        flex-direction: column;
        input{
          width:100%;
          height:37px;
          padding-left:10px;
          outline:none;
          border:none;
          border-bottom:2px solid $gray-400;
          &::placeholder{
            color:$gray-400;
          }
          &:hover::placeholder{
            color:$m5;
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
            color:$m2;
            border:1px solid $m2;
          }
        }
      }
    }
  }
}
</style>
