<template>
  <div
    class="menu"
    @click="getId(info)">
    <div
      class="img"
      :style="{ backgroundImage:`url(${info.image})` }"></div>
    <div class="info">
      <div class="name">
        <span>{{ info.name }}</span>
      </div>
      <div class="desc">
        <span>{{ info.description }}</span>
      </div>
      <div class="price">
        <div class="price-wrap fcc">
          <span>{{ numberWithCommas(info.price) }} 원</span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState } from 'vuex'
export default {
  props:{
    info:{
      type:Object,
      default:()=>({})
    }
  },
  data(){
    return{
      
    }
  },
  computed:{
    ...mapState('menu',[
      'mnChangeAlert',
      'mnDeleteAlert'
    ]),
  },
  methods:{
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getId(info){
      if(this.mnChangeAlert){
        this.$store.commit('menu/updateChangeId',info.id)
      } else if(this.mnDeleteAlert){
        this.$store.commit('menu/updateDeleteId',info)
      } else{
        console.log(info.id)
      }
    },
    updateResetAlert(){
      this.$store.commit('menu/resetAlert')
    },
  }
}
</script>
<style lang="scss" scoped>
.menu{
  $div-width:260px;
  margin:18px;
  width:$div-width;
  height:180px;
  background-color:$gray-200;
  box-shadow:0 7px 25px rgba(0,0,0,0.08);
  box-sizing: border-box;
  // 내부요소
  display:flex;
  flex-direction: column;
  border-radius: 15px;
  overflow: hidden;
  .img{
    width:100%;
    height:58%;
    background-size:cover;
    background-position: center;
  }
  .info{
    width:100%;
    height:42%;
    display:flex;
    flex-direction: column;
    justify-content: center;
    div{
      display: flex;
      align-items: center;
      font-size:11px;
      padding:0 10px;
      
    }
    .name{
      justify-content: flex-start;
      font-size:12px;
      font-weight: 700;
      margin-bottom:0.5em;
    }
    .desc{
      margin-bottom:9px;
    }
    .price{
      width:93%;
      // justify-content: flex-end;
      .price-wrap{
        padding:4px 5px 4px 5px;
        border-radius: 15px;
        background-color:lighten($m2,10%);
        span{
          color:$m5;
        }
      }
    }
  }
}
</style>