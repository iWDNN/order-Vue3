import { computed } from "vue"

export default {
  namespaced: true,
  state: () => ({
    //css
    collapsed: true,
    navWidth: '50px',
    //toggle
    detailToggle: false
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
    },
    updateToogle(state) {
      state.detailToggle = !state.detailToggle
    }
  }
}