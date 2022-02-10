<template>
  <v-app id="inspire" >

    <div v-if="authenticated">
      <v-system-bar app height="34">
          <router-link to="/profile"><v-icon>mdi-account</v-icon>Профиль</router-link>
          <v-spacer></v-spacer>
          <div class=" ml-4 webphone-btn" @click="showWebphone()"><v-icon size="16" color="#fff">mdi-phone</v-icon></div>
          <div class=" ml-4 mr-4 chat-btn" @click="showChat()" ><v-icon size="16" color="#fff">mdi-chat</v-icon></div>
          <!-- форма выбора языка -->
          <lang class="mr-5"/>

          <a @click="logout()"><v-icon>mdi-logout</v-icon>Выйти</a>
      </v-system-bar>

      <v-navigation-drawer v-model="drawer" app>

          <v-sheet color="grey lighten-4" class="pa-4 d-flex align-center">
              <v-avatar class="mb-2 mr-2" color="grey darken-1" size="64"></v-avatar>
              <div>System Name</div>
          </v-sheet>

          <v-divider></v-divider>

          <!-- Главное меню -->
          <Menu />

      </v-navigation-drawer>
    </div>

    <v-main>

        <!-- Модальное окно -->
        <KapReconciliationDialog v-if="authenticated"/>

        <!-- Всплывающие окошки -->
        <BaseNotification v-if="authenticated"/>

        <!-- Шаблон страниц -->
        <view-template />

        <!-- <v-btn color="primary" dark v-on:click="showKapReconciliation()" class="ml-3">Open Dialog</v-btn> -->
      <transition name="fade" v-if="authenticated">
        <WebPhone  v-if="webphoneActive == true"/>
      </transition>

      <transition name="fade" v-if="authenticated">
        <Chat v-if="chatActive == true" :class="'chat-container '+ chatPosition" />
      </transition>

    </v-main>




  </v-app>
</template>



<script>

import Menu from "./components/Menu.vue";
import Lang from "./components/Lang.vue";
import ViewTemplate from "./components/ViewTemplate.vue";
import BaseNotification from './components/notifications/Base.vue'
import WebPhone from './components/webphone/Phone.vue'
import Chat from './components/chat/Index.vue'

import KapReconciliationDialog from './components/dialogs/KapReconciliationDialog.vue'


export default {

    data: () => ({
        cards: ['Today', 'Yesterday'],
        drawer: null,
        chatActive: false,
        webphoneActive: false,
        chatPosition: '',
        authenticated: true
    }),

    components: {
        Lang,
        Menu,
        ViewTemplate,
        BaseNotification,
        KapReconciliationDialog,
        WebPhone,
        Chat
    },


    sockets: {
      connect: function() {
        if(auth.check()){
          this.sockets.subscribe("main-channel:App\\Events\\MainEvent",(message) => {
            console.log(message);
          });
        }
      }
    },

    methods: {

        logout(){
          auth.logout();
        },

        showKapReconciliation(){
            Event.$emit("kap_reconciliation_dialog", true);
        },

        showWebphone(){
          this.webphoneActive = !this.webphoneActive
          if(this.chatActive == true && this.webphoneActive == true){
            this.chatPosition = 'active';
          }else{
            this.chatPosition = '';
          }
        },

        showChat(){
          this.chatActive = !this.chatActive
          if(this.chatActive == true && this.webphoneActive == true){
            this.chatPosition = 'active';
          }else{
            this.chatPosition = '';
          }
        }

    },

    mounted(){

      let self = this;
      Event.$on("userLoggedIn", () => {
          this.authenticated = auth.check();
      });
      Event.$on("userLoggedOut", () => {
          this.authenticated = false;
          this.$router.push('/auth');
      });

    }

}

</script>

<style lang="scss">

  @import './assets/scss/app.scss';

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .chat-container.active form{
    right: 230px!important;
  }
</style>
