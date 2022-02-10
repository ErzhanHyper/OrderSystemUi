<template>
  <div class="auth-page">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <div class="pb-2 pl-2 pr-2 pt-2">Авторизация</div>
            <v-divider/>
              <v-card-text>
                <v-form>
                  <v-alert type="error" v-if="errors.length > 0" class="text-left">
                      <span v-for="error in errors[0]" :key="errors.indexOf(error)">
                          <span>{{error[0]}}<br></span>
                      </span>
                  </v-alert>

                  <v-text-field
                    outline
                    label="Username"
                    type="text"
                    v-model="username"></v-text-field>
                  <v-text-field
                    outline
                    hide-details
                    label="Password"
                    type="password"
                    v-model="password">
                  </v-text-field>

                </v-form>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-btn color="primary" @click="login()" :loading="loading" >Войти</v-btn>
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
         authType: 1,
         authenticated: auth.check(),
         user: auth.user,
         show: false,
         errors: [],
         loading: false,
         selected:false,
         autocomplete:new Date().getTime().toString(),
         username: '',
         password: '',
         pem: '',
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
            username: this.username,
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

         axios.post('http://127.0.0.1:8000/api/login', data).then(({data}) => {
            console.log(data)
            // auth.login(data);
            // if(this.$route.path != '/'){
            //    this.$router.push('/');
            // }
            // this.errors = []
            // this.loading = false
         }).catch(error => {
            console.log(error)
            this.errors = []
            // this.loading = false
            if (error.response.status == 422) {
               this.errors.push(error.response.data.errors);
            }
         })
      }
   },

  mounted(){

  },

}

</script>


<style scoped lang="scss">

  .auth-page{
    display: flex;
    height: 100%;
  }

  .select_file{
    position: relative;
    bottom: -10px;
    flex: 6;
    display: none;
  }

  .select_type{
    flex: 6;
    padding: 5px;
    border:1px solid #dddddd;
    border-radius: 3px;
    margin-bottom: 20px;
  }

  .select-box{
    width: 320px;
    height: 50px;
    line-height: 15px;
    display: flex;
    select{
      width: 100%;
    }
    .v-icon{
      height: 65%;
      margin-left: -30px;
      pointer-events: none;
    }
  }

</style>
