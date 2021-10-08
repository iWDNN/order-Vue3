import axios from 'axios'
import VueCookies from 'vue-cookies'
import router from '~/routes/index.js'
import store from '~/store/index.js'

export default {
  namespaced: true,
  state: () => ({
    orderList: [],
    orderStatus: ''
  }),
  getters: '',
  mutations: {
    updateOrderList(state, payload) {
      state.orderList = payload
    },
    updateOrderReq(state, payload) {
      state.orderReq = payload
    },
    resetOrderList(state) {
      state.orderList = []
    },
    updateOrderStatus(state, payload) {
      state.orderStatus = payload
    }

  },
  actions: {
    async getTypeOrders({ state, commit }, payload) {
      commit('resetOrderList')
      const res = await _fetchOrderList()
      const data = res.data.data.content
      for (let i = 0; i < data.length; i++) { // 테이블 갯수만큼 돌리기
        if (data[i].orders.length !== 0) { // 주문이 들어있는 테이블로 나누기
          let count = 0
          for (let j = 0; j < data[i].orders.length; j++) { // 테이블 안의 주문수만큼 돌리기
            if (data[i].orders[j].orderStatus == payload) { // 테이블 안의 주문상태가 페이로드와 일치하는지 나누기
              count = count + 1
              if (count == (data[i].orders.length)) { // 그 주문의 길이와 카운트가 일치할때
                console.log('?')
                commit('updateOrderList', [...state.orderList, data[i]]) // 그 테이블의 상태를 페이로드타입이라 판단하여 그 테이블의 주문만 넘기기
              }
            }
          }
        }
      }
    },

    async orderTypeChange({ dispatch }, payload) {
      const actoken = VueCookies.get("accessToken")
      const orders = payload.order
      let config = {
        'headers': { 'Authorization': `Bearer ${actoken}` }
      }
      const data = {
        ids: []
      }
      for (let i = 0; i < orders.length; i++) {
        data.ids.push({ id: orders[i].id })
      }
      const url = `http://13.124.45.246:8080/orders/${payload.type}`
      await axios.post(url, data, config)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      dispatch('getTypeOrders')
    },
    getStatus({ commit }, payload) {
      let count = 0
      for (let i = 0; i < payload.length; i++) {
        if (payload[i].orderStatus == 'ORDER') {
          count = count + 1
          if (count == payload.length) {
            commit('updateOrderStatus', 'order')
          }
        }
        if (payload[i].orderStatus == 'COOK') {
          count = count + 1
          if (count == payload.length) {
            commit('updateOrderStatus', 'cook')
          }
        }
        if (payload[i].orderStatus == 'COOK_COMP') {
          count = count + 1
          if (count == payload.length) {
            commit('updateOrderStatus', 'cook_comp')
          }
        }
      }
    },
    async delOrderMenu({ dispatch }, payload) {
      let id = payload
      const actoken = VueCookies.get("accessToken")
      let config = {
        'headers': { 'Authorization': `Bearer ${actoken}` }
      }
      const url = `http://13.124.45.246:8080/orders/${id}/cancel`
      await axios.post(url, null, config)
        .then(res => {
          console.log(res)
          router.go()
        })
        .catch(err => {
          console.log(err)
        })
      dispatch('getTypeOrders')
    }
  }
}

function _fetchOrderList(type) { // 나중에 페이지 사이즈 담기
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
