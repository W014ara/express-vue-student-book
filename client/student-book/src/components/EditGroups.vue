<template>
  <section class="inner">
    <table class="table_dark" v-if="data_loaded === true">
      <tr>
        <th>id</th>
        <th>ФИО</th>
        <th>Группа</th>
        <th>Редактировать группу</th>
      </tr>
      <tr v-for="(items, index) in student_data" :key="index">
        <td v-for="item in items" :key="item">
          {{ item }}
        </td>
        <td>
          <select name="" id="" @change="update_students($event)">
            <option selected disabled value="">Выберите новую группу</option>
            <option v-bind:value="`1 ${items.id} ИКБО-06-17`"
              >ИКБО-06-17</option
            >
            <option v-bind:value="`2 ${items.id} ИКБО-07-17`"
              >ИКБО-07-17</option
            >
            <option v-bind:value="`3 ${items.id} ИКБО-09-17`"
              >ИКБО-09-17</option
            >
            <option v-bind:value="`4 ${items.id} ИКБО-11-17`"
              >ИКБО-11-17</option
            >
            <option v-bind:value="`5 ${items.id} ИКБО-12-17`"
              >ИКБО-12-17</option
            >
          </select>
        </td>
      </tr>
    </table>

    <Loader v-else />
  </section>
</template>

<script>
import instance from "../api/instance.js";
import Loader from "../views/Loader";
export default {
  name: "EditGroups",
  components: {
    Loader
  },
  data: function() {
    return {
      data_loaded: false,
      student_data: []
    };
  },
  mounted() {
    instance.get("students/").then(response => {
      if (response.data.length > 0) {
        this.data_loaded = true;
        this.student_data = [...response.data];
      }
    });
  },
  methods: {
    update_students: async function(event) {
      let group_id = event.target.value.split(" ")[0];
      let user_id = event.target.value.split(" ")[1];
      let group_name = event.target.value.split(" ")[2];
      for (let elem of this.student_data) {
        if (elem.id === Number(user_id)) {
          elem.name = group_name;
        }
      }
      instance
        .put("/student", { id: Number(group_id), grId: Number(user_id) })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.inner {
  select {
    appearance: auto;
    margin-top: 0.3em;
  }
  button {
    margin: 0 auto;
    margin-top: 1rem;
    font-size: 0.8rem;
    width: 10rem;
    height: 2rem;
    border: 0.1rem solid #ffffff;
    border-radius: 0.2rem;
    color: white;
    font-family: Roboto;
    box-sizing: border-box;
    transition: 0.5s;
    &:hover {
      background: white;
      color: #24022d;
    }
    &:active {
      outline: none;
    }
    &:focus {
      outline: none;
    }
  }
  .table_dark {
    color: #24022d;
  }
}
</style>
