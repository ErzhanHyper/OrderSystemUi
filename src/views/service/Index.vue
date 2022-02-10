<template>
    <div>
        <v-progress-linear :active="loading" :indeterminate="loading" absolute bottom color="deep-purple accent-4" height="8"></v-progress-linear>

        <v-card>
          <v-row>
          <v-col  cols="6">
            <v-card-text>
              <span>Блокировка сертификата</span>
              <div class="d-flex">
                <v-text-field label="Номер сертификата"></v-text-field>
                <v-btn class="primary mt-3">Заблокировать</v-btn>
              </div>
            </v-card-text>

              <v-card-text>
              <span>Разблокировка сертификата</span>
              <div class="d-flex">
                <v-text-field label="Номер сертификата"></v-text-field>
                <v-btn class="primary mt-3">Разблокировать сертификат</v-btn>
              </div>
            </v-card-text>

              <v-card-text>
              <span>Выкачивание сертификата</span>
              <div class="d-flex">
                <v-text-field label="Номер сертификата"></v-text-field>
                <v-btn class="primary mt-3">Получить сертификат по номеру договора</v-btn>
              </div>
            </v-card-text>

              <v-card-text>
              <span>Выкачивание сертификата</span>
              <div class="d-flex">
                <v-text-field label="Номер сертификата"></v-text-field>
                <v-btn class="primary mt-3">Получить сертификат по номеру сертификата</v-btn>
              </div>
            </v-card-text>
          </v-col>

          <v-col  cols="6">
            <v-card-text>
              <span>Проверка</span>
              <div class="d-flex">
                <v-text-field label="Номер сертификата"></v-text-field>
                <v-btn class="primary mt-3">Проверить сертификат</v-btn>
              </div>
            </v-card-text>

              <v-card-text>
              <span>Посмотреть договор по номеру</span>
              <div class="d-flex">
                <v-text-field label="Номер сертификата"></v-text-field>
                <v-btn class="primary mt-3">Поиск по номеру заявки</v-btn>
              </div>
            </v-card-text>

              <v-card-text>
              <span>Проверка ВИН через КАП</span>
              <div class="d-flex">
                <v-text-field label="Номер сертификата"></v-text-field>
                <br>
                <v-radio-group >
                  <v-radio v-for="n in 2" :key="n" :label="`${n}`" :value="n"></v-radio>
                </v-radio-group>

                <v-btn class="primary mt-3">Проверить</v-btn>
              </div>
            </v-card-text>

          </v-col>
          </v-row>
        </v-card>


    </div>
</template>


<script>

import { apiUrl } from '../../services/const.js';

export default {

    data () {
        return {
          loading: false,
          items: [],
        }
    },

    methods: {

    },

    mounted(){
    }

}
</script>


<style scoped lang="scss">


</style>
