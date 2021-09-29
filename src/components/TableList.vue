<template>
  <div
    class="container"
    :style="{ 'margin-left': navWidth}">
    <header class="header fa">
      <div class="add-table">
        <button
          @click="showTableAdd"
          class="add-table-btn fcc">
          <img
            src="https://raw.githubusercontent.com/iWDNN/temp/master/Add-category.png"
            alt="" />
          <span>테이블 추가</span>
        </button>
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
        class="add-close-btn"
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
  </div>
  <div
    v-if="detailToggle"
    class="showTable">
    <button
      class="close-btn">
      X
    </button>
    <h1>{{ tableInfo.name }}</h1>
    <div class="order-list">
      <h2>
        <span>주문 내역</span>
      </h2>
      <table>
        <tr>
          <th>상품명</th>
          <th>수량</th>
          <th>금액</th>
        </tr>
        <tr>
          <td>에그 필라프</td>
          <td>1</td>
          <td>19,900</td>
        </tr>
        <tr>
          <td>스테이크</td>
          <td>2</td>
          <td>15,500</td>
        </tr>
      </table>
    </div>
    <div class="request">
      <h2>
        <span>요청사항</span>
      </h2>
      <div class="rq-info fj">
        <div class="box">
          <span>asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf</span>
        </div>
      </div>
    </div>
    <div class="account">
      <h2 class="label">
        합계
      </h2>
      <h2 class="sum">
        50,900
      </h2>
    </div>
    <div class="pay fcc">
      <button>결제</button>
    </div> 
  </div>
</template>

<script>
import TableItem from '~/components/TableItem'
import { mapState } from 'vuex' 

export default {
  mounted(){
    this.$store.dispatch('table/getTableList')
  },
  data(){
    return{
      addToogle:false,
      infoToogle:false,
      name:'',
      numberOfPeople:null
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
    TableItem
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
    // 테이블 디테일 호출
    showTableInfo(){
      this.$store.commit('status/updateToogle')
    },
  }
}
</script>

<style lang="scss" scoped>
.container{
  .header{
    justify-content: flex-end;
    .add-table{
      width:160px;
      .add-table-btn{
        width:90%;
        height:35px;
        outline:none;       
        border:1px solid $m2;
        border-radius: 15px;
        background-color:transparent;
        transition: 0.2s linear;
        img{
          width:20px;
          height:20px;
        }
        span{
          font-size:12px;
          margin-left:5px;
        }
        &:hover{
          background-color:$m2;
          color:$m5;
          border:1px solid $m5;
        }
      }
    }
    
  }
  .section{
  }
  .modal{
    border:1px solid $m2;
    background-color: $m5;
    border-radius: 10px;
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

.showTable-blank{
  width:260px;
  height:100%;
  flex-shrink: 0;
}
.showTable{
  width:260px;
  height: 100%;
  position:fixed;
  top:0;
  right:0;
  padding:20px 10px;
  box-sizing: border-box;
  border-left:2px solid #EEEEEE;
  flex-direction: column;
  h1{
    font-size:22px;
  }
  .order-list{
    margin:30px 0;
    h2{
      margin:20px 0; 
      span{
        font-size:15px;
        border-bottom:1px solid $m4;
      }
    }
    table{

    }
  }
  .request{
    margin:30px 0;
    h2{
      margin:20px 0; 
      span{
        font-size:15px;
        border-bottom:1px solid $m4;
      }
    }
    .rq-info{
      box-sizing: border-box;
      .box{
        width:100%;
        height:60px;
        background-color:#EEEEEE;
        padding:10px 10px;
        box-sizing: border-box;
        word-break: break-all;
        overflow: auto;
        opacity: 0.6;
        span{
          font-size:14px;
          font-weight: 300;
        }
      }
    }
  }
  .account{
    display:flex;
    .label{
      width:50%;
    }
    .sum{
      width:50%;
    }
  }
  .pay{
    width:100%;
    button{

    }
  }
}
</style>