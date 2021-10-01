<template>
  <!-- <h1>메뉴리스트입니다</h1> -->
  <div
    class="container"
    :style="{ 'margin-left': navWidth }">
    <header
      class="header">
      <div class="h-nav">
        <div class="item">
          <button
            @click="getMenuList('all')"
            class="link">
            전체
          </button>
        </div>
        <div
          v-for="ct in allMenu"
          :key="ct.id"
          class="item fcc">
          <button
            @click="getMenuList(ct)"
            class="link">
            {{ ct.name }}  
          </button>
        </div>
      </div>
      <div class="h-sets fa">
        <div class="box fcc">
          <button
            @mouseover="ctTog"
            class="icon-btn fcc">
            <img
              src="https://raw.githubusercontent.com/iWDNN/temp/master/outline_settings_black_24dp.png"
              alt="" />
          </button>
          <div
            v-if="ctToggle"
            class="btn-group">
            <button
              @mousedown="ctMod"
              @mouseup="ctToggle=false"
              class="btn fcc">
              <img
                src="https://raw.githubusercontent.com/iWDNN/temp/master/Add-category.png"
                alt="" />
              <span>추가</span>
            </button>
            <button  
              @mousedown="ctChangeModal = true"
              @mouseup="ctToggle=false"
              class="btn fcc">
              <img
                src="https://raw.githubusercontent.com/iWDNN/temp/master/outline_edit_black_24dp.png"
                alt="" />
              <span>수정</span>
            </button>
            <button 
              @mousedown="ctDeleteModal = true"
              @mouseup="ctToggle=false"
              class="btn fcc">
              <img
                src="https://raw.githubusercontent.com/iWDNN/temp/master/outline_delete_black_24dp.png"
                alt="" />
              <span>제거</span>
            </button>
          </div>
        </div>
      </div>
    </header>
    <section class="section">
      <!-- <MenuItem 
        v-for="info in menuList"
        :key="info.imdbID"
        :info="info" /> -->
    </section>
    <button
      @click="addToggle"
      v-if="!toggle"
      class="add-menu-toggle fcc">
      <img
        src="https://raw.githubusercontent.com/iWDNN/temp/master/add-icon.png"
        alt="add" />
    </button>

    <!-- 메뉴 추가시키는 사이드바 -->
    <div
      :class="{'open':toggle}"
      class="add-menu fj">
      <button
        class="close-btn"
        @click="resetModal">
        X
      </button>
      <h1>메뉴 추가</h1>
      <form
        class="fa">
        <div
          :style="{ backgroundImage:`url(${image})`}"
          class="menu-img"> 
        </div>
        <!-- 임시 -->
        <div
          class="line">
          <label for="image">이미지 URL:</label>
          <input
            v-model="image"
            id="image"
            type="text" />
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
            type="number" />
        </div>
        <div class="line">
          <label for="menu-desc">음식 설명:</label>
          <input
            v-model="desc"
            id="menu-desc"
            type="text" />
        </div>
        <div class="line">
          <label for="menu-desc">
            <span>카테고리</span>
          </label>
          <label></label>
        </div>
        <div class="category-box fj">
          <div class="sort-box">
            <div
              v-for="ct in allMenu"
              :key="ct.id"
              class="line-item fcc">
              <button
                @click="getMenuList(ct.id)"
                class="line-link fcc">
                <span>{{ ct.name }}</span>  
              </button>
            </div>
          </div>
        </div>
        <button
          @click="submitAddForm"
          @key.enter="submitAddForm"
          class="add-menu-btn fcc">
          <img
            src="https://raw.githubusercontent.com/iWDNN/temp/master/Add-category.png"
            alt="" />
          <span>메뉴 등록하기</span>
        </button>
      </form>
    </div>
    <!-- 카테고리 추가 모달 -->
    <div
      v-if="ctModal"
      class="modal sm fcc">
      <button
        class="close-btn"
        @click="resetModal">
        X
      </button>
      <div class="box fcc">
        <div class="title fcc">
          <h1>카테고리를 추가</h1>
        </div>
        <form
          class="fcc"
          @submit="submitCtAdd">
          <input
            v-model="ctName"
            placeholder="카테고리명"
            type="text" />
          <button
            class="reg-btn"
            type="submit">
            추가하기
          </button>
        </form>
      </div>
    </div>
    <!-- 카테고리 수정 모달 -->
    <div
      v-if="ctChangeModal"
      class="modal sm fcc">
      <button
        class="close-btn"
        @click="resetModal">
        X
      </button>
      <div class="box fcc">
        <div
          v-if="!ctChangeId"
          class="title fcc">
          <h1 class="sm-font">
            변경 할 카테고리를 선택
          </h1>
        </div>
        <div v-if="ctChangeId">
          <div class="title">
            <h1 class="sm-font">
              변경 할 카테고리명을 입력
            </h1>
          </div>
          <form
            class="fcc"
            @submit="submitCtChange">
            <input
              v-model="ctChangeName"
              placeholder="변경하실 카테고리명"
              type="text" />
            <button
              class="reg-btn"
              type="submit">
              변경하기
            </button>
          </form>
        </div>
      </div>
    </div>
    <!-- 카테고리  모달 -->
    <div
      v-if="ctDeleteModal"
      class="modal sm fcc">
      <button
        class="close-btn"
        @click="resetModal">
        X
      </button>
      <div class="box fcc">
        <div
          v-if="!ctDeleteId"
          class="title fcc">
          <h1 class="sm-font">
            삭제 할 카테고리를 선택
          </h1>
        </div>
        <div v-if="ctDeleteId">
          <div class="title">
            <h1 class="sm-font fcc">
              삭제 할 카테고리가 맞습니까?
            </h1>
            <h2>`{{ ctDeleteName }}`</h2>
          </div>
          <div class="info fcc">
            <button
              @click="submitDelChange"
              class="btn invert">
              예
            </button>
            <button class="btn">
              아니요
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="toggle"
    class="add-menu-blank">
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
      'allMenu'
    ]),
    ...mapState('status',[
      'collapsed',
      'navWidth',
    ])
  },
  data(){
    return{
      //토글만 몇갱 ㅑ시발
      //메뉴 추가 사이드바
      toggle:true,
      //카테고리 설정 아이콘 
      ctToggle:false,
      //카테고리 추가 모달
      ctModal:false,
      //수정
      ctChangeModal:false,
      ctChangeId:null,
      ctChangeName:'',
      //제거
      ctDeleteModal:false,
      ctDeleteId:null,
      ctDeleteName:'',
      //변수
      image:'',
      name:'',
      ctName:'',
      desc:'',
      price:null,
      categoryId:null
    }
  },
  methods:{
    getMenuList(ct){
      if(this.ctChangeModal){
        this.ctChangeId = ct.id
      } else if(this.ctDeleteModal){
        this.ctDeleteId = ct.id
        this.ctDeleteName = ct.name
      }else {
      console.log(ct)
      this.categoryId = ct
      this.$store.dispatch('menu/getMenuList') // 후 전체 리스트 받기
      }
    },
    addToggle(){ // 추가 사이드 바 나오게하는 토글
       this.toggle = !this.toggle
    },
    ctTog(){ // 카테고리 설정 아이콘 메뉴 토글..
      this.ctToggle = !this.ctToggle
    },
    ctMod(){ // 카테고리 추가 모달
      this.ctModal = !this.ctModal
    },
    resetModal(){
      this.toggle = false
      this.ctToggle = false
      this.ctModal = false
      this.ctChangeModal = false
      this.ctChangeId = null
      this.ctChangeName = ''
      this.ctDeleteModal = false,
      this.ctDeleteId = null,
      this.ctDeleteName = ''
      this.image='',
      this.name='',
      this.ctName='',
      this.desc='',
      this.price=null,
      this.categoryId=null
    },
    //폼
    //카테고리
    //카테고리 추가 폼
    async submitCtAdd(){
      const data = {
        name:this.ctName
      }
      await this.$store.dispatch('menu/regCategory',data)
      this.resetModal()
    },
    //카테고리 수정 폼
    async submitCtChange(){
      const data = {
        categoryId: this.ctChangeId,
        name: this.ctChangeName
      }
      await this.$store.dispatch('menu/chgCategory',data)
      this.resetModal()
    },
    //카테고리 제거 
    async submitDelChange(){
      const data = {
        categoryId:this.ctDeleteId
      }
      await this.$store.dispatch('menu/delCategory',data)
      this.resetModal()
    },
    //메뉴 추가 폼
    submitAddForm(){
      const data = {
        name:this.name,
        description:this.desc,
        price:this.price,
        image:this.image,
        categoryId:this.categoryId
      }
      this.$store.dispatch('menu/addMenuItem',data)
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  transition:0.2s;
  .header{
    justify-content: space-between;
    .h-nav{
      width:80%;
      display:flex;
      align-items: center;
      .item{
        flex-shrink:0;
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
    .h-sets{
      .box{
        position:relative;
        .icon-btn{
          margin-right:20px;
          img{
            width:20px;
            height:20px;
          }
        }
        .btn-group{
          position:absolute;
          top:30px;
          right:20px;
          background-color:$m5;
          .btn{
            border-radius: 5px;
            width:80px;
          }
        }
      }
    }
  }
  .section{
  }
  .modal{
    .box{
      width:80%;
      height:100%;
      flex-direction: column;
      .title{
        color:$m2;
        margin-bottom:50px;
        h1{
          font-size:18px;
        }
        h2{
          font-size:30px;
          color:darken($m2,20%);
          margin-top:20px;
          text-align: center;
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
          margin-top:40px;
        }
      }
    }
  }
}
$add-menu-width:260px;
.add-menu-blank{
  width:$add-menu-width;
  height:100%;
  flex-shrink:0;
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
      background-size:cover;
      background-position: center;
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
      &:nth-child(6){
        label:first-child{
          span{
            font-size:13px;
          }
        }
      }
    }
    .category-box{
        flex-direction: column;
        flex-wrap: wrap;
        flex-shrink:0;
        width:100%;
        .sort-box{
          flex-direction: column;
          flex-wrap: wrap;
          height:50px;
          .line-item{
            display:inline-block;
            width:50%;
            margin:0;
            .line-link{
              width:100%;
              color:$m4;
              border:1px solid $m5;
              background-color:$m5;
              &:focus{
                border:1px solid $m4;
              }
              span{
                display:block;
              }
            }
          }
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