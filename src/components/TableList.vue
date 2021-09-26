<template>
  <div class="container">
    <div
      v-if="!tableCount"
      class="modal ct-modal">
      <div class="title">
        테이블 개수 입력
      </div>
      <form class="fcc">
        <label
          for="count">개수 : </label>
        <input
          v-model="count"
          id="count"
          class="fcc"
          type="number" />
        <button @click="submitCount">
          확인
        </button>
      </form>
    </div>
    <header class="header">
      <button
        @click="reset"
        class="reset-count-box">
        테이블 개수 리셋
      </button>
      <button
        class="logout">
        로그아웃
      </button>
    </header>
    <section class="section">
      <TableItem
        v-for="table in tableCount"
        :key="table" />
    </section>
  </div>
</template>

<script>
import TableItem from '~/components/TableItem'
import { mapState } from 'vuex' 

export default {
  data(){
    return{
      count:0
    }
  },
  components:{
    TableItem
  },
  computed:{
    ...mapState('table',[
      'tableCount'
    ])
  },
  methods:{
    submitCount(){
      let count = this.count
      this.$store.dispatch('table/fetchCount',count)
    },
    reset(){
      this.$store.commit('table/resetCount')
    }
  }
}
</script>

<style lang="scss" scoped>
.ct-modal{
  display: flex;
  flex-direction: column;
  justify-content: center;
  .title{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height:30%;
    padding-left:20px;
    border-bottom:1px solid $gray-200;
  }
  form{
    height:70%;   
    input{
      border:none;
      outline:none;
      width:40px;
      height:40px;
      font-size:13px;
    }
    button{
      border:none;
      outline:none;
    }
  }
}
.container{
  .header{
    justify-content: flex-end;
    button{
      cursor:pointer;
      outline:none;
      border:none;
      margin-right:20px;
      background-color:transparent;
    }
  }
  .section{
  }
}
</style>