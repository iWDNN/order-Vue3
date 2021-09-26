<template>
  <div class="order">
    <div class="title">
      <div class="status fcc">
        <span>접수</span>
      </div>
      <div class="name">
        <div class="table-name fa">
          테이블 1
        </div>
        <div class="change fa">
          수정
        </div>
      </div>
      <div class="timer">
        <span>+ 00:28</span>
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
          <OrderMenuItem />
          <OrderMenuItem />
          <OrderMenuItem />
          <OrderMenuItem />
          <OrderMenuItem />
          <OrderMenuItem />
          <OrderMenuItem />
        </table>
      </div>
      <div class="request">
        <div class="rq-title fa">
          <span>요청사항</span>
        </div>
        <div class="rq-info fj">
          <div class="box">
            <span>asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf</span>
          </div>
        </div>
      </div>
      <div class="btns">
        <div class="btn fcc">
          <button>삭제</button>
          <button>조리시작</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import OrderMenuItem from '~/components/OrderMenuItem'
export default {
  components:{
    OrderMenuItem
  }
}
</script>
<style lang="scss" scoped>
.order{
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
    background-color:rgba(#14A0FA,0.72);
    padding: 10px 30px;
    box-sizing: border-box;
    color:white;
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
      .change{
        height:50%;
        font-size:16px;
        padding-top:6px;
        opacity: 0.7;
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
      }
    }
    .request{
      width:303px;
      height:25%;
      .rq-title{
        height:30%;
        span{
          padding-left:10px;
          font-size:15px;
          border-bottom: 1px solid black;
        }
      }
      .rq-info{
        height:90%;
        box-sizing: border-box;
        .box{
          width:100%;
          height:60%;
          background-color:#EEEEEE;
          padding:15px 11px;
          box-sizing: border-box;
          word-break:break-all;
          overflow:auto;
          opacity: 0.6;
          span{
            font-size:14px;
            font-weight: 300;
          }
        }
      }
    }
    .btns{
      width:100%;
      height:10%;
      .btn{
        display:flex;
        justify-content: space-between;
        align-items: center;
        button{
          outline:none;
          width:140px;
          height:45px;
        }
        button:first-child{
          background-color:white;
          border:1px solid #14A0FA;
          color:#14A0FA;
        }
        button:last-child{
          background-color:#14A0FA;
          border:1px solid white;
          color:white;
        }
      }
    }
  }
}
</style>