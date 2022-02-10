<template>
    <div>
        <v-progress-linear :active="loading" :indeterminate="loading" absolute bottom color="deep-purple accent-4" height="8"></v-progress-linear>

        <main-filter :pageFilter="filterTypes" />

        <v-simple-table :fixed-header="true" :height="515">
          <thead>
              <tr>
                  <th class="text-left" v-for="header in headers" :key="header.name">
                      {{ header.name }}
                  </th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="item in items" :key="item.id">
                  <td>{{ item.id }}</td>
                  <td>{{ item.login }}</td>
                  <td>{{ item.phone }}</td>
                  <td>{{ item.email }}</td>
                  <td>{{ item.fullname }}</td>
                  <td>{{ item.role }}</td>
                  <td>{{ item.field }}</td>
                  <td>{{ item.address }}</td>
                  <td>{{ item.producer }}</td>
                  <td>{{ item.region }}</td>
                  <td><router-link :to="'/user/detail/' + item.id" ><v-btn small class="success"><v-icon>mdi-open-in-new</v-icon></v-btn></router-link></td>
              </tr>
          </tbody>
        </v-simple-table>

        <template>
          <div class="text-center mt-3">
          <v-pagination v-model="page" :length="size" :total-visible="7" @input="getResults" ></v-pagination>
        </div>
      </template>

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
            size: 2,
            page: 1,
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
                name: 'ID'
              },
              {
                name: 'Login'
              },
              {
                name: 'Телефон'
              },
              {
                name: 'Эл. почта'
              },
              {
                name: 'ФИО'
              },
              {
                name: 'Роль'
              },
              {
                name: 'Поле'
              },
              {
                name: 'Адрес'
              },
              {
                name: 'Производитель'
              },
              {
                name: 'Регион'
              },
              {
                name: 'Просмотр'
              },
            ],
            items: [
              {
                id: 1,
                login: '960213350273',
                phone: '+77003336868',
                email: 'pasha@unidade.kz',
                fullname: 'Федотов Павел Сергеевич',
                role: 'moderator',
                field: '1 от 21 ноября 2016 года',
                address: '',
                producer: 'Нет',
                region: 'Нур-Султан'
              },
              {
                id: 2,
                login: '980501301490',
                phone: '+77022049753',
                email: 'r.dandybayev@recycle.kz',
                fullname: 'Дандыбаев Ратмир Нурахметович',
                role: 'admin',
                field: '4-2/21 от 31.12.2020 № 765 ОТ 05.02.2021',
                address: '',
                producer: 'Нет',
                region: 'Нет'
              },
            ],
        }
    },


    mounted () {

    },

    methods:{
      getResults(page = this.page) {
        axios.get('/user?page=' + page).then(response => {
          this.items = response.data.user.data;
          this.total = response.data.user.total;
          this.size = response.data.user.last_page
        });
      }

    }



}
</script>
