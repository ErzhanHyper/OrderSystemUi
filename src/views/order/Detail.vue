<template>
    <div>

        <v-progress-linear :active="loading" :indeterminate="loading" absolute bottom color="deep-purple accent-4" height="8"></v-progress-linear>

        <v-container fluid>
            <v-row dense>

                <v-col cols="8">

                    <client-card />

                    <v-card class="mt-5">
                        <v-card-title>Заявка</v-card-title>
                        <v-card-text>
                        <v-card-text class="grey lighten-4">
                            <div><b>Информация</b></div>
                            <div>Категория: N2, комплектация: ВЭТС-1, от владельца (пункт по новой форме заявления: п. 1).</div>
                            <div>Заявка отправлена на одобрение: 03.04.2021 14:23 (по Астане)</div>
                        </v-card-text>

                        <v-card-text class="grey lighten-4 mt-5">
                          <div><b>Проверка в КАП</b></div>
                          <div>
                            дата операции: 2021-03-31; ГРНЗ: X047HZM; марка, модель, модификация ТС: ГАЗ 52; номер двигателя ТС: 5204*098379; номер шасси ТС: 1190745;
                            номер кузова ТС (Vin-код): 45051; цвет: ГОЛУБОЙ; серия и номер СРТС: XA00070889; категория ТС: C;
                            разрешенная максимальная масса: 5170; масса без нагрузки: 2520; статус карточки: S; VIN ТС: 45051;
                            причина снятия с учета ТС: утилизация (выбраковка,списание);
                          </div>

                          <div class="mt-2">
                            <a @click="kapListToggle = !kapListToggle">Показать весь список статусов <v-icon>{{ (kapListToggle) ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon></a>
                            <transition name="fade">
                              <v-card-text class="white mt-5" v-if="kapListToggle">
                                  <a href="#" type="button" class="mb-3 mt-3">
                                    <b>дата операции:</b> 2015-04-23;  <b>ГРНЗ:</b> 1403DB;  <b>марка, модель, модификация ТС:</b> VAN HOOL;
                                    <b>номер двигателя ТС:</b> Н.У.;  <b>номер шасси ТС:</b> 45051;  <b>номер кузова ТС (Vin-код):</b>
                                    <span style="color: red;font-weight: bold">Н</span>.<span style="color: red;font-weight: bold">У</span>.;
                                    <b>цвет:</b> СИНИЙ;  <b>серия и номер СРТС:</b> DA01160145;  <b>категория ТС:</b> E;  <b>разрешенная максимальная масса:</b> 31500;
                                    <b>масса без нагрузки:</b> 7500;  <b>статус карточки:</b> S;  <b>VIN ТС:</b> 45051;
                                    <b>причина снятия с учета ТС:</b> дубликат регистрац-го док-та и замена гос. номера;
                                  </a>
                                  <v-divider/>
                              </v-card-text>
                            </transition>
                          </div>
                        </v-card-text>

                        <v-card-text>
                          <v-row>
                            <v-col cols="6">
                              <div><b>Проверка 1</b></div>
                              Возможные дубликаты по VIN
                              <br>
                              ВАЗ 2106*0013499
                              <br>
                              1313499
                              <br>
                              XTA210530P1349973
                              <br>
                              Возможные дубликаты по номеру кузова
                              <br>
                              XTA10740Y1349971
                            </v-col>
                            <v-col cols="6">
                              <div><b>Проверка 2</b></div>
                              Возможные дубликаты по VIN(в этой машине) -> BODY(другие машине)
                              <br>
                              XTA210740Y1349971
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-card-text>
                    </v-card>

                    <v-card class="mt-5">
                      <v-card-title>Файлы</v-card-title>
                      <v-card-text>
                        <a>Не был найден файл "Заявление о принятии ВЭТС для последующей утилизации(id: 3562633)" на сервере</a>
                        <br>
                      </v-card-text>
                  </v-card>

                </v-col>

                <v-col cols="4">
                    <v-card>
                         <v-card-title>Исполнитель:</v-card-title>
                          <v-card-text>
                            <div class="fs-18 mb-2"><b>Не назначен</b></div>
                            <div class="viewers" >
                              <span>Наблюдатели:</span>
                              <span v-for="i in 7" style="color:#6d4e3b">Шалдыбаев Ержан, </span>
                            </div>
                          </v-card-text>

                           <v-card-actions>
                            <v-btn class="info" small>Взять на исполнение</v-btn>
                            <v-btn class="error" small>Прекратить исполнение</v-btn>
                          </v-card-actions>

                    </v-card>

                      <v-card class="mt-5">
                         <v-card-title>Действие:</v-card-title>
                          <v-card-text>
                            <span class="d-flex mb-1">Статус заявки: <v-alert class="mb-0 pr-5" style="padding:2px;" type="info" text dense>Новая</v-alert></span>
                            <span class="d-flex mb-1">Статус подписи: <v-alert class="mb-0 pr-5" style="padding:2px;" type="error" text dense>Не подписано</v-alert></span>
                          </v-card-text>

                          <v-card-actions>
                            <v-btn class="warning" small>На доработку</v-btn>
                            <v-btn class="error" small>Отклонить</v-btn>
                            <v-btn class="success" small>На оплату</v-btn>
                            <v-btn class="info" small>Оставить сообщение</v-btn>
                          </v-card-actions>
                    </v-card>

                     <v-card class="mt-5">
                         <v-card-title>История изменения:</v-card-title>
                          <v-card-text>
                            Пусто
                          </v-card-text>
                    </v-card>

                </v-col>

            </v-row>
        </v-container>

    </div>
</template>


<script>

import ClientCard from '../../components/client/ClientCard.vue';

  export default {

   components: {
        ClientCard
    },

  data () {
        return {
            loading: true,
            kapListToggle: false,
            cards: [
                { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
                { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
                { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
            ],
        }
    },

    methods: {
    }

  }
</script>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
