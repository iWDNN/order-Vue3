<template>
  <div class="wrap">
    <Nav />
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
      </div>
    </div>
    <Router-view />
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
  }
  
}
</script>

<style lang="scss" scoped>
.wrap{
  .modal{
    border:1px solid $m2;
    background-color: $m5;
    border-radius: 10px;
    .box{
      width:80%;
      height:100%;
      flex-direction: column;
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