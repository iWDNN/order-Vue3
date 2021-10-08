import axios from 'axios'
import VueCookies from 'vue-cookies'
import router from '~/routes/index.js'


export default {
  namespaced: true,
  state: () => ({
    tableList: [],
    tableInfo: {}
  }),
  getters: '',
  mutations: {
    updateTableList(state, payload) {
      state.tableList = payload
    },
    updateTableInfo(state, payload) {
      state.tableInfo = payload
    },
  },
  actions: {
    // 테이블 조회
    async getTableList({ commit }) {
      const res = await _fetchTableList()
      console.log(res.data.data.content)
      if (res.status == 200) {
        commit('updateTableList', res.data.data.content)
      } else {
        alert('데이터를 얻어오지 못했습니다')
      }
    },
    // 테이블 아이디 값으로 찾기
    async searchTableItem({ commit }, payload) {
      const res = await _fetchTableList()
      let data = res.data.data.content
      for (let i = 0; i < data.length; i++) {
        if (data[i].id == payload) {
          commit('updateTableInfo', data[i])
        }
      }

    },
    // 테이블 등록
    regTableItem({ dispatch }, payload) {
      const actoken = VueCookies.get("accessToken")
      const url = 'http://13.124.45.246:8080/tables'
      console.log(payload)
      if (actoken) {
        let config = {
          'headers': { 'Authorization': `Bearer ${actoken}` }
        }
        axios.post(url, payload, config)
          .then(res => {
            if (res.status == 201) {
              dispatch('getTableList')
              alert(res.data.message)
            }
          })
          .catch(err => {
            console.log(err.message)
          })
      } else {
        alert('토큰X')
      }
    },
    // 테이블 수정
    async putTableInfo({ dispatch }, payload) {
      const actoken = VueCookies.get("accessToken")
      const url = `http://13.124.45.246:8080/tables/${payload.id}`
      if (actoken) {
        let config = {
          'headers': { 'Authorization': `Bearer ${actoken}` }
        }
        await axios.put(url, payload.form, config)
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        alert('토큰X')
      }
      dispatch('getTableList')
    }

  }
}
function _fetchTableList(type) { // 나중에 페이지 사이즈 담기
  const actoken = VueCookies.get("accessToken")
  const url = 'http://13.124.45.246:8080/tables?page=0&size=20'
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
