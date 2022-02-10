<template>
    <div>

        <v-progress-linear :active="loading" :indeterminate="loading" absolute bottom color="deep-purple accent-4" height="8"></v-progress-linear>

        <main-filter :pageFilter="filterTypes" />

         <v-simple-table >
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
                    <td>{{ item.idnum }}</td>
                    <td> {{ item.phone }}</td>
                    <td>{{ item.email }}</td>
                    <td><v-btn @click="editItem(item)" small class="success"><v-icon>mdi-pen</v-icon></v-btn></td>
                </tr>
            </tbody>
        </v-simple-table>


      <v-dialog v-model="dialog" scrollable max-width="400px">
        <v-card>
          <v-card-title>Редактирование</v-card-title>
          <v-divider></v-divider>
          <v-card-text >

          <div class="mt-4">
            <v-btn class="error" small>Сбросить пароль</v-btn>
          </div>

          <div class="mt-4">
            <v-text-field label="ФИО" v-model="client.fullname"></v-text-field>
          </div>

          <div class="mt-4">
            <v-text-field label="ИИН" v-model="client.iin"></v-text-field>
          </div>

          <div class="mt-4">
            <v-text-field label="Телефон" v-model="client.phone"></v-text-field>
          </div>

          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Сохранить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

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
            dialog: false,
            client: {},
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

    methods: {
      editItem(item){
        this.dialog = true
        this.client = item
      }
    }
}
</script>

