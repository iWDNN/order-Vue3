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


  }
}






