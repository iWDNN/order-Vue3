import axios from 'axios'
import VueCookies from 'vue-cookies'
import router from '~/routes/index.js'

export default {
  namespaced: true,
  state: () => ({
    isLogin: false,
    userInfo: null
  }),
  getters: {
    getisLogin(state) {
      let il = state.isLogin
      return {
        isLogin: il
      }
    }
  },
  mutations: {
    loginSuccess(state, payload) {
      state.isLogin = true
      state.userInfo = payload
    },
    logout(state) {
      state.isLogin = false
      state.userInfo = null
      VueCookies.remove("accessToken")
      // VueCookies.keys().forEach(cookie => this.$cookies.remove(cookie));
    }
  },
  actions: {
    login({ dispatch }, payload) {
      const url = "https://reqres.in/api/login"
      axios.post(url, payload)
        .then(res => {
          let token = res.data.token
          VueCookies.set("accessToken", token, "1d")
          dispatch('getMemberInfo')
          alert('로그인 성공')
        })
        .catch(err => {
          alert('토큰을 얻지 못했습니다')
          console.log(err)
        })
    },
    getMemberInfo({ commit }) {
      const url = "https://reqres.in/api/users/2"
      const token = VueCookies.get("accessToken")
      if (token) {
        let config = {
          headers: {
            "accessToken": token
          }
        }
        axios.get(url, config)
          .then(res => {
            const data = res.data
            commit('loginSuccess', data)
          })
          .catch(err => {
            alert('토큰을 가지고 데이터정보를 요청하는데 실패했습니다')
            console.log(err)
          })
      }
    },
    logOut({ commit }) {
      commit('logout')
      router.go() // 뭔지 모르겠는데 새로고침 안하면 로그인 2번해야 들어가짐
    },
  }
}