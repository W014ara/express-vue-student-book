import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../components/Main.vue";
import Error from "../views/Error.vue";
import AllStudents from "../components/AllStudents.vue";
import ExamType from "../components/ExamType.vue";
import Fails from "../components/Fails.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Main,
    name: "main",
    children: [
      {
        path: "",
        component: AllStudents
      },
      {
        path: "/students",
        component: ExamType
      },
      {
        path: "/fails",
        component: Fails
      }
    ]
  },
  {
    path: "*",
    component: Error,
    name: "error"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
