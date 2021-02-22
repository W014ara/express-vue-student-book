<template>
  <section class="inner">
    <div class="inner">
      <table class="table_dark" v-if="data_loaded === true">
        <tr>
          <th v-for="elem in table_head" :key="elem">
            {{ elem }}
          </th>
        </tr>
        <tr v-for="(item, index) in filter_lst" :key="index">
          <td
            v-for="(property, new_index) in Object.keys(filter_lst[0])"
            :key="new_index"
            v-bind:class="{
              badly:
                item[property] === 'Неудовлетворительно' ||
                item[property] === 'Незачет' ||
                item[property] === 'Неявка'
            }"
          >
            {{ item[property] }}
          </td>
        </tr>
      </table>

      <Loader v-else />
    </div>
  </section>
</template>

<script>
import instance from "../api/instance.js";
import Loader from "../views/Loader";

export default {
  name: "AllStudents",
  components: {
    Loader
  },
  data: function() {
    return {
      data_loaded: false,
      subjects: [],
      table_head: [],
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
          this.table_head = Object.keys(this.filter_lst[0]);
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
      return result;
    }
  }
};
</script>
