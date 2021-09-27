import axios from 'axios'

export default {
  namespaced: true,
  state: () => ({

  }),
  getters: '',
  mutations: '',
  actions: {
    async regUser(userData) {
      const url = 'http://13.124.45.246:8080/users'
      console.log(userData)
      axios.post(url, userData)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err.message)
        })

    }
  }
}



function _register(userData) {

  return new Promise((resolve, reject) => {
    axios.post(url, userData)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err.message)
      })
  })
}
