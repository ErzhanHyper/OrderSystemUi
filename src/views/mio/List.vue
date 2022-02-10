<template>
    <div>

        <v-progress-linear :active="loading" :indeterminate="loading" absolute bottom color="deep-purple accent-4" height="8"></v-progress-linear>

        <main-filter :pageFilter="filterTypes" />

         <v-simple-table >
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left" v-for="header in headers" :key="header">
                            {{ header}}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td>{{ item.title }}</td>
                        <td>{{ item.bin }}</td>
                        <td>{{ item.region_id }}</td>
                        <td>{{ item.created_at }}</td>
                        <td><router-link :to="'/mio/detail/' + item.id" ><v-btn small class="success"><v-icon>mdi-open-in-new</v-icon></v-btn></router-link></td>
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
            items: [],
            filterTypes: [
                {
                    name: 'orders',
                },{
                    type: ['iin', 'fullname', 'region', 'id']
                }
            ],
            headers: [ 'ID','НАИМЕНОВАНИЯ','БИН','ПРИКРЕПЛЕННЫЙ РЕГИОН','СОЗДАН','Действие'],

        }
    },

    methods: {
      getList(){
        axios.get(apiUrl+'mios').then( response => {
          console.log(response);
          this.items = response.data.data
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

</style>
