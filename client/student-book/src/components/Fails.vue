<template>
  <section class="inner">
    <table class="table_dark" v-if="data_loaded === true">
      <tr>
        <th>id</th>
        <th>ФИО</th>
        <th>Группа</th>
        <th>Количество пересдач</th>
      </tr>
      <tr v-for="(item, index) in fails_lst" :key="index">
        <td
          v-for="(property, new_index) in Object.keys(fails_lst[0])"
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
  name: "Fails",
  components: {
    Loader
  },
  data: function() {
    return {
      data_loaded: false,
      fails_lst: []
    };
  },
  mounted() {
    instance
      .get("journal/fails")
      .then(result => {
        if (result.data.length > 0) {
          this.data_loaded = true;
          this.fails_lst = this.setFail_lst(result.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    setFail_lst: function(data) {
      let result = [];
      for (let index = 0; index < data.length; index++) {
        let tmp_obj = {
          id: data[index].id,
          ФИО: `${data[index].surname} ${data[index].name} ${data[index].second_name}`,
          Группа: data[index].group,
          "Количество пересдач": data[index].count
        };
        result.push(tmp_obj);
      }
      return result;
    }
  }
};
</script>
