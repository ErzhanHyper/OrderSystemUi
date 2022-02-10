<template>

  <div>
      <v-progress-linear :active="loading" :indeterminate="loading" absolute bottom color="deep-purple accent-4" height="8"></v-progress-linear>

        <v-simple-table :fixed-header="true" :height="515">
            <template v-slot:default>
              <thead>
                  <tr>
                      <th class="text-left" v-for="(header, index) in headers" :key="index">
                          {{ header }}
                      </th>
                  </tr>
              </thead>
              <tbody :class="(loading) ? 'active' : ''">
                <tr>
                  Пусто
                </tr>
              </tbody>
            </template>
        </v-simple-table>
  </div>

</template>

<script>

import MainFilter from '../../components/filter/MainFilter.vue';
import { apiUrl } from '../../services/const.js';

export default {

    components: {
        MainFilter
    },

    data () {
        return {
            loading: false,
            headers: [ 'Номер','Номер основного сертификата', 'номер второго сертификата', 'Отправили', 'Одобрили','Погасили','Сумма', 'Статус', 'Удалить'],
        }
      }
  }
</script>
