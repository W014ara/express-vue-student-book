<template>
  <section class="inner">
    <table class="table_dark" v-if="data_loaded === true">
      <tr>
        <th>#</th>
        <th>Краткая запись</th>
        <th>Расшифровка</th>
        <th>Тип сдачи</th>
      </tr>
      <tr v-for="(item, index) in exams_type_lst" :key="index">
        <td>{{ index }}</td>
        <td
          v-for="(property, new_index) in Object.keys(exams_type_lst[0])"
          :key="new_index"
        >
          {{ item[property] }}
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
  name: "ExamType",
  components: {
    Loader
  },
  data: function() {
    return {
      data_loaded: false,
      exams_type_lst: []
    };
  },
  mounted() {
    instance
      .get("journal/type")
      .then(result => {
        this.data_loaded = true;
        this.exams_type_lst = result.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
