<template>
    <div>

  <v-progress-linear :active="loading" :indeterminate="loading" absolute bottom color="deep-purple accent-4" height="8"></v-progress-linear>

 <v-card class="mx-auto ">

   <v-card-title>Форма изменения пользователя</v-card-title>

    <v-card-text>
      <v-form ref="form" lazy-validation>

      <v-row>
        <v-col md="12" lg="4">
          <v-text-field outlined dense v-model="user.name" :counter="10"  label="Логин" required ></v-text-field>
          <v-text-field outlined dense v-model="user.password" :counter="10"  label="Пароль" required placeholder="password - это стандартный пароль, который следует изменить сразу"></v-text-field>

          <v-text-field outlined dense v-model="user.fullname" label="ФИО" required></v-text-field>

          <v-text-field outlined dense v-model="user.fullname_docs" label="ФИО в родительном падеже (для документов)" required></v-text-field>

          <v-text-field outlined dense v-model="user.bin" label="БИН (для авторизации диллеров и операторов)" required></v-text-field>

          <v-text-field outlined dense v-model="user.phone" label="Телефон" required></v-text-field>

          <v-text-field outlined dense v-model="user.email" label="E-mail" required></v-text-field>

        </v-col>

        <v-col md="12" lg="4">
          <v-select outlined dense v-model="user.role" label="Роль" required :items="['admin', 'moderator']"></v-select>
          <v-text-field outlined dense v-model="user.dealerContract" label="Доверенность (для диллеров)" required></v-text-field>
          <v-text-field outlined dense v-model="user.dealerAddress" label="Адрес салона или компании (для диллеров)" required></v-text-field>

          <v-select outlined dense v-model="user.region" label="Регион (для диллеров и операторов)" required :items="['Нур-султан', 'Алматы']"></v-select>

        </v-col>

        <v-col md="12" lg="4" style="margin-top:-20px;">
            <v-radio-group v-model="user.active">
              <v-radio v-for="n in userActive" :key="n" :label="`${n}`" :value="n"></v-radio>
            </v-radio-group>
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
