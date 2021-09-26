<template>
  <div class="container">
    <header class="header">
      <div class="o-nav">
        <div class="order-status">
          주문접수<span> 6 </span>건
        </div>
        <button class="apply">
          접수
        </button>
        <button class="cooking">
          조리중
        </button>
        <button class="complete">
          조리완료
        </button>
      </div>
    </header>
    <section class="section no-wrap">
      <OrderItem />
      <OrderItem />
      <OrderItem />
      <OrderItem />
      <OrderItem />
      <OrderItem />
      <OrderItem />
    </section>
  </div>
</template>

<script>
import OrderItem from '~/components/OrderItem'
export default {
  components:{
    OrderItem
  }
}
</script>

<style lang="scss" scoped>
.container{
  .header{
    .o-nav{
      display:flex;
      align-items: center;
      button{
        margin:0 20px;
        border:none;
        outline:none;
        font-size:12px;
        background-color:transparent;
      }
      .order-status{
        margin: 0 50px;
        font-size:15px;
        display: flex;
        align-items: center;
        span{
          padding:0 5px;
          font-size:20px;
        }
      }
      .apply{
      }
      .cooking{
      }
      .complete{
      }
    }
  }
  .section{
    .order:first-child{
      margin-left:15px;
    }
  }
  .no-wrap{
  flex-wrap:nowrap;
  overflow: auto;

}
}
</style>
