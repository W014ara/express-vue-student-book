import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../components/Main.vue";
import Error from "../views/Error.vue";
import AllStudents from "../components/AllStudents.vue";
import ExamType from "../components/ExamType.vue";
import Fails from "../components/Fails.vue";
import EditGroups from "../components/EditGroups.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Main,
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
      },
      {
        path: "/editgroup",
        component: EditGroups
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
