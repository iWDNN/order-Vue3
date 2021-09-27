import { computed } from "vue"

export default {
  namespaced: true,
  state: () => ({
    collapsed: true,
    navWidth: 50
  }),
  getters: '',
  mutations: {
    updateState(state) {
      const WIDTH = 50
      const WIDTH_COLLPASED = 200
      state.toggle = !state.toggle

    }
  },

}