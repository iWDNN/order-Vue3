<template>
  <div
    class="container"
    :style="{ 'margin-left': navWidth}">
    <header class="header fa">
      <div class="add-table">
        <button
          @click="showTableAdd"
          class="add-table-btn fcc">
          <img
            src="https://raw.githubusercontent.com/iWDNN/temp/master/Add-category.png"
            alt="" />
          <span>테이블 추가</span>
        </button>
      </div>
    </header>
    <section class="section">
      <TableItem
        v-for="table in tableList"
        :key="table"
        :table="table" />
    </section>

    <!-- modal modal modal -->

    <div
      v-if="toggle"
      class="modal fcc">
      <button
        class="add-close-btn"
        @click="showTableAdd">
        X
      </button>
      <div class="box fcc">
        <div class="title fcc">
          <h1>테이블을 추가해주세요</h1>
        </div>
        <form
          class="fcc"
          @submit.prevent="submitTableAdd">
          <input
            v-model="name"
            placeholder="테이블명"
            type="text" />
          <input
            v-model="numberOfPeople"
            placeholder="테이블 좌석 수"
            type="number" />
          <button
            class="reg-btn"
            type="submit">
            생성하기
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import TableItem from '~/components/TableItem'
import { mapState } from 'vuex' 

export default {
  mounted(){
    this.$store.dispatch('table/getTableList')
  },
  data(){
    return{
      toggle:false,
      name:'',
      numberOfPeople:null
    }
  },  
  computed:{
    ...mapState('status',[
      'collapsed',
      'navWidth',
    ]),
    ...mapState('table',[
      'tableList'
    ])
  },
  components:{
    TableItem
  },
  methods:{
    showTableAdd(){
      this.toggle = !this.toggle
    },
    submitTableAdd(){
      const data = {
        name:this.name,
        numberOfPeople:this.numberOfPeople
      }
      this.$store.dispatch('table/regTableItem',data)
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  .header{
    justify-content: flex-end;
    .add-table{
      width:160px;
      .add-table-btn{
        width:90%;
        height:35px;
        outline:none;       
        border:1px solid $m2;
        border-radius: 15px;
        background-color:transparent;
        transition: 0.2s linear;
        img{
          width:20px;
          height:20px;
        }
        span{
          font-size:12px;
          margin-left:5px;
        }
        &:hover{
          background-color:$m2;
          color:$m5;
          border:1px solid $m5;
        }
      }
    }
    
  }
  .section{
  }
  .modal{
    border:1px solid $m2;
    background-color: $m5;
    border-radius: 10px;
    .box{
      width:80%;
      height:100%;
      flex-direction: column;
      .title{
        color:$m2;
        margin-bottom:50px;
        font-size:20px;
        font-weight: 700;
      }
      form{
        display: flex;
        flex-direction: column;
        input{
          width:100%;
          height:37px;
          padding-left:10px;
          outline:none;
          border:none;
          border-bottom:2px solid $gray-400;
          &::placeholder{
            color:$gray-400;
          }
          &:hover::placeholder{
            color:$m5;
          }
        }
        .reg-btn{
          display:block;
          margin-top:20px;
          width:90%;
          height:42px;
          border:1px solid $m2;
          border-radius: 15px;
          font-size:13px;
          font-weight: 700;
          background-color:$m2;
          transition:.2s;
          color:$m5;
          opacity: 0.6;
          &:hover{
            background-color:$m1;
            color:$m2;
            border:1px solid $m2;
          }
        }
      }
    }
  }
}
</style>