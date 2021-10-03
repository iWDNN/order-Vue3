<template>
  <div class="wrap">
    <Nav />
    <div class="nav-blank"></div>
    <Router-view />


    <!-- 테이블 조회 모달 -->
    <div
      v-if="!store"
      class="modal-background">
    </div>
    <div 
      v-if="!store"
      class="modal fcc">
      <div class="box fcc">
        <div class="title fcc">
          <h1>식당 등록</h1>
          <h2>
            식당 등록 해야 이용 가능
          </h2>
        </div>
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
        <button
          class="btn abs"
          @click="logout">
          뒤로가기
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '~/components/Nav'
import { mapState } from 'vuex'
export default {
  created(){
    this.$store.dispatch('restaurant/getStore')
  },
  components:{
    Nav
  },
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
      'navWidth'
    ]),
    ...mapState('restaurant',[
      'store'
    ]),
  },
  methods:{
    submitResForm(){
      const data = {
        name:this.name,
        description:this.description,
        licenseImage:this.licenseImage,
      }
      this.$store.dispatch('restaurant/regRes',data)
    },
    logout(){
      this.$store.dispatch('login/logOut')
    }
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