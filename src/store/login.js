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
      const url = "http://13.124.45.246:8080/users/login"
      axios.post(url, payload)
        .then(res => {
          if (res.data.status == 200) {
            let token = res.data.accessToken
            VueCookies.set("accessToken", token, "1h")
            dispatch('getMemberInfo')
            alert(res.data.message)
          } else
            alert(res.data.message)

          // router.push('/manage')
        })
        .catch(err => {
          alert(err.message)
          console.log(err)
        })
    },
    getMemberInfo({ commit }) {
      let token = VueCookies.get('accessToken')
      if (token) {
        commit('loginSuccess')
        router.push('/manage/table') // 모든 유저 데이터 새로고침이 여기로만 이동함 수정필요..
      }
    },
    async logOut({ commit }) {
      await commit('logout')
      router.push('/login')
    },
  }
}