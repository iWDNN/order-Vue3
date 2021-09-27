<template>
  <div class="container">
    <header class="header">
      <button>테이블 추가</button>
    </header>
    <section class="section">
      <!-- <TableItem
        v-for="table in tableCount"
        :key="table" /> -->
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
    // TableItem
  },
  // computed:{
  //   ...mapState('table',[
  //     'tableCount'
  //   ])
  // },
  methods:{
    
  }
}
</script>

<style lang="scss" scoped>
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