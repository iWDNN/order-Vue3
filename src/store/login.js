import axios from 'axios'
import VueCookies from 'vue-cookies'
import router from '~/routes/index.js'
import store from '~/store'

export default {
  namespaced: true,
  state: () => ({
    isLogin: false,
    userInfo: {}
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
    loginSuccess(state) {
      state.isLogin = true
    },
    updateUserInfo(state, payload) {
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
    // 로그인 요청
    async login({ dispatch, commit }, payload) {
      const url = "http://13.124.45.246:8080/users/login"
      await axios.post(url, payload)
        .then(res => {
          if (res.data.status == 200) {
            let token = res.data.accessToken
            VueCookies.set("accessToken", token, "1h")
            commit('loginSuccess')
            router.push('/manage/main')
            alert(res.data.message)
            window.addEventListener('DOMContentLoaded', function () {
              console.log('DOMContentLoaded');
            })
          } else
            alert(res.data.message)
          // router.push('/manage')
        })
        .catch(err => {
          alert(err.message)
          console.log(err)
        })
    },
    // 로그인 상태 조회
    getLogin({ commit }) {
      let token = VueCookies.get('accessToken')
      if (token) {
        commit('loginSuccess')
      }
    },
    // 유저 정보 조회
    async getMemberInfo({ commit }) {
      const actoken = VueCookies.get("accessToken")
      const url = 'http://13.124.45.246:8080/users'
      if (actoken) {
        let config = {
          'headers': { 'Authorization': `Bearer ${actoken}` }
        }
        await axios.get(url, config)
          .then(res => {
            const data = res.data.data
            commit('updateUserInfo', data)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        alert('토큰X')
      }
    },
    async logOut({ commit }) {
      await commit('logout')
      await store.commit('restaurnt/resetStore')
      router.go()
      router.push('/login')

    },
  }
}