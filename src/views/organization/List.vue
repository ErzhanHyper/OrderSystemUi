<template>
    <div>

      <v-progress-linear :active="loading" :indeterminate="loading" absolute bottom color="deep-purple accent-4" height="8"></v-progress-linear>

      <main-filter :pageFilter="filterTypes" />

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
                  <tr v-for="item in items" :key="item.id">
                      <td>{{ item.id }}</td>
                      <td>{{ item.name }}</td>
                      <td><router-link :to="'/organization/detail/' + item.id" ><v-btn small class="success"><v-icon>mdi-open-in-new</v-icon></v-btn></router-link></td>
                  </tr>
              </tbody>
          </template>
      </v-simple-table>

      <template>
        <div class="text-center mt-3">
          <v-pagination v-model="page" :length="size" :total-visible="7" @input="getList()" ></v-pagination>
        </div>
      </template>

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
            showWatchers: false,
            page: 1,
            size: 0,
            filterTypes: [
              {
                  name: 'orders',
              },{
                  type: ['name']
              }
            ],
            headers: ['ID','Организация', 'Операции'],
            items: [],
            filters: [],
        }
    },

    methods: {
      getList(){
        this.loading = true
        let params = this.filters
        axios.get(apiUrl+'organizations?page=' + this.page, {params}).then(response => {
          this.items = response.data.data
          this.size = response.data.last_page
          this.loading = false
        })
      }
    },

    mounted(){
      this.getList();
    }
}
</script>


<style scoped lang="scss">

.v-alert{
  margin: 5px;
}

tbody.active{
  filter: blur(8px);
}

</style>
