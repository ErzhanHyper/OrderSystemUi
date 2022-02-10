<template>

  <div>
    <v-progress-linear :active="loading" :indeterminate="loading" absolute bottom color="deep-purple accent-4" height="8"></v-progress-linear>

    <div class="row">
      <div class="col-md-6">
          <v-card >
            <v-card-title>Отчет по погашениям</v-card-title>
            <v-card-text class="d-flex">
              <v-text-field label="Начиная с даты" class="mr-5"></v-text-field>
              <v-text-field label="По дату"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn class="primary" small>Получить</v-btn>
            </v-card-actions>
          </v-card>
      </div>

     <div class="col-md-6">
          <v-card >
            <v-card-title>Отчет по погашениям</v-card-title>
            <v-card-text class="d-flex">
              <v-text-field label="Начиная с даты" class="mr-5"></v-text-field>
              <v-text-field label="По дату"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn class="primary" small>Получить</v-btn>
            </v-card-actions>
          </v-card>
      </div>

      </div>

       <div class="row">
      <div class="col-md-6">
          <v-card >
            <v-card-title>Отчеты за дату</v-card-title>
            <v-card-text class="d-flex">
              <v-text-field label="Начиная с даты" class="mr-5"></v-text-field>
              <v-text-field label="По дату"></v-text-field>
            </v-card-text>

            <v-card-text class="d-flex">
              <v-text-field label="Начиная с даты" class="mr-5"></v-text-field>
              <v-text-field label="По дату"></v-text-field>
            </v-card-text>

            <v-card-actions>
              <v-btn class="primary" small>Получить</v-btn>
            </v-card-actions>
          </v-card>
      </div>

     <div class="col-md-6">
          <v-card >
            <v-card-title>Отчет по погашениям</v-card-title>
            <v-card-text class="d-flex">
              <v-text-field label="Начиная с даты" class="mr-5"></v-text-field>
              <v-text-field label="По дату"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn class="primary" small>Получить</v-btn>
            </v-card-actions>
          </v-card>
      </div>

      </div>

    </div>

</template>

<script>

export default {

    data () {
        return {
            loading: false,
        }
      }
  }
</script>
