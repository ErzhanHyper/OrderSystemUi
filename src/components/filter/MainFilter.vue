<template>
    <div>
        <v-card class="mx-auto mb-5" outlined v-if="active"  >
            <v-list-item three-line>
                <v-list-item-content>
                    <div class="text-overline mb-4">Фильтр</div>

                    <v-row>

                        <v-col cols="2" v-if="filterType.includes('id')">
                            <v-text-field
                                counter="25"
                                label="ID"
                                dense
                                v-model="filterName.id"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="2" v-if="filterType.includes('fullname')">
                            <v-text-field
                                counter="25"
                                label="ФИО/НАИМЕНОВАНИЕ"
                                dense
                            ></v-text-field>
                        </v-col>

                        <v-col cols="2" v-if="filterType.includes('iin')">
                            <v-text-field
                                counter="25"
                                label="ИИН/БИН"
                                dense
                            ></v-text-field>
                        </v-col>

                        <v-col cols="2" v-if="filterType.includes('region')">
                            <v-autocomplete
                                label="РЕГИОН (ДЛЯ ДИЛЛЕРОВ И ОПЕРАТОРОВ)"
                                dense
                            ></v-autocomplete>
                        </v-col>


                        <v-col cols="2" v-if="filterType.includes('vin')">
                             <v-text-field
                                counter="16"
                                label="VIN"
                                dense
                                v-model="filterName.vin"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="2" v-if="filterType.includes('name')">
                             <v-text-field
                                label="Наименование"
                                dense
                                v-model="filterName.name"
                            ></v-text-field>
                        </v-col>


                        <v-col cols="2" v-if="filterType.includes('order_type')">

                          <v-autocomplete
                               label="Тип Заявки"
                                dense
                                v-model="filterName.order_type"
                                item-value="id"
                                item-text="name"
                                :items="order_types"
                            ></v-autocomplete>

                        </v-col>

                        <v-col cols="2" v-if="filterType.includes('order_status')">
                          <v-autocomplete
                               label="Статус заявки"
                                dense
                                v-model="filterName.order_status"
                                :items="['Новая','Рассмотрение', 'На доработке', 'Отклонено', 'Одобрено']"
                            ></v-autocomplete>
                        </v-col>

                        <v-col cols="2" v-if="filterType.includes('transfer_status')">
                          <v-autocomplete
                               label="Статус передачи"
                                dense
                                v-model="filterName.transfer_status"
                                :items="['Новая','Рассмотрение', 'Отклонено', 'Одобрено']"
                            ></v-autocomplete>
                        </v-col>

                        <v-col cols="2" v-if="filterType.includes('repayment_status')">
                          <v-autocomplete
                               label="Статус погашения"
                                dense
                                v-model="filterName.repayment_status"
                                :items="['Новая','Рассмотрение', 'Отклонено', 'Одобрено', '2 этап', 'Погашено']"
                            ></v-autocomplete>
                        </v-col>

                        <v-col cols="2" v-if="filterType.includes('sign_status')">
                          <v-autocomplete
                               label="Статус подписи"
                                dense
                                v-model="filterName.sign_status"
                                :items="['Подписан','Не подписан']"
                            ></v-autocomplete>
                        </v-col>


                    </v-row>

                </v-list-item-content>
            </v-list-item>
            <v-card-actions class="justify-end">
                <v-btn outlined class="success" color="#fff" small @click="applyFilter()">Применить</v-btn>
                <v-btn outlined class="reset" color="reset_text" small @click="resetFilter()">Сбросить</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>


<script>
    export default {

        props: ['pageFilter'],

        data:() => ({
            filterType: [],
            filterName: {
              order_type: 1
            },
            active: true,
            height: 0,
            order_types: [
              {
                id: 1,
                name: 'Денежная компенсация'
              },
              {
                id: 2,
                name: 'Сертификат'
              },
            ]
        }),


        methods: {
            applyFilter(){
                Event.$emit("main-filter", this.filterName);
            },

            resetFilter(){
                this.filterName = {}
                Event.$emit("main-filter", {});
            }
        },

        mounted(){
            if(this.pageFilter.length > 0){
                this.filterType = this.pageFilter[1].type
            }else{
                this.active = false
            }

          let self = this
          setTimeout(function(){
            Event.$emit("main-filter", self.filterName);
          }, 1)

        },

    }
</script>


<style lang="scss" scoped>

  label{
      font-size: 12px!important;
  }

</style>
