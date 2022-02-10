<template>
    <div>

      <template v-for="(item, index) in items">

         <router-link :to="item.link" :key="index">
            <v-list-item link >
               <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
               </v-list-item-icon>
               <v-list-item-content>
                  <v-list-item-title>{{ $t('main.'+item.name) }}</v-list-item-title>
               </v-list-item-content>
            </v-list-item>
         </router-link>

      </template>

    </div>
</template>


<script>

export default{

    data: () => ({
        items: [],
    }),

    methods: {
        generateMenu(){
            this.items = [
                {
                    name: 'user',
                    icon: 'mdi-account-multiple-outline',
                    link: '/user',
                },{
                    name: 'orders',
                    icon: 'mdi-clipboard-text',
                    link: '/order'
                },{
                    name: 'mio',
                    icon: 'mdi-cards-variant',
                    link: '/mio'
                },{
                    name: 'organization',
                    icon: 'mdi-bulletin-board',
                    link: '/organization'
                },{
                    name: 'reports',
                    icon: 'mdi-chart-bar',
                    link: '/report'
                },{
                    name: 'repayment',
                    icon: 'mdi-cash-multiple',
                    link: '/repayment'
                },{
                    name: 'service',
                    icon: 'mdi-wrench',
                    link: '/service'
                },{
                    name: 'clients',
                    icon: 'mdi-account-multiple',
                    link: '/client'
                },{
                    name: 'clients_line',
                    icon: 'mdi-table',
                    link: '/client/line'
                },{
                    name: 'acceptance',
                    icon: 'mdi-book-open',
                    link: '/acceptance'
                },{
                    name: 'transfers',
                    icon: 'mdi-transfer',
                    link: '/transfers'
                },{
                    name: 'vehicle',
                    icon: 'mdi-car',
                    link: '/vehicle'
                },


            ];
        }
    },

    mounted(){
        this.generateMenu();
    },


}

</script>
