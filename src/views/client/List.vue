<template>
    <div>

        <v-progress-linear :active="loading" :indeterminate="loading" absolute bottom color="deep-purple accent-4" height="8"></v-progress-linear>

        <main-filter :pageFilter="filterTypes" />

         <v-simple-table >
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left" v-for="header in headers" :key="header">
                            {{ header.name }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items" :key="item.name">
                        <td>{{ item.id }}</td>
                        <td>{{ item.fullname }}</td>
                        <td>{{ item.iin }}</td>
                        <td>{{ item.phone }}</td>
                        <td>{{ item.region }}</td>
                        <td><router-link :to="'/client/detail/' + item.id"><v-btn small class="success"><v-icon small>mdi-pen</v-icon></v-btn></router-link></td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>

    </div>
</template>


<script>

import MainFilter from '../../components/filter/MainFilter.vue';

export default {

    components: {
        MainFilter
    },

    data () {
        return {
            loading: false,
            filterTypes: [
                {
                    name: 'orders',
                },{
                    type: ['iin', 'fullname', 'region', 'id']
                }
            ],
            headers: [
              {
                name: 'Номер'
              },
              {
                name: 'ФИО'
              },
              {
                name: 'ИИН'
              },
              {
                name: 'Телефон'
              },
              {
                name: 'Регион'
              },
              {
                name: 'Действия'
              },

            ],
            items: [
              {
                id: 1,
                fullname: 'АТЕНОВ БАУРЖАН КАЙРАТОВИЧ',
                iin: '910306302139',
                phone: '87082232505',
                region: 'Нур-Султан',
              },

            ],
        }
    },
}
</script>


<style scoped lang="scss">

.v-alert{
  margin: 5px;
}

</style>
