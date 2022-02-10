<template>
    <div class="auth-page">
        <v-row align="center" justify="center" >
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12">

                        <div class="pb-2 pl-2 pr-2 pt-2">ЭЛЕКТРОННАЯ ОЧЕРЕДЬ</div>
                        <v-divider/>
                        <v-card-text>
                        <v-form>
                        <v-alert type="error" v-if="errors.length > 0" class="text-left">
                            <span v-for="error in errors[0]" :key="errors.indexOf(error)">
                                <span>{{error[0]}}<br></span>
                            </span>
                        </v-alert>

                        <v-text-field
                        label="ИИН"
                        v-model="iin"
                        :rules="[rules.required]"
                        prepend-icon="mdi-account"
                        type="text"
                        autocomplete="new-password"
                        ></v-text-field>

                        <v-text-field
                        v-model="password"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        prepend-icon="mdi-lock"
                        :rules="[rules.required, rules.min]"
                        :type="show ? 'text' : 'password'"
                        name="input-10-1"
                        label="Пароль"
                        hint="Не меньше 3 символов"
                        messages="Забыли свой пароль? Позвоните в колл-центр +7 707 772 79 62."
                        counter
                        @click:append="show = !show"
                        autocomplete="new-password"

                        ></v-text-field>
                        </v-form>
                    </v-card-text>

                    <v-card-actions>
                        <a href="#" class="ml-3" color="primary" @click="login" :loading="loading" small>Регистрация</a>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="login" :loading="loading" small>Войти</v-btn>
                    </v-card-actions>

                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {

   data () {
      return {
         iin: '',
         password: '',
         authenticated: auth.check(),
         user: auth.user,
         show: false,
         errors: [],
         loading: false,
         autocomplete:new Date().getTime().toString(),
         rules: {
            required: value => !!value || 'объязательно.',
            min: v => v.length >= 3 || 'Минимум 3 символов',
            usernameMatch: () => ('The login and password you entered don\'t match'),
         },
      }
   },

   methods: {

      login () {
         let data = {
            username: this.iin,
            password: this.password,
         };
         this.loading = true

        let user = {
          "id":"1",
          "login":"erzhan",
          "lastname":"Шалдыбаев",
          "firstname":"Ержан",
          "middlename":"Дауылулы",
          "phone":"8708594256",
          "role_id":"1",
          "email":"efg@mail.kz",
          "password":"$2y$10$jRIwLReqMNSVUmQ4ZCO.hewIMg.f.oHvwt0qlfiHgIM3VNV5\/MJR.",
          "iin":null,
          "bin":null,
          "base":null,
          "gp_id":"2",
          "email_verified_at":null,
          "remember_token":null,
          "created_at":null,
          "updated_at":null
        }
            auth.login(user);
            if(this.$route.path != '/'){
               this.$router.push('/');
            }
        //  axios.post('/login', data).then(({data}) => {
        //     console.log(data)
        //     auth.login(data);
        //     if(this.$route.path != '/'){
        //        this.$router.push('/');
        //     }
        //     this.errors = []
        //     this.loading = false
        //  }).catch(error => {
        //     console.log(error)
        //     this.errors = []
        //     // this.loading = false
        //     if (error.response.status == 422) {
        //        this.errors.push(error.response.data.errors);
        //     }
        //  })
      }
   },

   mounted(){

   }
}

</script>


<style scoped lang="scss">

  .auth-page{
    display: flex;
    height: 100%;
    &>div{
      z-index: 3;
    }
    &:after, &:before{
      content: "";
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width:100%;
      height: 100%;
      background-size:cover;
    }

    &:after{
      background: url('../../assets/images/auth-back.jpg') no-repeat center center;
      z-index: 1;
    }

    &:before{
      background: rgba(255,255,255, .95);
      z-index: 2;
    }

  }

</style>
