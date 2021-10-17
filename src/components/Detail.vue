<template>
  <div
    v-if="detailToggle"
    class="showTable"
    :class="{'order':tableInfo.tableStatus=='INUSE'}">
    <div class="title">
      <div
        v-if="!putToggle"
        class="main">
        <h1>{{ tableInfo.name }}</h1>
        <h5>{{ tableInfo.numberOfPeople }}인석</h5>
      </div>
      <form
        v-if="putToggle"
        @submit="submitPutTable(tableInfo.id)">
        <input
          class="h1"
          v-model="pName"
          :placeholder="tableInfo.name"
          type="text" />
        <input
          class="h5"
          v-model="pNumberOfPeople"
          :placeholder="`${tableInfo.numberOfPeople}인석`"
          type="number" />
        <button
          type="submit"></button>
      </form>
      <div class="sub">
        <button @click="putTable">
          <img
            src="https://raw.githubusercontent.com/iWDNN/temp/master/outline_edit_black_24dp.png"
            alt="" />
        </button>
      </div>
    </div>
    <div class="order-list">
      <h2>
        <span>주문 내역</span>
      </h2>
      <table
        v-if="tableInfo.orders">
        <tr>
          <th>상품명</th>
          <th>수량</th>
          <th>금액</th>
        </tr> 
        <tr
          v-for="menu in tableInfo.orders"
          :key="menu.id">
          <td>{{ menu.name }}</td>
          <td>{{ menu.count }}</td>
          <td>{{ numberWithCommas(menu.orderPrice) }}</td>
        </tr>
      </table>
    </div>
    <div class="request">
      <h2>
        <span>요청사항</span>
      </h2>
      <div class="rq-info fj">
        <div
          class="box"
          :class="{'order':tableInfo.tableStatus=='INUSE'}">
          <span
            v-for="menu in tableInfo.orders"
            :key="menu.id">{{ menu.request }}</span>
        </div>
      </div>
    </div>
    <div class="account">
      <h2 class="label fa">
        <span>합계</span>
      </h2>
      <h2
        v-if="tableInfo.orders"
        class="sum fcc">
        {{ numberWithCommas(tableInfo.totalPrice) }}
      </h2>
    </div>
    <div class="pay fcc">
      <button
        @click="payComp('comp')"
        class="btn">
        계산 완료
      </button>
    </div> 
  </div>
</template>

<script>

import { mapState } from 'vuex' 

export default {
  data(){
    return{
      pName:'',
      pNumberOfPeople:null
    }
  },
  computed:{
  ...mapState('status',[
      'detailToggle',
      'putToggle',
    ]),
    ...mapState('table',[
      'tableInfo'
    ]),
  },
  
  methods:{
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    // 테이블 디테일 호출
    showTableInfo(){
      this.$store.commit('status/updateToggle')
    },
    resetNamePeople(){
      this.pName = ''
      this.pNumberOfPeople = null
    },
    // 테이블 디테일 put
    putTable(){
      this.$store.commit('status/updatePutToggle')
    },
    // 테이블 put 전송
    async submitPutTable(id){
      const data ={
        id,
        form:{
          name:this.pName,
          numberOfPeople:this.pNumberOfPeople
        }
      }
      await this.$store.dispatch('table/putTableInfo',data)
        .then(this.$store.commit('status/updateToggle'))
        .then(this.resetNamePeople)
      
    },
    async payComp(type){
      const data = {
        table: this.tableInfo.id,
        order: this.tableInfo.orders,
        type:type
      }
      await this.$store.dispatch('order/orderTypeChange',data)
      .then(this.$store.commit('status/updateToggle'))
      this.$store.dispatch('table/resetTable',data.table)
    }

  }
}
</script>
<style lang="scss" scoped>
.showTable{
  width:260px;
  height: 97%;
  position:fixed;
  top:0;
  right:0;
  padding:20px 10px;
  box-sizing: border-box;
  background-color:$m5;
  border-left:2px solid #EEEEEE;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  margin:10px 0;
  flex-direction: column;
  &.order{
    background-color:$m2;
    color:$m5;
  }
  .title{
    height:5%;
    display:flex;
    justify-content: space-between;
    .main{
      display:flex;
      flex-direction: column;
      h1{
        font-size:22px;
        margin-bottom:5px;
      }
      h5{
        font-size:14px;
        color:$gray-600;
      }
    }
    form{
      display:flex;
      flex-direction: column;
      padding:0;
      margin:0;
      input{
        width:90%;
        border:none;
        outline:none;
        padding:0;
        margin:0;
        color:$cooking;
      }
      input::placeholder{
        font-weight: 500;
        color:$gray-400;
      }
      .h1{
        font-size:22px;
        margin-bottom:5px;
      }
      .h5{
        font-size:14px;
      }
      button{
        border:none;
        outline:none;
        background-color:$m1;
      }
    }
    .sub{
      button{
        width:30px;
        height:20px;
        margin-right:10px;
        border:none;
        outline:none;
        background-color: $m1;
        img{
          width:100%;
          height:100%;
        }
      }
    }
  }
  .order-list{
    height:50%;
    margin:30px 0;
    overflow:auto;
    h2{
      margin:20px 0; 
      span{
        font-size:15px;
        border-bottom:2px solid $m4;
      }
    }
    table{
      width:100%;
      font-size:15px;
      font-weight: 500;
      tr:first-child{
        text-align: center;
        border-bottom: 1px solid #EEEEEE;
        th{
          font-size:13px;
          padding-top:2px;
          padding-bottom:10px;
        }
      }
      tr{
        font-size:12px;
        td:first-child{
          padding-left:5px;
          text-align: start;
        }
        td{
          text-align: center;
          padding:8px 0;
        }
      }
    }
  }
  .request{
    height:20%;
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
        height:70px;
        background-color:#EEEEEE;
        padding:10px 10px;
        box-sizing: border-box;
        word-break: break-all;
        border-radius:10px;
        overflow: auto;
        opacity: 0.6;
        span:first-child{
          font-size:12px;
        }
        span:not(:first-of-type){
          display:none;
        }
        &.order{
          opacity: 1;
          background-color:$gray-200;
          color:$m2;
        }
      }
    }
  }
  .account{
    display:flex;
    height:4%;
    .label{
      width:50%;
      box-sizing: border-box;
      padding-left:30px;
      span{
        border-bottom:2px solid $m4;
      }
    }
    .sum{
      width:50%;
    }
  }
  .pay{
    width:100%;
    height:10%;
    button{
      width:80%;
      border-radius: 10px;
    }
  }
}
</style>