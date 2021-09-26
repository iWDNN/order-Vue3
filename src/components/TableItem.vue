<template>
  <div class="t-table">
    <div class="title fcc">
      <span>Table 01</span>
    </div>
    <div class="info">
      <div class="menulist fcc">
        <span>음식이름</span>
        <span>음식이름</span>
        <span>음식이름</span>
      </div>
      <div class="request fcc">
        <span>반반무많이</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.t-table{
  margin:18px;
  width:150px;
  height:160px;
  box-sizing: border-box;
  border-radius:5px;
  //내부요소
  display:flex;
  flex-direction: column;
  overflow:hidden;

  .title{
    width:100%;
    height:23%;
    background-color:skyblue;
    span{
      font-family: 'Oswald',sans-serif;
      font-size:16px;
    }
  }
  .info{
    width:100%;
    height:77%;
    display:flex;
    flex-direction: column;
    background-color:$gray-200;
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