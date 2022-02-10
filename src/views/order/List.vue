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
                <tbody :class="(loading) ? 'active' : ''" v-if="items.length > 0">
                    <tr v-for="item in items" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td>{{ item.vin }}</td>
                        <td>{{ item.client }}</td>
                        <td><span>{{ item.created_at }}</span></td>
                        <td><span>{{ item.sended_to_approve_at }}</span></td>
                        <td><b>{{ item.category }} | {{ item.car_type }}</b></td>
                        <td>{{ item.region}}</td>
                        <td>
                            <v-alert dense :type="setStatusType(item.status.id)" text >
                              {{ $t('order.'+item.status.name) }}
                            </v-alert>
                        </td>
                        <td>
                            <v-alert dense text :type=" (item.sign == 'sign') ? 'success' : 'error'">
                              {{ (item.sign == 'sign') ? 'Подписано' : 'Не подписано'}}
                            </v-alert>
                        </td>
                        <td>
                            <div v-if="item.executor"><b>{{ item.executor.lastname }} {{ item.executor.firstname }}</b></div>
                            <div v-else>Не назначен</div>
                              <a href="#" v-if="item.viewers" @click="showWatchers = !showWatchers">Наблюдатели
                                <v-icon small >{{ (showWatchers == false) ? 'mdi-chevron-down' : 'mdi-chevron-up' }}</v-icon>
                              </a>
                              <div class="watchers" v-if="showWatchers">
                                <span v-for="(name, index) in item.viewers" :key="index">
                                  {{name}}
                                </span>
                            </div>
                        </td>
                        <td><router-link :to="'/order/detail/' + item.id" ><v-btn small class="success"><v-icon>mdi-open-in-new</v-icon></v-btn></router-link></td>
                    </tr>
                </tbody>
                <div class="col-md-6" v-else>Пусто</div>
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
            showWatchers: false,
            page: 1,
            filterTypes: [
                {
                    name: 'orders',
                },{
                    type: ['order_type', 'order_status', 'transfer_status', 'repayment_status', 'sign_status']
                }
            ],
            headers: [ 'Номер','VIN', 'Клиент', 'Создан', 'Отправлен','Тип','Регион', 'Статус заявки', 'Статус подписи', 'Исполнитель', 'Просмотр'],
            items: [],
            filters: [],
        }
    },

    methods: {

      setStatusType(id){
        let type = '';
        if(id == 1){
          type = 'info'
        }else if(id == 2){
          type = 'warning'
        }
        else if(id == 3){
          type = 'warning'
        }
        else if(id == 4){
          type = 'error'
        }
        else if(id == 5){
          type = 'success'
        }
        return type;
      },

      getList(){
        this.loading = true
        let params = this.filters
        axios.get(apiUrl+'orders', {params}).then(response => {
          this.items = response.data.data
          this.loading = false
        })
      }
    },

    mounted(){
      this.getList()

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
