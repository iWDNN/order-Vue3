<template>
  <div
    class="showTable">
    <button
      class="close-btn">
      X
    </button>
    <h1>테이블1</h1>
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
export default {
  
}
</script>
<style lang="scss" scoped>
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