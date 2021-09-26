import { createRouter, createWebHashHistory } from 'vue-router'

// main
import Management from './Management'
import Login from './Login'
import SignUp from './SignUp'

// children
import Main from '~/components/Main'
import MenuList from '~/components/MenuList'
import TableList from '~/components/TableList'
import OrderList from '~/components/OrderList'


export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/sign_up',
      component: SignUp
    },
    {
      path: '/manage',
      component: Management,
      children: [
        {
          path: 'main',
          component: Main
        },
        {
          path: 'menu',
          component: MenuList
        },
        {
          path: 'table',
          component: TableList
        },
        {
          path: 'order',
          component: OrderList
        },
      ]
    }
  ]
})