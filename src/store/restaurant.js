import axios from 'axios'
import VueCookies from 'vue-cookies'

export default {
  namespaced: true,
  state: () => ({
    store: {}
  }),
  getters: '',
  mutations: {
    updateStore(state, payload) {
      state.store = payload
    },
    resetStore(state) {
      state.store = null
    }
  },
  actions: {
    //식당 조회
    async getStore({ commit }, payload) {
      const actoken = VueCookies.get("accessToken")
      const url = 'http://13.124.45.246:8080/stores'
      if (actoken) {
        let config = {
          'headers': { 'Authorization': `Bearer ${actoken}` }
        }
        await axios.get(url, config)
          .then(res => {
            const data = res.data.data
            commit('updateStore', data)
          })
          .catch(err => {
            commit('resetStore')
          })
      } else {
        alert('토큰X')
      }
    },
    //식당등록
    regRes(context, payload) {
      const actoken = VueCookies.get("accessToken")
      const url = 'http://13.124.45.246:8080/stores'
      if (actoken) {
        let config = {
          'headers': { 'Authorization': `Bearer ${actoken}` }
        }
        axios.post(url, payload, config)
          .then(res => {
            if (res.data.status == 201)
              alert(res.data.message)
          })
          .catch(err => {
            console.log(err.message)
          })
      } else {
        alert('토큰X')
      }
    },
  }
}

function _fetchStore() {
  const actoken = VueCookies.get("accessToken")
  const url = 'http://13.124.45.246:8080/stores'
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
    }
  })
}