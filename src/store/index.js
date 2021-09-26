import { createStore } from 'vuex'
import register from './register'
import login from './login'
import menu from './menu'
import table from './table'

export default createStore({
  modules: {
    login,
    menu,
    table,
    register
  }
})