import { createStore } from 'vuex'

//main
import register from './register'
import login from './login'
import menu from './menu'
import table from './table'

//toggle
import status from './status'

export default createStore({
  modules: {
    login,
    menu,
    table,
    register,
    status
  }
})