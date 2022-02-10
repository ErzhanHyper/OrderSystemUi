import VueRouter from 'vue-router';
import ru from 'vuetify/es5/locale/ru'

let routes = [

  {
    path: '/profile',
    name: 'profile',
    component: require('../views/profile/Index.vue').default,
    meta:  { requiresAuth: true }
  },


  {
    path: '/repayment',
    name: 'repayment',
    component: require('../views/repayment/List.vue').default,
    meta:  { requiresAuth: true }
  },

  {
    path: '/mio',
    name: 'mio',
    component: require('../views/mio/List.vue').default,
    meta:  { requiresAuth: true }
  },

  {
    path: '/mio/detail/:id',
    name: 'mio_detail',
    component: require('../views/mio/Detail.vue').default,
    props: true,
    meta:  { requiresAuth: true }
  },

  {
    path: '/service',
    name: 'service',
    component: require('../views/service/Index.vue').default,
    meta:  { requiresAuth: true }
  },

  {
    path: '/organization',
    name: 'organization',
    component: require('../views/organization/List.vue').default,
    meta:  { requiresAuth: true }
  },

  {
    path: '/vehicle',
    name: 'vehicle',
    component: require('../views/vehicle/List.vue').default,
    meta:  { requiresAuth: true }
  },

  {
    path: '/client',
    name: 'clients',
    component: require('../views/client/List.vue').default,
    meta:  { requiresAuth: true }
  },

  {
    path: '/client/detail/:id',
    name: 'clients_detail',
    component: require('../views/client/Detail.vue').default,
    meta:  { requiresAuth: true }
  },

  {
    path: '/client/line',
    name: 'clients_line',
    component: require('../views/client/Line.vue').default,
    meta:  { requiresAuth: true }
  },

  {
    path: '/order',
    name: 'orders',
    component: require('../views/order/List.vue').default,
    meta:  { requiresAuth: true }

  },

  {
    path: '/order/detail/:id',
    name: 'order_detail',
    component: require('../views/order/Detail.vue').default,
    props: true,
    meta:  { requiresAuth: true }
  },


  {
    path: '/user',
    name: 'user',
    component: require('../views/user/List.vue').default,
    meta:  { requiresAuth: true }

  },
  {
    path: '/user/detail/:id',
    name: 'user_detail',
    component: require('../views/user/Detail.vue').default,
    props: true,
    meta:  { requiresAuth: true }
  },

  {
      path: "*",
      component: require('../views/pages/404.vue').default,
  },

  {
      path: "/auth",
      component: require('../views/auth/Auth.vue').default,
  },

  {
    path: "/liner",
    component: require('../views/auth/AuthLiner.vue').default,
  },
  {
    path: "/category",
    component: require('../views/categories/List.vue').default,
    meta:  { requiresAuth: true }
  },
  {
    path: "/acceptance",
    component: require('../views/acceptance/List.vue').default,
    meta:  { requiresAuth: true }
  },
  {
    path: "/report",
    name: 'report',
    component: require('../views/report/Index.vue').default,
    meta:  { requiresAuth: true }
  },

];

const router = new VueRouter({
  base: '/',
  mode: 'history',
  routes,
});


// router.beforeEach((to, from, next) => {

//   if (to.matched.some(record => record.meta.requiresAuth)) {
//      if (!auth.check()) {
//            next({
//               path: '/auth',
//               query: { redirect: to.fullPath }
//            });
//         return;
//      }
//   }
//   next();
// })

export default router;
