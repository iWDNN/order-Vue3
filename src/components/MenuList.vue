<template>
  <!-- <h1>메뉴리스트입니다</h1> -->
  <div
    class="container"
    :style="{ 'margin-left': navWidth}">
    <header
      class="header">
      <div class="h-nav">
        <div
          v-for="nav in navs"
          :key="nav.name"
          class="item fcc">
          <button
            @click="getMenuList(nav.type)"
            class="link">
            {{ nav.name }}  
          </button>
        </div>
      </div>
    </header>
    <section class="section">
      <MenuItem 
        v-for="info in menuList"
        :key="info.imdbID"
        :info="info" />
    </section>
    <button
      @click="addToggle"
      v-if="!toggle"
      class="add-menu-toggle fcc">
      <img
        src="https://raw.githubusercontent.com/iWDNN/temp/master/add-icon.png"
        alt="add" />
    </button>
  </div>

  <!-- 메뉴 추가시키는 사이드바 -->
  <div
    v-if="toggle"
    class="add-menu-blank"></div>
  <div
    :class="{'open':toggle}"
    class="add-menu fj">
    <button
      class="add-close-btn"
      @click="addToggle">
      X
    </button>
    <h1>메뉴 추가</h1>
    <form class="fa">
      <div class="menu-img">
        <!-- <label for="img">이미지 업로드</label>
        <input
          id="img"
          type="file" /> -->
      </div>
      <div class="line">
        <label for="menu-name">음식 이름:</label>
        <input
          v-model="name"
          id="menu-name"
          type="text" />
      </div>
      <div class="line">
        <label for="menu-price">가격:</label>
        <input
          v-model="price"
          id="menu-price"
          type="text" />
      </div>
      <div class="line">
        <label for="menu-desc">음식 설명:</label>
        <input
          v-model="desc"
          id="menu-desc"
          type="text" />
      </div>
      <div class="line">
        <label for="category">음식 분류:</label>
        <input
          v-model="categoryId"
          id="category"
          type="text" />
      </div>
      <button class="add-menu-btn fcc">
        <img
          src="https://raw.githubusercontent.com/iWDNN/temp/master/Add-category.png"
          alt="" />
        <span>메뉴 등록하기</span>
      </button>
    </form>
  </div>
</template>

<script>
import MenuItem from '~/components/MenuItem'
import { mapState } from 'vuex'

export default {
  created(){
    this.$store.dispatch('menu/getMenuList')
  },
  components:{
    MenuItem
  },
  computed:{
    ...mapState('menu',[
      'menuList'
    ]),
    ...mapState('status',[
      'collapsed',
      'navWidth',
    ])
  },
  data(){
    return{
      navs:[
        {
          name:'전체',
          // type:'',
        },
        {
          name:'메인',
          type:'movie',
        },
        {
          name:'사이드',
          type:'series',
        },
      ],
      toggle:false,
      name:'',
      desc:'',
      price:null,
      categoryId:''
    }
  },
  methods:{
    getMenuList(type){
      this.$store.dispatch('menu/resetMenuList') // 최초실행때만 초기화 
      this.$store.dispatch('menu/getMenuList',type) // 후 전체 리스트 받기
    },
    addToggle(){
       this.toggle = !(this.toggle)
    },
    postMenuItem(){
      const data = {
        name:this.name,
        desc:this.desc,
        price:this.price,
        categoryId:this.categoryId
      }
      this.$store.dispatch('menu/postMenuItem',data)
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  transition:0.2s;
  .header{
    .h-nav{
      display:flex;
      align-items: center;
      .item{
        width:50px;
        height:100%;
        margin:0 10px;
        &:first-child{
          margin:0 50px;
        }
        .link{
          width:100%;
          height:100%;
          border:none;
          outline:none;
          font-size:12px;
          background-color:$white;
          &:hover{
            border-bottom:2px solid $m4;
          }
          &:focus{
            font-weight:700;
            border-bottom:2px solid $m4;
          }
        }
      }
    }
    .h-subNav{
      
    }
  }
  .section{
  }
}
$add-menu-width:260px;
.add-menu-blank{
  width:$add-menu-width;
  height:100%;
}
.add-menu{
  width:$add-menu-width;
  height:100%;
  position:fixed;
  right:-$add-menu-width;
  flex-direction: column;
  background-color: white;
  border-left:2px solid #EEEEEE;
  padding:20px;
  box-sizing: border-box;
  transition:0.2s ease;
  // .add-close-btn{}
  h1{
    display: block;
    margin:0;
    padding-bottom:5px;
    border-bottom:1px solid black;
  }
    
  form{
    position:relative;
    height:100%;
    flex-direction: column;
    .menu-img{
      margin:10px 0;
      width:220px;
      height:180px;
      background-color:#EBEBEB;
    }
    .line{
      width:220px;
      height:20px;
      display:flex;
      align-items: center;
      margin:10px 0;
      font-size:12px;
      label{
        width:40%;
        text-align: center;
      }
      input{
        width:60%;
        outline:none;
        border:none;
        background-color:#EBEBEB;
      }
    }
    .add-menu-btn{
      width:160px;
      height:40px;
      position: absolute;
      bottom:0;
      font-size:12px;
      border:none;
      outline:none;
      background-color:rgba(#DDC2C2,0.3);
      border-radius: 5px;
      img{
        width:16px;
        height:16px;
        margin-right:5px;
      }
    }
  }
}
.open{
  right:0;
}
</style>