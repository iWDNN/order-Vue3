import axios from 'axios'
import VueCookies from 'vue-cookies'
import router from '~/routes/index.js'

export default {
  namespaced: true,
  state: () => ({
    menuList: []
  }),
  getters: '',
  mutations: {
    //메뉴
    updateMenuList(state, payload) {
      state.menuList = payload
    },
    resetMenuList(state) {
      state.menuList = []
    },

  },
  actions: {
    resetMenuList({ commit }) {
      commit('resetMenuList')
    },
    // get
    async getMenuList({ commit }, type) {
      const res = await _fetchMenu(type) // 요청
      const { Search } = res.data // 객체 분해 해서 데이터값 저장 
      commit('updateMenuList', Search) // 스테이트변수에 데이터 저장
      // console.log(Search)
    },

    // post
    async postMenuItem({ dispatch, commit }, payload) {
      const res = await _requestMenu(payload)
      const { status, message, data } = res
      commit('updateState', {
        menuItem: data, // 이 데이터를 그대로 가져가서 합치는건가 ?
        message,
        status
      })
      dispatch('getMenuList')
    }
  }
}



// 메뉴 데이터 호출//

function _fetchMenu(type) {
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

function _requestMenu(payload) {
  const url = ""
  return new Promise((resolve, reject) => {
    axios.post(url, payload)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err.message)
      })
  })
}



// updateState(state, payload) {
  //   //Object keys 사용시 바뀌는 객체에서 배열 - >  ['movies', 'message', 'loading']
  //   Object.keys(payload).forEach(key => {
  //     state[key] = payload[key]// state.movies = payload.movies state['movies'] = payload['movies']

  //   }) // 속성의 이름들만 가지고 객체데이터를 배열로 만들어줌
  // }