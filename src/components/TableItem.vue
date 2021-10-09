<template>
  <div
    @click="getTableId(table.id)"
    class="t-table"
    :class="{'in-use': table.tableStatus=='INUSE'}">
    <div
      class="title open fcc">
      <div class="box-one fj">
        <div
          class="name">
          {{ table.name }}
        </div>
        <div
          class="num">
          {{ table.numberOfPeople }}인석
        </div>
      </div>
      <div class="box-two">
        <div class="icon-grp fa">
          <div
            v-if="request"
            class="request fcc">
            <img
              src="https://raw.githubusercontent.com/iWDNN/temp/master/outline_rate_review_black_24dp.png"
              alt="" />
          </div>
        </div>
      </div>
      <!-- <div class="timer">00:01</div> -->
    </div>
    <div class="info">
      <div class="menu-list fa">
        <div
          v-for="menu in table.orders"
          :key="menu.id"
          class="menu-item fa">
          <div class="name fa">
            {{ menu.name }}
          </div>
          <div class="count fa">
            {{ menu.count }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  props:{
    table:{
      type:Object,
      default:()=>({})
    }
  },
  created(){
    this.$store.dispatch('order/getStatus',this.table.orders)
    this.checkRequest(this.table.orders)
  },
  data(){
    return{
      toggle:false,
      count:0,
      request:false
    }
  },
  computed:{
    ...mapState('status',[
      'detailToggle'
    ]),
  },
  methods:{
    getTableId(id){
      console.log(id)
      this.$store.dispatch('table/searchTableItem',id)
      this.$store.commit('status/resetPutToggle')
    },
    checkRequest(orders){
      let count = 0;
      for(let i = 0; i < orders.length;i++){
        if(orders[i].request){
          count = count + 1
          if(count == orders.length)
            this.request = true
        } else{
          this.request = false
        }
      }

    }
    
  }
}
</script>
<style lang="scss" scoped>
.t-table{
  margin:18px;
  width:230px;
  height:135px;
  box-shadow:0 1px 25px rgba(0,0,0,0.08);
  border-radius:5px;
  transition:0.2s ease-in-out;
  //내부요소
  display:flex;
  flex-direction: column;
  overflow:hidden;
  color:$m2;
  &.in-use{
      background-color:$m2;
      color:$m5;
    }
  .title{
    width:100%;
    height:40%;
    flex-shrink: 0;
    border-bottom:1px solid $gray-100;
    // &.open{
    //   background-color:$m2;
    //   color:white;
    // }
    .box-one{
      width:50%;
      height:100%;
      flex-direction: column;
      padding: 5px 7px 0 7px;
      box-sizing:border-box;
      font-weight: 700;
      .name{
        margin-top:2px;
        font-size:15px;
        margin-bottom:5px;
      }
      .num{
        color:$gray-500;
        font-size:12px;
      }
    }
    .box-two{
      width:50%;
      height:100%;
      .icon-grp{
        width:100%;
        height:100%;
        justify-content: flex-end;
        .request{
          margin-right:10px;
          img{
            width:25px;
            height:25px;
          }
        }
      }
    }
  }
  .info{
    width:100%;
    height:55%;
    display:flex;
    flex-direction: column; 
    flex-wrap:wrap;
    flex-shrink: 0;
    box-sizing: border-box;
    // background-color:$m5;
    padding:5px 0;
    .menu-list{
      width:100%;
      padding:0 7px;
      overflow:auto;
      flex-wrap:wrap;
      .menu-item{
        display:flex;
        padding:3px 0;
        width:50%;
        height:12px;
        .name{
          font-weight:600;
          text-align:start;
          font-size:12px;
          width:70%;
        }
        .count{
          width:20%;
          font-size:12px;
          margin-left:5px;
        }
      }
    }
  }
}

</style>