<template>
  <div class="menu">
    <div
      class="img"
      :style="{ backgroundImage:`url(${info.Poster})` }"></div>
    <div class="info">
      <div class="name">
        <span>메뉴 이름 : {{ info.Title }}</span>
      </div>
      <div class="desc">
        <span>메뉴 설명 : {{ info.imdbID }}</span>
      </div>
      <div class="price">
        <span>메뉴 가격 : $ {{ info.Year }}</span>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props:{
    info:{
      type:Object,
      default:()=>({})
    }
  },
  methods:{
    
  }
}
</script>
<style lang="scss" scoped>
.menu{
  $div-width:260px;
  margin:18px;
  width:$div-width;
  height:180px;
  background-color:$gray-200;
  box-sizing: border-box;
  // 내부요소
  display:flex;
  flex-direction: column;
  border-radius: 15px;
  overflow: hidden;
  .img{
    width:100%;
    height:58%;
    background-size:cover;
    background-position: center;
  }
  .info{
    width:100%;
    height:42%;
    display:flex;
    flex-direction: column;
    justify-content: center;
    div{
      display: flex;
      align-items: center;
      font-size:12px;
      height:33.33333%;
      span{
        padding:0 10px;
      }
    }
    .name{
      justify-content: flex-start;
      font-weight: 700;
    }
    .desc{
      justify-content: center;
    }
    .price{
      justify-content: flex-end;
    }
  }
}
</style>