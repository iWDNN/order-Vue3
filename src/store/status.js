import { computed } from "vue"

export default {
  namespaced: true,
  state: () => ({
    collapsed: true,
    navWidth: '50px',
  }),
  getters: '',
  mutations: {
    updateState(state) {
      state.collapsed = !state.collapsed
      const WIDTH = 180
      const WIDTH_COLLPASED = 50
      let width = computed(() =>
        `${state.collapsed ? WIDTH_COLLPASED : WIDTH}px`
      )
      state.navWidth = width
    }
  },

}