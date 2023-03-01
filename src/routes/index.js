import { createRouter, createWebHashHistory } from "vue-router";
import VueCookies from "vue-cookies";
import store from "~/store";
// main
import Management from "./Management";
import Login from "./Login";
import SignUp from "./SignUp";

// children
import Main from "~/components/Main";
import MenuList from "~/components/MenuList";
import TableList from "~/components/TableList";
import OrderList from "~/components/OrderList";

export default createRouter({
  history: createWebHashHistory(),
  scrollBehavior() {
    return {
      top: 0,
    };
  },
  routes: [
    {
      path: "/",
      beforeEnter: (to, from, next) => {
        let isLoginObj = store.getters["login/getisLogin"];
        if (isLoginObj.isLogin) {
          next({ path: "/manage" });
        } else {
          next({ path: "/login" });
        }
      },
    },
    {
      path: "/login",
      component: Login,
      beforeEnter: (to, from, next) => {
        let actoken = VueCookies.get("accessToken");
        if (actoken) {
          next({ path: "/manage/main" });
        } else {
          next();
        }
      },
    },
    {
      path: "/sign_up",
      component: SignUp,
    },
    {
      path: "/manage",
      component: Management,
      beforeEnter: (to, from, next) => {
        let isLoginObj = store.getters["login/getisLogin"];
        if (isLoginObj.isLogin) {
          next();
        } else {
          next({ path: "/login" });
        }
      },
      children: [
        {
          path: "main",
          component: Main,
        },
        {
          path: "menu",
          component: MenuList,
        },
        {
          path: "table",
          component: TableList,
        },
        {
          path: "order",
          component: OrderList,
        },
      ],
    },
  ],
});
