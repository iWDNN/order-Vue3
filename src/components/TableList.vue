<template>
  <div
    class="container"
    :style="{ 'margin-left': navWidth}">
    <header class="header fa">
      <div class="add-table fa">
        <button
          @click="showTableAdd"
          class="btn fcc">
          <img
            src="https://raw.githubusercontent.com/iWDNN/temp/master/Add-category.png"
            alt="" />
          <span>테이블 추가</span>
        </button>
        <!-- <button
          class="btn fcc">
          <img
            src="https://raw.githubusercontent.com/iWDNN/temp/master/outline_delete_black_24dp.png"
            alt="" />
          <span>테이블 삭제</span>
        </button> -->
      </div>
    </header>
    <section class="section">
      <TableItem
        v-for="table in tableList"
        :key="table"
        :table="table"
        @click="showTableInfo" />
    </section>

    <!-- 테이블 추가 모달 -->

    <div
      v-if="addToogle"
      class="modal fcc">
      <button
        class="close-btn"
        @click="showTableAdd">
        X
      </button>
      <div class="box fcc">
        <div class="title fcc">
          <h1>테이블을 추가해주세요</h1>
        </div>
        <form
          class="fcc"
          @submit.prevent="submitTableAdd">
          <input
            v-model="name"
            placeholder="테이블명"
            type="text" />
          <input
            v-model="numberOfPeople"
            placeholder="테이블 좌석 수"
            type="number" />
          <button
            class="reg-btn"
            type="submit">
            생성하기
          </button>
        </form>
      </div>
    </div>
  </div>
  <!-- 테이블 정보 보는 사이드바 -->
  <div
    class="showTable-blank">
    <div class="skeletons fa">
      <div class="skeleton title"></div>
      <div class="skeleton order-list"></div>
      <div class="skeleton request"></div>
      <div class="skeleton pay"></div>
    </div>
  </div>
  <Detail />
</template>

<script>
import TableItem from '~/components/TableItem'
import Detail from '~/components/Detail'
import { mapState } from 'vuex' 

export default {
  created(){
    this.$store.dispatch('table/getTableList')
  },
  data(){
    return{
      addToogle:false,
      name:'',
      numberOfPeople:null,
    }
  },  
  computed:{
    ...mapState('status',[
      'collapsed',
      'navWidth',
      'detailToggle'
    ]),
    ...mapState('table',[
      'tableList',
      'tableInfo'
    ]),
  },
  components:{
    TableItem,
    Detail
  },
  methods:{
    // 테이블 추가 호출
    showTableAdd(){
      this.addToogle = !this.addToogle
    },
    submitTableAdd(){
      const data = {
        name:this.name,
        numberOfPeople:this.numberOfPeople
      }
      this.$store.dispatch('table/regTableItem',data)
        .then(
          this.showTableAdd()
        )
    },
    showTableInfo(){
      this.$store.commit('status/updateToogle')
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  .header{
    justify-content: flex-end;
    .add-table{
      .btn{
        width:90%;
        margin-right:20px;
        padding:0 20px;
        img{
          width:20px;
          height:20px;
        }
        span{
          font-size:12px;
          margin-left:5px;
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
        }
      }
    }
  }
}

.showTable-blank{
  width:260px;
  height:100%;
  flex-shrink: 0;
  
  // .skeletons{
  //   flex-direction: column;
  //   .skeleton{
  //     background-color:$gray-200;
  //     border-radius: 10px;
  //     &.title{
  //       width:30%;
  //       height:5%;     
  //     }
  //     &.order-list{

  //     }
  //     &.request{

  //     }
  //     &.pay{

  //     }
  //   }
  // }
}

</style>