import axios from 'axios'
import VueCookies from 'vue-cookies'
import router from '~/routes/index.js'

export default {
  namespaced: '',
  state: () => ({
    tableList: []
  }),
  getters: '',
  mutations: '',
  actions: {
    addTableItem() {

    },
    getTableList() {

    }
  }
}

function _fetchTable(type) {
  const OMDB_API_KEY = '7035c60c'
  const page = 2
  const title = 'piano'
  const url = type
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&page=${page}`
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&page=${page}`
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err.message)
      })
  })
}


    // // 테이블
    // fetchCount({ dispatch, commit }, payload) {
    //   axios.post() // 사실은 이렇게 정보를 전송하고 서버에서 변동되면 위의 getCount로 받아오는게 아닌가? 사실 이둘이 묶여야하는게아닌가?
    //     .then()
    //     .catch()
    //   dispatch('getTableInfo') // 이런식으로 완성되고 아래는 임시 커밋은 임시
    //   commit('updateCount', payload) //사실 이렇게만 끝나는게 아니고 테이블갯수를 보내고 그 받아진 값을 get으로 얻어오는 형식이 아닌가..
    // },
    // // 테이블 정보
    // getTableInfo({ commit }) { // 서버에 있는 카운트 정보를 받아와서 사용해야 하는 
    //   axios.get('url')
    //     .then(res => {
    //       console.log(res)
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    //   // let { table } = res.data
    //   // commit('updateTable', table)