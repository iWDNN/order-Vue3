<template>
  <div
    class="container"
    :style="{ 'margin-left': navWidth}">
    <div class="info">
      <header class="header fa">
        <button @click="logout">
          로그아웃
        </button>
        <button @click="test">
          test
        </button>
      </header>
      <section class="section">
      </section>
    </div>
    <div class="modal fcc">
      <div class="box fcc">
        <h1 class="title">
          식당 등록
        </h1>
        <form
          class="fcc"
          @submit.prevent="submitResForm">
          <input
            v-model="name"
            placeholder="식당명"
            type="text" />
          <input
            v-model="description"
            placeholder="설명"
            type="text" />
          <input
            v-model="licenseImage"
            placeholder="사업자등록증"
            type="text" />
          <button
            class="reg-btn"
            type="submit">
            등록
          </button>
        </form>
      </div>
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
      name:'',
      description:'',
      licenseImage:''
    }
  },
  computed:{
    ...mapState('status',[
      'collapsed',
      'navWidth',
    ])
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
      this.$store.dispatch('register/regRes',data)
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
      button{
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
    }
    .section{
    
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
