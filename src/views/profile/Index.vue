<template>
    <div>

  <v-progress-linear :active="loading" :indeterminate="loading" absolute bottom color="deep-purple accent-4" height="8"></v-progress-linear>

 <v-card class="col-md-6" >

   <v-card-title>Настройки</v-card-title>

    <v-card-text>
      <v-form ref="form" lazy-validation>

      <v-row>
        <v-col md="12" lg="6">
          <v-text-field outlined dense v-model="user.password" :counter="10"  label="Новый пароль" required placeholder="password - это стандартный пароль, который следует изменить сразу"></v-text-field>

          <v-text-field outlined dense v-model="user.phone" :counter="10"  label="Телефон" required placeholder="Телефон"></v-text-field>
          <v-text-field outlined dense v-model="user.fullname" :counter="10"  label="ФИО" required placeholder="ФИО"></v-text-field>
          <v-text-field outlined dense v-model="user.autoriser" :counter="10"  label="Доверенность" required placeholder="Доверенность"></v-text-field>
        </v-col>

        <v-col md="12" lg="6">
          <v-text-field outlined dense v-model="user.password" :counter="10"  label="Повторите ввод нового пароля" required placeholder="password - это стандартный пароль, который следует изменить сразу"></v-text-field>
          <v-text-field outlined dense v-model="user.email" :counter="10"  label="E-mail" required placeholder="E-mail"></v-text-field>
          <v-text-field outlined dense v-model="user.fullname2" :counter="10"  label="ФИО в родительном падеже" required placeholder="ФИО в родительном падеже"></v-text-field>
        </v-col>

      </v-row>

        <v-btn color="success" class="mt-5 mr-4">Сохранить</v-btn>

      </v-form>

    </v-card-text>

    </v-card>

    </div>
</template>


<script>


export default {

  props: ['id'],

  components: {
  },

  data () {
      return {
          loading: false,
          user: {
          },
          userActive: [
            "Активный", "Отключен"
          ]
      }
  },

  mounted(){
    console.log('user deail page');
    console.log(this.id);
  }
}
</script>
