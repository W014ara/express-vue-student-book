import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../components/Main.vue";
import Error from "../views/Error.vue";

Vue.use(VueRouter);

const routes = [
  {
    path:"/",
    component:Main,
    name:"main",
  },
  {
    path:"*",
    component:Error,
    name:"error"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
