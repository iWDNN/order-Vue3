<template>
  <div class="orders">
    <div
      class="title"
      :class="orderStatus">
      <div class="status fcc">
        <span v-if="orderStatus=='order'">주문</span>
        <span v-if="orderStatus=='cook'">조리중</span>
        <span v-if="orderStatus=='cook_comp'">조리<br />완료</span>
      </div>
      <div class="name">
        <div class="table-name fa">
          {{ order.name }}
        </div>
      </div>
      <div class="timer">
      </div>
    </div>
    <div class="info fcc">
      <div class="menu-list">
        <table>
          <tr>
            <th>상품명</th>
            <th>수량</th>
            <!-- <th></th> -->
          </tr>
          <tr
            v-for="item in order.orders"
            :key="item.id">
            <td
              class="fa">
              {{ item.name }}
              <button
                v-show="toggle.showDel"
                @click="menuDelete(item.id)"
                class="menu-delete fcc">
                <img
                  src="https://raw.githubusercontent.com/iWDNN/temp/master/outline_clear_red_24dp.png"
                  alt="" />
              </button>
            </td>
            <td>{{ item.count }}</td>
            <!-- <td>hi</td> -->
          </tr>
        </table>
      </div>
      <div class="request">
        <div class="rq-title fa">
          <span>요청사항</span>
        </div>
        <div class="rq-info fcc">
          <div class="box">
            <span class="content"> 
              <span
                v-for="rq in order.orders"
                :key="rq.id">{{ rq.request }}</span>
            </span>
          </div>
        </div>
      </div>
      <div class="btns fa">
        <div
          v-if="orderStatus=='order'"
          class="line fa">
          <button
            @click="changeStatus('cook')"
            class="btn"
            :class="orderStatus">
            조리시작
          </button>
          <button
            v-if="orderStatus=='order'"
            @click="toggle.showDel=!toggle.showDel"
            :class="{'active':toggle.showDel}"
            class="btn order-del">
            삭제
          </button>
        </div>
        <div
          v-if="orderStatus=='cook'"
          class="line fa">
          <button
            @click="changeStatus('cook_comp')"
            class="btn"
            :class="orderStatus">
            조리완료
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  created(){
    this.$store.dispatch('order/getStatus',this.order.orders)
  },
  props:{
    order:{
      type:Object,
      default:()=>({})
    }
  },
  data(){
    return{
      request:{
      },
      result:[],
      toggle:{
        showDel:false
      }
    }
  },
  computed:{
    ...mapState('order',[
      'orderStatus'
    ])
  },
  methods:{
    changeStatus(type){
      const data = {
        order: this.order.orders,
        type:type
      }
      this.$store.dispatch('order/orderTypeChange',data)
    },
    menuDelete(orders){
      const data = orders
      this.$store.dispatch('order/delOrderMenu',data)
    }
  }
}
</script>
<style lang="scss" scoped>
.orders{
  width:380px;
  height:600px;
  display:flex;
  flex-direction: column;
  margin:33px 11px;
  border-radius: 10px;
  border:1px solid #EEEEEE;
  overflow:hidden;
  font-family: 'roboto',sans-serif;
  box-sizing: border-box;
  flex-shrink: 0;
  .title{
    display:flex;
    height:18%;
    // background-color:rgba(#14A0FA,0.72);
    background-color:$apply;
    padding: 10px 30px;
    box-sizing: border-box;
    color:white;
    &.cook{
      background-color:$cooking;
    }
    &.cook_comp{
      background-color:$gray-400;
    }
    .status{
      width:60px;
      height:60px;
      border:3px solid white;
      border-radius: 50%;
      position:relative;
      span{
        padding-top:1px;
        display:block;
        font-size:20px;
        font-weight: 700;
      }
    }
    .name{
      width:190px;
      display:flex;
      flex-direction: column;
      padding:12px 15px;
      box-sizing: border-box;
      .table-name{
        height:50%;
        font-size:20px;
        font-weight: 700;
      }
      
    }
    .timer{
      width:58px;
      padding-top:18px;
      opacity: 0.7;
      span{
        font-size:16px;
      }
    }
  }
  .info{
    width:100%;
    height:85%;
    flex-direction: column;
    padding:0 37px;
    box-sizing: border-box;
    color:black;
    flex-shrink: 0;
    .menu-list{
      width:100%;
      height:65%;
      padding:16px 0;
      box-sizing:border-box;
      border-bottom: 1px solid #EEEEEE;
      overflow:auto;
      table{
        width:303px;
        font-size:15px;
        font-weight: 500;
        tr:first-child{
          text-align: center;
          border-bottom: 1px solid #EEEEEE;
          th{
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
            .menu-delete{
              width:13px;
              height:13px;
              background-color:$m1;
              border:none;
              margin-left:5px;
              img{
                padding-bottom:2px;
                width:13px;
                height:100%;
              }
            }
          }
        }
      }
    }
    .request{
      width:303px;
      height:108px;
      .rq-title{
        height:38px;
        span{
          margin-left:10px;
          font-size:15px;
          border-bottom: 1px solid black;
        }
      }
      .rq-info{
        height:68px;
        box-sizing: border-box;
        .box{
          width:100%;
          height:60px;
          background-color:#EEEEEE;
          padding:5px;
          box-sizing: border-box;
          word-break:break-all;
          overflow:auto;
          opacity: 0.6;
          .content{          
            span:first-child{
              font-size:13px;
            }
            span:not(:first-of-type){
              display:none;
            }
          }
        }
      }
    }
    .btns{
      width:100%;
      height:10%;
      margin:10px 0;
      justify-content: space-between;
      .line{
        width:100%;
        height:100%;
        margin:10px 0;
        justify-content: space-between;
        .btn{
          border-radius: 10px;
          height:45px;
          font-size:13px;
          font-weight: 700;
          &.order{
            border:1px solid $m5;
            background-color:$apply;
            color:$m5;
          }
          &.cook{
            border:1px solid $m5;
            background-color:$cooking;
            color:$m5;
          }
        }
        .btn.order-del{
          border:1px solid $apply;
          background-color:$m5;
          color:$apply;
          &.active{
            border:1px solid $m5;
            background-color:rgba(#FA1414,0.8);
            color:$m5;
          }
        }
        .btn.cook-del{
          border:1px solid $cooking;
          background-color:$m5;
          color:$cooking;
        }
        .btn.comp-del{
          border:1px solid $gray-400;
          background-color:$m5;
          color:$gray-400;
        }
      }
    }
  }
}
</style>