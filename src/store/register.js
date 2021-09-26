import { registerUser } from '~/api'

export default {
  namespaced: true,
  state: () => ({

  }),
  getters: '',
  mutations: '',
  actions: {
    async regUser(userData) {
      const res = await registerUser(userData)
      console.log(res)
      if (res.status == 201) {
        alert(`${res.message} ${res.data.username}님 환영합니다!`)
      } else {
        alert(`${res.message}`)
      }
    }
  }
}