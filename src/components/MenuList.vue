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
            @click="getMenuList()"
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
      <div class="alert fa">
        <div
          v-if="ctChangeModal||ctDeleteModal"
          class="alert-box fa">
          해당 항목을 선택
          <img
            src="https://raw.githubusercontent.com/iWDNN/temp/master/outline_done_black_24dp.png"
            alt="" />
          <button
            class="alert-btn fcc"
            @click="resetModal">
            취소
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
            <div class="line fa">
              <span>카테고리</span>
            </div>
            <button
              @mousedown="ctMod"
              @mouseup="ctToggle=false"
              class="btn fst fcc">
              <img
                src="https://raw.githubusercontent.com/iWDNN/temp/master/Add-category.png"
                alt="" />
              <span>카테고리 추가</span>
            </button>
            <button  
              @mousedown="ctChangeModal = true"
              @mouseup="ctToggle=false"
              class="btn fcc">
              <img
                src="https://raw.githubusercontent.com/iWDNN/temp/master/outline_edit_black_24dp.png"
                alt="" />
              <span>카테고리 수정</span>
            </button>
            <button 
              @mousedown="ctDeleteModal = true"
              @mouseup="ctToggle=false"
              class="btn fcc">
              <img
                src="https://raw.githubusercontent.com/iWDNN/temp/master/outline_delete_black_24dp.png"
                alt="" />
              <span>카테고리 삭제</span>
            </button>
            <div class="line fa">
              <span>메뉴</span>
            </div>
            <button 
              @mousedown="updateMnChangeAlert"
              @mouseup="ctToggle=false"
              class="btn fcc">
              <img
                src="https://raw.githubusercontent.com/iWDNN/temp/master/outline_edit_black_24dp.png"
                alt="" />
              <span>메뉴 수정</span>
            </button>
            <button 
              @mousedown="updateMnDeleteAlert"
              @mouseup="ctToggle=false"
              class="btn lst fcc">
              <img
                src="https://raw.githubusercontent.com/iWDNN/temp/master/outline_delete_black_24dp.png"
                alt="" />
              <span>메뉴 제거</span>
            </button>
          </div>
        </div>
      </div>
    </header>
    <section class="section">
      <!-- 메뉴 수정 alert box -->
      <div class="alert fa">
        <div
          v-if="mnChangeAlert || mnDeleteAlert"
          class="alert-box fa">
          해당 항목을 선택
          <img
            src="https://raw.githubusercontent.com/iWDNN/temp/master/outline_done_black_24dp.png"
            alt="" />
          <button
            class="alert-btn fcc"
            @click="updateResetAlert">
            취소
          </button>
        </div>
      </div>
      <MenuItem
        v-for="info in sectionMenu"
        :key="info.id"
        :info="info" />
    </section>
    <!-- 메뉴 사이드바 토글 -->
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
        <img
          src="https://raw.githubusercontent.com/iWDNN/temp/master/outline_clear_black_24dp.png"
          alt="" />
      </button>
      <h1>메뉴 추가</h1>
      <div
        class="add-menu-form fa">
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
            <span>카테고리 선택</span>
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
                @click="getMenuList(ct)"
                class="line-link fcc">
                <span>{{ ct.name }}</span>  
              </button>
            </div>
          </div>
        </div>
        <button
          @click="submitAddForm"
          @key.enter="submitAddForm"
          class="add-menu-btn btn fcc">
          <img
            src="https://raw.githubusercontent.com/iWDNN/temp/master/Add-category.png"
            alt="" />
          <span>메뉴 등록하기</span>
        </button>
      </div>
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
      v-if="ctChangeId"
      class="modal sm fcc">
      <button
        class="close-btn"
        @click="resetModal">
        X
      </button>
      <div class="box fcc">
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
    <!-- 카테고리 삭제 모달 -->
    <div
      v-if="ctDeleteId"
      class="modal sm fcc">
      <button
        class="close-btn"
        @click="resetModal">
        X
      </button>
      <div class="box fcc">
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
            <button
              @click="resetModal"
              class="btn">
              아니요
            </button>
          </div>
        </div>
      </div>
    </div>
  
    <!-- 메뉴 수정 모달 -->
    <div
      v-if="mnChangeId"
      class="modal md fcc">
      <button
        class="close-btn"
        @click="updateResetAlert">
        X
      </button>
      <div class="box fcc">
        <div v-if="mnChangeId">
          <div class="title mn">
            <h1 class="sm-font">
              변경 할 메뉴를 클릭
            </h1>
          </div>
          <form
            class="fcc"
            @submit="submitMnChange">
            <input
              v-model="mnName"
              placeholder="메뉴명"
              type="text" />
            <input
              v-model="mnDescription"
              placeholder="메뉴설명"
              type="text" />
            <input
              v-model="mnPrice"
              placeholder="메뉴가격"
              type="number" />
            <input
              v-model="mnImage"
              placeholder="메뉴이미지URL"
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
    <!-- 메뉴 삭제 모달 -->
    <div
      v-if="mnDeleteId"
      class="modal sm fcc">
      <button
        class="close-btn"
        @click="updateResetAlert">
        X
      </button>
      <div class="box fcc">
        <div v-if="mnDeleteId">
          <div class="title fd">
            <h1 class="sm-font fcc">
              삭제 할 카테고리가 맞습니까?
            </h1>
            <h2>`{{ mnDeleteName }}`</h2>
          </div>
          <div class="info fcc">
            <button
              @click="submitMnDelete"
              class="btn invert">
              예
            </button>
            <button
              @click="updateResetAlert"
              class="btn">
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
  data(){
    return{
      mnid:[],
      //토글만 몇갱 ㅑ시발
      // 메뉴 추가 사이드바
      toggle:false,
      // 카테고리 설정 아이콘 
      ctToggle:false,
      // 카테고리 추가 모달
      ctModal:false,
      // 카테고리 수정
      ctChangeModal:false,
      ctChangeId:null,
      ctChangeName:'',
      // 카테고리 제거
      ctDeleteModal:false,
      ctDeleteId:null,
      ctDeleteName:'',
      // 메뉴 수정
      mnName:'',
      mnDescription:'',
      mnPrice:null,
      mnImage:'',
      // 변수
      image:'',
      name:'',
      ctName:'',
      desc:'',
      price:null,
      categoryId:null
    }
  },
  computed:{
    ...mapState('menu',[
      'allMenu',
      'sectionMenu',
      'mnChangeAlert',
      'mnChangeId',
      'mnDeleteAlert',
      'mnDeleteId',
      'mnDeleteName'
    ]),
    ...mapState('status',[
      'collapsed',
      'navWidth',
    ])
  },
  methods:{
    getMenuList(ct){
      if(this.ctChangeModal){
        this.ctChangeId = ct.id
      } else if(this.ctDeleteModal){
        this.ctDeleteId = ct.id
        this.ctDeleteName = ct.name
      }else if(this.toggle){
        this.categoryId=ct.id
      } else{
        ct
        ? this.$store.dispatch('menu/getMenuList',ct.id)
        : this.$store.dispatch('menu/getMenuList')

      }
    },
    getAllMenuList(){
      this.$store.dispatch('menu/getAllMenu')
    },

    // 토글 지옥
    addToggle(){ // 추가 사이드 바 나오게하는 토글
       this.toggle = !this.toggle
    },
    ctTog(){ // 카테고리 설정 아이콘 메뉴 토글..
      this.ctToggle = !this.ctToggle
    },
    ctMod(){ // 카테고리 추가 모달
      this.ctModal = !this.ctModal
    },
    // 메뉴 수정 토글
    updateMnChangeAlert(){
      this.$store.commit('menu/updateChangeAlert')
    },
    // 메뉴 제거 토글
    updateMnDeleteAlert(){
      this.$store.commit('menu/updateDeleteAlert')
    },
    updateResetAlert(){
      this.$store.commit('menu/resetAlert')
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
      this.ctDeleteName = '',
      this.image='',
      this.name='',
      this.ctName='',
      this.desc='',
      this.price=null,
      this.categoryId=null,
      this.mnName='',
      this.mnDescription='',
      this.mnPrice=null,
      this.mnImage=''
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
    async submitAddForm(){
      const data = {
        name:this.name,
        description:this.desc,
        price:this.price,
        image:this.image,
        categoryId:this.categoryId
      }
      await this.$store.dispatch('menu/addMenuItem',data)
      this.resetModal()
    },
    //메뉴 수정 폼
    async submitMnChange(){
      const data = {
        formData:{
          name:this.mnName,
          description:this.mnDescription,
          price:this.mnPrice,
          image:this.mnImage,
        },
        id:this.mnChangeId
      }
      console.log(data)
      await this.$store.dispatch('menu/chgMenuItem',data)
      this.$store.commit('menu/resetAlert')
      this.resetModal()
    },
    //메뉴 삭제 폼
    async submitMnDelete(){
      const data = {
        itemsId:this.mnDeleteId
      }
      await this.$store.dispatch('menu/delMenuItem',data)
      this.$store.commit('menu/resetAlert')
      this.resetModal()
    },
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
      margin-left:30px;
      .item{
        width:60px;
        flex-shrink:0;
        height:100%;
        margin:0 10px;
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
          margin-right:30px;
          img{
            width:20px;
            height:20px;
          }
        }
        .btn-group{
          position:absolute;
          top:30px;
          right:20px;
          background-color:lighten($m2,5%);
          border-radius:10px;
          padding:0 5px;
          padding-bottom:5px;
          .line{
            height:20px;
            padding:2px 0;
            &:first-child{
              padding-top:5px;
            }
            span{
              padding-left:5px;
              font-size:12px;
              color:$m5;
            }
          }
          button{
            border-radius:5px;
          }
          .btn{
            width:120px;
            span{
              width:75%;
            }
            &:hover{
              border:none;
            }
          }
        }
      }
    }
  }
  .section{
    .alert{
      width:100%;
      justify-content: flex-end;
    }
  }
  .modal{
    .box{
      width:80%;
      height:100%;
      flex-direction: column;
      
      .title{
        color:$m2;
        margin-bottom:50px;
        display:flex;
        justify-content: center;
        align-items:center;
        flex-direction: column;
        h1{
          font-size:18px;
        }
        h2{
          font-size:30px;
          color:darken($m2,20%);
          margin-top:20px;
          text-align: center;
        }
        &.mn{
          margin-bottom:20px;
        }
        &.fd{
          flex-direction: column;
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
  height:97%;
  margin:10px 0;
  box-shadow:0 7px 25px rgba(0,0,0,0.08);
  flex-shrink:0;
}
.add-menu{
  width:$add-menu-width;
  height:97%;
  position:fixed;
  right:-$add-menu-width;
  flex-direction: column;
  background-color: white;
  border-left:2px solid #EEEEEE;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  box-shadow:0 7px 25px rgba(0,0,0,0.08);
  margin:10px 0;
  padding:20px;
  box-sizing: border-box;
  transition:0.2s ease;
  .close-btn{
    img{
      width:18px;
      height:18px;
    }
  }
  h1{
    display: block;
    margin:0;
    padding-bottom:5px;
    border-bottom:1px solid black;
  }
  .add-menu-form{
    position:relative;
    height:100%;
    flex-direction: column;
    .menu-img{
      margin:10px 0;
      width:220px;
      height:180px;
      border-radius:15px;
      overflow:hidden;
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
        border-radius:15px;
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
              color:$gray-500;
              border:1px solid $m5;
              background-color:$m5;
              transition: .2s;
              &:focus{
                border:1px solid $m4;
                color:$m4;
              }
              span{
                display:block;
              }
            }
          }
        }
      }
    
    .add-menu-btn{
      position: absolute;
      bottom:0;
    }
  }
}
.open{
  right:0;
}
</style>