import axios from 'axios'
import VueCookies from 'vue-cookies'
import router from '~/routes/index.js'

export default {
  namespaced: true,
  state: () => ({
    allMenu: [],
    sectionMenu: [],

    mnChangeAlert: false,
    mnChangeId: null,

    mnDeleteAlert: false,
    mnDeleteId: null,
    mnDeleteName: ''

  }),
  getters: '',
  mutations: {
    //메뉴
    updateMenuList(state, payload) {
      state.allMenu = payload
    },
    updateSectionMenu(state, payload) {
      state.sectionMenu = payload
    },
    resetSectionMenu(state) {
      state.sectionMenu = []
    },
    updateChangeAlert(state) {
      state.mnChangeAlert = true
    },
    updateChangeId(state, payload) {
      state.mnChangeId = payload
    },
    updateDeleteAlert(state) {
      state.mnDeleteAlert = true
    },
    updateDeleteId(state, payload) {
      state.mnDeleteId = payload.id
      state.mnDeleteName = payload.name
    },
    resetAlert(state) {
      state.mnChangeAlert = false
      state.mnChangeId = null
      state.mnDeleteAlert = false
      state.mnDeleteId = null
      state.mnDeleteName = ''
    }

  },
  actions: {
    resetMenuList({ commit }) {
      commit('resetMenuList')
    },
    // 메뉴

    // 카테고리 메뉴 전체 조회
    async getMenuList({ state, commit }, payload) {
      commit('resetSectionMenu')
      const res = await _fetchAllItems() // 요청
      const menu = res.data.data
      //카테고리 별 메뉴 조회
      if (payload) {
        for (let i = 0; i < menu.length; i++) {
          if (menu[i].id == payload) {
            commit('updateSectionMenu', menu[i].items)
          }
        }
      } else {
        for (let i = 0; i < menu.length; i++) {
          for (let j = 0; j < menu[i].items.length; j++) {
            commit('updateSectionMenu', [...state.sectionMenu, menu[i].items[j]])
          }
        }
      }
      commit('updateMenuList', menu) // 스테이트변수에 데이터 저장

    },

    // 카테고리

    // 카테고리 추가
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
    // 카테고리 변경
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
    // 카테고리 제거
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
    // 메뉴

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
    // 메뉴 수정
    async chgMenuItem({ dispatch }, payload) {
      const actoken = VueCookies.get("accessToken")
      const url = `http://13.124.45.246:8080/items/${payload.id}`
      const data = payload.formData
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
    // 메뉴 제거
    async delMenuItem({ dispatch }, payload) {
      const actoken = VueCookies.get("accessToken")
      const url = `http://13.124.45.246:8080/items/${payload.itemsId}`
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



