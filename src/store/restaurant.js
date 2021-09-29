import axios from 'axios'
import VueCookies from 'vue-cookies'

export default {
  namespaced: true,
  state: () => ({
    store: {}
  }),
  getters: '',
  mutations: {
    updateState(state, payload) {
      state.store = payload
    }
  },
  actions: {
    //식당 조회
    async getStore({ commit }) {
      const res = await _fetchStore()
      if (res.data.status == 200) {
        commit('updateState', res.data.data)
        console.log(res.data.data)
      } else {
        alert('식당을 등록해주세요')
      }
    },
    //식당등록
    regRes(context, payload) {
      const actoken = VueCookies.get("accessToken")
      const url = 'http://13.124.45.246:8080/stores'
      console.log(payload)
      if (actoken) {
        let config = {
          'headers': { 'Authorization': `Bearer ${actoken}` }
        }
        axios.post(url, payload, config)
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