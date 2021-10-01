import axios from 'axios'
import VueCookies from 'vue-cookies'
import router from '~/routes/index.js'

export default {
  namespaced: true,
  state: () => ({
    allMenu: []
  }),
  getters: '',
  mutations: {
    //메뉴
    updateMenuList(state, payload) {
      state.allMenu = payload
    },
    resetMenuList(state) {
      state.allMenu = []
    },

  },
  actions: {
    resetMenuList({ commit }) {
      commit('resetMenuList')
    },
    // 메뉴

    // 메뉴 전체 조회
    async getMenuList({ commit }) {
      const res = await _fetchAllItems() // 요청
      const menu = res.data.data
      commit('updateMenuList', menu) // 스테이트변수에 데이터 저장
    },

    // 메뉴 추가
    async addMenuItem({ dispatch }, payload) {
      const actoken = VueCookies.get("accessToken")
      const url = 'http://13.124.45.246:8080/items'
      console.log(payload)
      if (actoken) {
        let config = {
          'headers': { 'Authorization': `Bearer ${actoken}` }
        }
        await axios.post(url, payload, config)
          .then(res => {
            console.log(res)
            if (res.data.status == 201)
              alert(res.data.message)
          })
          .catch(err => {
            console.log(err.message)
          })
      } else {
        alert('토큰X')
      }
      dispatch('getMenuList')
    },


    // 카테고리

    // 메뉴 카테고리 추가
    async regCategory({ dispatch }, payload) {
      const actoken = VueCookies.get("accessToken")
      const url = 'http://13.124.45.246:8080/categories'
      console.log(payload)
      if (actoken) {
        let config = {
          'headers': { 'Authorization': `Bearer ${actoken}` }
        }
        await axios.post(url, payload, config)
          .then(res => {
            console.log(res)
            if (res.data.status == 201)
              alert(res.data.message)
          })
          .catch(err => {
            console.log(err.message)
          })
      } else {
        alert('토큰X')
      }
      dispatch('getMenuList')
    },
    // 메뉴 카테고리 변경
    async chgCategory({ dispatch }, payload) {
      const actoken = VueCookies.get("accessToken")
      const url = `http://13.124.45.246:8080/categories/${payload.categoryId}`
      const data = {
        name: payload.name
      }
      if (actoken) {
        let config = {
          'headers': { 'Authorization': `Bearer ${actoken}` }
        }
        await axios.put(url, data, config)
          .then(res => {
            console.log(res)
            if (res.data.status == 200)
              alert(res.data.message)
          })
          .catch(err => {
            console.log(err.message)
          })
      } else {
        alert('토큰X')
      }
      dispatch('getMenuList')
    },
    // 메뉴 카테고리 제거
    async delCategory({ dispatch }, payload) {
      const actoken = VueCookies.get("accessToken")
      const url = `http://13.124.45.246:8080/categories/${payload.categoryId}`
      if (actoken) {
        let config = {
          'headers': { 'Authorization': `Bearer ${actoken}` }
        }
        await axios.delete(url, config)
          .then(res => {
            console.log(res)
            if (res.data.status == 200)
              alert(res.data.message)
          })
          .catch(err => {
            console.log(err.message)
          })
      } else {
        alert('토큰X')
      }
      dispatch('getMenuList')
    },
  }
}



// 메뉴 데이터 호출//

function _fetchAllItems() {
  const actoken = VueCookies.get("accessToken")
  const url = 'http://13.124.45.246:8080/categories/items'
  return new Promise((resolve, reject) => {
    if (actoken) {
      let config = {
        'headers': { 'Authorization': `Bearer ${actoken}` }
      }
      axios.get(url, config)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err.message)
        })
    } else {
      alert('토큰이 없습니다')
    }
  })
}



