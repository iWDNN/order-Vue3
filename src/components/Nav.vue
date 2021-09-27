<template>
  <nav>
    <div class="box">
      <div
        v-for="nav in navigation"
        :key="nav.name"
        class="item fcc">
        <Router-link 
          class="link fcc"
          :to="nav.href">
          <img
            :src="nav.imgPath"
            alt="nav-icon" />
          <span>{{ nav.name }}</span>
        </Router-link>
      </div>
      <button
        @click="showNav"
        class="nav-toggle fcc">
        <img
          src="https://raw.githubusercontent.com/iWDNN/temp/master/double-arrow-white.png"
          alt="" />
      </button>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data(){
    return{
      navigation:[
        {
          name:'메인',
          href:'/manage/main',
          imgPath:'https://raw.githubusercontent.com/iWDNN/temp/master/home-white.png'
        },
        {
          name:'메뉴',
          href:'/manage/menu',
          imgPath:'https://raw.githubusercontent.com/iWDNN/temp/master/Mg-nav01.png',
        },
        {
          name:'테이블',
          href:'/manage/table',
          imgPath:'https://raw.githubusercontent.com/iWDNN/temp/master/Mg-nav02.png'
        },
        {
          name:'접수내역',
          href:'/manage/order',
          imgPath:'https://raw.githubusercontent.com/iWDNN/temp/master/Mg-nav03.png'
        },
      ]
    }
  },
  computed:{

  },
  methods:{
    showNav(){
      this.$store.commit('status/updateState')
    }
  }
}
</script>

<style lang="scss" scoped>
nav{
  display:flex;
  width:50px;
  height:100vh;
  position:fixed;
  top:0;
  left:0;
  background-color:$m2;
  color:$white;
  .box{
    display:flex;
    flex-direction: column;
    align-items: center;
    position:relative;
    .item{
      flex-direction: column;
      width:50px;
      height:50px;
      // border:1px solid $white;
      .link{
        width:100%;
        height:100%;
        color:white;
        flex-direction: column;
        text-decoration: none;
        transition:.4s;
        &:hover{
          border:2px solid white;
        }
        &:focus{
          border:3px solid white;
          background-color:$white;
          color:$primary;
        }
        img{
          width:20px;
          height: 20px;
          margin-bottom:2px;
        }
        span{
          font-size:12px;
        }
      }
    }
  }
  .nav-toggle{
    width:50px;
    height:50px;
    position: absolute;
    bottom:1px;
    border:none;
    outline:none;
    background-color:$m1;
    img{
      width:25px;
      height:25px;
    }
  }
}

</style>