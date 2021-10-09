<template>
  <div
    class="container"
    :style="{ 'margin-left': navWidth}">
    <header class="header">
      <div class="o-nav">
        <div class="order-status">
          주문목록<span>{{ orderList.length }}</span>건
        </div>
        <button
          @click="getTypeList('ORDER')"
          class="apply">
          접수대기
        </button>
        <button 
          @click="getTypeList('COOK')"
          class="cooking">
          조리중
        </button>
        <button 
          @click="getTypeList('COOK_COMP')"
          class="complete">
          조리완료
        </button>
      </div>
    </header>
    <section class="section no-wrap">
      <OrderItem
        v-for="order in orderList"
        :key="order.id"
        :order="order" />
    </section>
  </div>
</template>

<script>
import OrderItem from '~/components/OrderItem'
import { mapState } from 'vuex'
export default {
  created(){
    this.$store.dispatch('order/getTypeOrders','ORDER')
  },
  components:{
    OrderItem
  },
  computed:{
    ...mapState('status',[
      'collapsed',
      'navWidth',
    ]),
    ...mapState('order',[
      'orderList'
    ])
  },
  methods:{
    async getTypeList(orderList){
      await this.$store.commit('order/resetOrderList')
      this.$store.dispatch('order/getTypeOrders',orderList)
    }
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
        height:100%;
        margin:0 20px;
        border:none;
        outline:none;
        font-size:12px;
        background-color:transparent;
        &:hover{
          border-bottom:2px solid $m4;
        }
        &:focus{
          font-weight:700;
          border-bottom:2px solid $m4;
        }
      }
      .order-status{
        margin: 0 50px;
        font-size:15px;
        display: flex;
        align-items: center;
        span{
          font-weight: 600;
          padding:0 5px 0 5px;
          font-size:23px;
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
