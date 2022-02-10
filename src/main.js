window._ = require('lodash');
window.Vue = require('vue').default;
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.Event = new Vue;
import App from './App';
import en from "./lang/en.js";
import ru from "./lang/ru.js";
import Auth from './auth.js';
import router from './router/index.js';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import VueI18n from 'vue-i18n';
import Notifications from 'vue-notification';
import '@mdi/font/css/materialdesignicons.css';
import VueSocketIO from 'vue-socket.io';
import SocketIO from "socket.io-client"

require('./background.js');

global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

window.auth = new Auth();

// Vue.use(new VueSocketIO({
//   debug: false,
//   connection: SocketIO('wss://127.0.0.1:13579', { transports: ["websocket"] }),
// }));


import { ws_url } from './services/const.js';


Vue.use(VueI18n)
Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.use(Notifications);

class CustomFormatter {
    constructor (options) {
      // ...
    }
    interpolate (message, values) {
      return ['-']
    }
}

// Поддержка языков
const i18n = new VueI18n({
    locale: 'ru',
    messages: {
        'ru': ru,
        'en': en,
    }
})


const app = new Vue({
    el: '#app',
    router,
    i18n,
    components: { App },
    template: '<App/>',
    vuetify: new Vuetify({
      icons: {
        iconfont: 'mdi',
      },
       theme: {
          themes: {
             light: {
                primary: '#6684b0',
                success: '#4fcc82',
                accent: '#934aff',
                error: '#ef7270',
                reset: '#eaeaea',
                reset_text: '#303030'
             }
          },
          options: {
             customProperties: true
          },
       },
    }),
    iconfont: 'mdi',
 });

 Vue.prototype.$base_path = '/';
