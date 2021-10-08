import { computed } from "vue"
import router from '~/routes'
export default {
  namespaced: true,
  state: () => ({
    //css
    collapsed: true,
    navWidth: '50px',
    //toggle
    detailToggle: false,
    putToggle: false,

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
    updateToggle(state) {
      state.detailToggle = !state.detailToggle
    },
    updatePutToggle(state) {
      state.putToggle = true
    },
    resetPutToggle(state) {
      state.putToggle = false
    },
    refreshPage() {
      router.go()
    }

  }
}