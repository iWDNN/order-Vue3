import { createStore } from 'vuex'

//main
import signUp from './signUp'
import login from './login'
import restaurant from './restaurant'
import menu from './menu'
import table from './table'
import order from './order'


//toggle
import status from './status'

export default createStore({
  modules: {
    status,
    signUp,
    login,
    restaurant,
    menu,
    table,
    order
  }
})