<template>
  <nav
    :style="{ width: navWidth}">
    <div class="box">
      <div
        v-for="nav in navigation"
        :key="nav.name"
        class="item fj">
        <div
          class="line fa">
          <div class="icon">
            <Router-link 
              class="icon-link fcc"
              :to="nav.href">
              <img
                :src="nav.imgPath"
                alt="nav-icon" />
            </Router-link>
          </div>
          <div class="link-box">
            <Router-link
              v-if="!collapsed" 
              class="link fcc" 
              :to="nav.href">
              {{ nav.name }}
            </Router-link>
          </div>
        </div>
      </div>
      <button
        @click="showNav"
        class="nav-toggle fcc"
        :class="{ 'rotate-180' :collapsed }">
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
    ...mapState('status',[
      'collapsed',
      'navWidth'
    ])
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
  height:97vh;
  position:fixed;
  top:0;
  color:$white;
  background-color:$m2;
  border-right:1px solid lighten($m2,10%);
  border-radius:10px;
  box-shadow:0 7px 25px rgba(0,0,0,0.08);
  margin:10px 5px;
  transition: 0.3s ease;
  .box{
    padding-top:20px;
    display:flex;
    flex-direction: column;
    align-items: center;
    position:relative;
    .item{
      flex-direction: column;
      width:100%;
      // border:1px solid $white;
      .line{
        display:flex;;
        .icon{
          width:50px;
          height:50px; 
          .icon-link{
            width:90%;
            height:90%;
            color:white;
            flex-direction: column;
            transition:.4s ease;
            flex-shrink: 0;
            margin-left:2px;
            box-sizing: border-box;
            &:focus{
              border-top:1px solid lighten($m2,5%);
              border-left:1px solid lighten($m2,5%);
              border-right:1px solid darken($m2,5%);
              border-bottom:1px solid darken($m2,5%);
              border-radius:10px;
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
        .link-box{
          width:80px;
          .link{
            font-size:12px;
            text-decoration: none;
            color:$m5;
            padding-left:20px;
          }
        }
      }
    }
  }
  .nav-toggle{
    width:50px;
    height:50px;
    position: absolute;
    bottom:1px;
    left:0;
    border:none;
    outline:none;
    background-color:$m1;
    transition:0.2s linear;
    img{
      width:25px;
      height:25px;
    }
  }
}

</style>