import axios from 'axios'
import VueCookies from 'vue-cookies'
import router from '~/routes'

export default {
  namespaced: true,
  state: () => ({

  }),
  getters: '',
  mutations: '',
  actions: {
    // 유저등록
    regUser(context, payload) {
      const url = 'http://13.124.45.246:8080/users'
      axios.post(url, payload)
        .then(res => {
          if (res.data.status == 201) {
            alert(res.data.message)
            router.push('/login')
          } else {
            alert(res.data.message)
          }
        })
        .catch(err => {
          console.log(err)
          alert('회원가입에 실패했습니다')
        })
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
    }
  }
}



