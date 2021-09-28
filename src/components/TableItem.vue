<template>
  <div
    class="t-table">
    <div class="title fcc">
      <div class="status">
        {{ table.tablestatus }}
      </div>
      <div
        class="num">
        {{ table.numberOfPeople }}인용
      </div>
      <div
        class="name">
        {{ table.name }}
      </div>
      <!-- <div class="timer">00:01</div> -->
    </div>
    <div class="info">
      <div class="menulist fcc">
        <div
          class="menuItem"
          v-for="menu in table.orders"
          :key="menu">
          <span>이름 : {{ menu.name }}&nbsp;&nbsp;&nbsp;</span>
          <span>개수 : {{ menu.count }}</span>
        </div>
      </div>
      <div class="request fcc">
        <div
          class="menuItem"
          v-for="menu in table.orders"
          :key="menu">
          <span>{{ menu.request }}&nbsp;&nbsp;&nbsp;</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    table:{
      type:Object,
      default:()=>({})
    }
  },
  data(){
    return{
      toggle:false
    }
  },
  methods:{
    showTableInfo(){
      this.toggle = !this.toggle
    }
  }
}
</script>
<style lang="scss" scoped>
.t-table{
  margin:18px;
  width:150px;
  height:160px;
  box-shadow: 0 3px lighten($m4,80%);
  border-radius:5px;
  //내부요소
  display:flex;
  flex-direction: column;
  overflow:hidden;

  .title{
    width:100%;
    height:35%;
    background-color:$gray-300;
    font-weight: 700;
    .num{
      font-size:12px;
    }
    .name{
      font-size:14px;
    }
    button{
      border:none;
      outline:none;
      background-color: $m1;
    }
  }
  .info{
    width:100%;
    height:77%;
    display:flex;
    flex-direction: column;
    background-color:$m5;
    .menulist{
      height:80%;
      flex-direction: column;
      span{
        font-size:12px;
      }
    }
    .request{
      height:20%;
      span{
        font-size:12px;
      }
    }
  }
}

</style>