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
          console.log(res)
          if (res.data.status == 200) {
            let token = res.data.accessToken
            VueCookies.set("accessToken", token, "1d")
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
    getMemberInfo({ commit, dispatch }) {
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
            alert('토큰을 가지고 데이터를 요청하는데 실패했습니다')
            console.log(err)
            dispatch('logOut')
          })
      }
    },
    async logOut({ commit }) {
      await commit('logout')
      router.push('/login')
    },
  }
}