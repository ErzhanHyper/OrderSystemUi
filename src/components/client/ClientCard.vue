<template>
  <div>

    <v-card >
      <v-card-title>Клиент</v-card-title>

      <v-card-text>
        <v-row>

          <v-col cols="6">
            <v-text-field label="Тип клиента" outlined dense></v-text-field>
            <v-text-field label="ФИО" outlined dense></v-text-field>
            <v-text-field label="Номер расчетного счета" outlined dense></v-text-field>
            <v-text-field label="Адрес" outlined dense></v-text-field>
            <v-text-field label="Контактный телефон" outlined dense></v-text-field>

          </v-col>

          <v-col cols="6">
            <v-text-field label="Кому принадлежит" outlined dense></v-text-field>
            <v-text-field label="ИИН" outlined dense></v-text-field>
            <v-text-field label="Банк" outlined dense></v-text-field>
            <v-text-field label="Регион" outlined dense></v-text-field>
            <v-text-field label="Email" outlined dense></v-text-field>
          </v-col>

        </v-row>

        <v-row>
          <v-col cols="4">
            <v-text-field label="Номер удостоверения личности" outlined dense></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field label="Дата выдачи" outlined dense></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field label="Выдано" outlined dense></v-text-field>
          </v-col>
        </v-row>

      </v-card-text>
    </v-card>

  </div>
</template>



<script>


  export default {

  data () {
        return {
        }
    },

  }
</script>
