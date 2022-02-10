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
                        <td>{{ item.factory }}</td>
                        <td>{{ item.brand }}</td>
                        <td>{{ item.model }}</td>
                        <td>{{ item.category }}</td>
                        <td>{{ item.class }}</td>
                        <td><v-btn small class="success" @click="editItem(item)"><v-icon>mdi-pen</v-icon></v-btn></td>
                    </tr>
                </tbody>
            </template>

        </v-simple-table>

      <template>
        <div class="text-center mt-3">
          <v-pagination v-model="page" :length="size" :total-visible="7" @input="getList()" ></v-pagination>
        </div>
      </template>

      <EditVehicle />

    </div>
</template>


<script>

import MainFilter from '../../components/filter/MainFilter.vue';
import { apiUrl } from '../../services/const.js';
import EditVehicle from '../../views/vehicle/Edit.vue';

export default {

    components: {
        MainFilter,
        EditVehicle
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
                    type: ['id']
                }
            ],
            headers: ['ID','Организация', 'Марка', 'Модель', 'Категория', 'Класс', 'Операции'],
            items: [],
            filters: [],
        }
    },

    methods: {

      editItem(item){
        Event.$emit('editVehicle', item);
        console.log('edit');
      },

      getList(){
        this.loading = true
        let params = this.filters
        axios.get(apiUrl+'vehicles?page=' + this.page, {params}).then(response => {
          this.items = response.data.data
          this.size = response.data.last_page
          this.loading = false
        })
      }
    },

    mounted(){
      this.getList();

      Event.$on("main-filter", (value) => {
        this.filters = value
        this.getList();
      });
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
