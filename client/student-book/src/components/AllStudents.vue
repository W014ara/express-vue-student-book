<template>
  <section class="inner">
    <div class="inner-content">
      <v-data-table
        :headers="headers"
        :items="filter_lst"
        class="table_dark"
        v-if="data_loaded === true"
      >
        <template v-slot:item="props">
          <tr>
            <td
              v-for="(elem, property) in props.item"
              :key="property"
              v-bind:class="{
                badly:
                  props.item[property] === 'Неудовлетворительно' ||
                  props.item[property] === 'Незачет' ||
                  props.item[property] === 'Неявка'
              }"
            >
              {{ props.item[property] }}
            </td>
          </tr>
        </template>
      </v-data-table>
      <Loader v-else />
    </div>
  </section>
</template>

<script>
import instance from "../api/instance.js";
import Loader from "../views/Loader";
import Functions from "../api/allstudents";

export default {
  name: "AllStudents",
  components: {
    Loader
  },
  data: function() {
    return {
      data_loaded: false,
      headers: [],
      filter_lst: []
    };
  },
  mounted() {
    instance
      .get("journal/all")
      .then(result => {
        if (result.data.length > 0) {
          this.data_loaded = true;
          let tmp = [...result.data];
          this.filter_lst = this.createFinalData(
            result.data,
            this.getSubjects(tmp)
          );
          this.headers = Object.keys(this.filter_lst[0]);
          this.headers = this.headers.map(elem => {
            return {
              text: elem,
              value: elem
            };
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    //Получение списка предметов
    getSubjects: function(data) {
      let tmp_res = [];
      for (let index = 0; index < data.length; index++) {
        tmp_res.push(data[index].short_name);
      }
      let result = [...new Set(tmp_res)];
      return result;
    },
    //Получение конечных данных для отображения на экране
    createFinalData: function(data, subjects) {
      let result = [];
      for (let index = 0; index < data.length; index++) {
        let new_elem = {
          id: data[index].student_id,
          ФИО: `${data[index].surname} ${data[index].student_name} ${data[index].second_name}`,
          Группа: data[index].group_name
        };
        for (let subj of subjects) {
          if (data[index].short_name === `${subj}`) {
            new_elem[`${subj}`] = data[index].mark_name;
          } else {
            new_elem[`${subj}`] = "-";
          }
        }
        result.push(new_elem);
      }
      result = Functions.filterPairds(
        Functions.createPairs_arr(result),
        subjects
      );
      return result;
    }
  }
};
</script>

<style lang="scss" scoped>
.inner {
  .inner-content {
    word-break: break-all;
  }
}
</style>
