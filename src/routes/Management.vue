<template>
  <div class="wrap">
    <div
      v-if="loading"
      class="loading-animation fcc">
      <div class="ani-wrap fcc">
        <div class="title">
          <img
            src="https://raw.githubusercontent.com/iWDNN/temp/master/logo_1.png"
            alt="" />
        </div>
        <div class="bar">
          <div class="background-bar"></div>
          <div class="loading-bar"></div>
        </div>
      </div>
    </div>
    <Nav />
    <div class="nav-blank"></div>
    <Router-view />
  </div>
</template>

<script>
import Nav from '~/components/Nav'
import { mapState } from 'vuex'
export default {
  components:{
    Nav
  },
  data(){
    return{
      name:'',
      description:'',
      licenseImage:'',
    }
  },
  computed:{
    ...mapState('status',[
      'collapsed',
      'navWidth'
    ]),
    ...mapState('restaurant',[
      'store'
    ]),
    ...mapState('login',[
      'loading'
    ]),
  },
  methods:{
  }
  
}
</script>

<style lang="scss" scoped>
.wrap{
  .nav-blank{
    width:16px;
    height:100%;
    flex-shrink: 0;
  }
  .modal{
    border:1px solid $m2;
    background-color: $m5;
    border-radius: 10px;
    .box{
      width:80%;
      height:100%;
      flex-direction: column;
      position:relative;
      .title{
        margin-bottom:50px;
        flex-direction: column;
        h1{
          color:$m2;
          font-size:20px;
          font-weight: 700;
          margin-bottom:20px;
        }
        h2{
          font-size:13px;
        }
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
      }
      .abs{
        border:none;
        width:60px;
        height:20px;
        position:absolute;
        bottom:5px;
        color:$m2;
        &:hover{
          border:none;
          background-color:$m1;
        }
      }
    }
  }
}
</style>