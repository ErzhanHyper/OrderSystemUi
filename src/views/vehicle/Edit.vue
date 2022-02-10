<template>
  <div>
    <v-dialog v-model="dialog" scrollable max-width="400px">
      <v-card>
        <v-card-title>Редактирование</v-card-title>
        <v-divider></v-divider>
        <v-card-text >

        <v-text-field :value="item.factory" label="Организация"></v-text-field>
        <v-text-field :value="item.brand" label="Марка"></v-text-field>
        <v-text-field :value="item.model" label="Модель"></v-text-field>
        <v-text-field :value="item.category" label="Категория"></v-text-field>
        <v-text-field :value="item.class" label="Класс"></v-text-field>

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

export default {

  data () {
    return {
      dialog: false,
      item: {}
    }
  },

  mounted(){
    let self = this
    Event.$on("editVehicle", (item) => {
      self.item = item
      self.dialog = true
    });
  }

}

</script>


