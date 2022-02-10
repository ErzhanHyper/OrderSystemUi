 <!-- Шаблон страниц -->

<template>
    <div>
        <div class="page-title d-flex justify-space-between align-center" v-if="$route.name">
            <div class="title">
                {{ $t('main.'+$route.name) }} <span v-if="$route.params.id">{{$route.params.id}}</span>
            </div>

            <div class="actions">
                <v-menu>
                    <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" small>Действии <v-icon>mdi-arrow-down</v-icon></v-btn>
                    </template>

                    <v-list>
                        <v-list-item @click="createOrder()" v-if="route == 'orders'">
                            <v-list-item-title>Создать заявку</v-list-item-title>
                        </v-list-item>

                        <v-list-item @click="createOrder()" v-if="route == 'user'">
                            <v-list-item-title>Создать пользователя</v-list-item-title>
                        </v-list-item>

                        <v-list-item disabled>
                            <v-list-item-title>Импорт</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <v-btn class="primary ml-2" small @click="goBack()" v-if="$route.params.id"><v-icon>mdi-arrow-left</v-icon>Назад</v-btn>

            </div>

        </div>

        <div class="page-content">
            <router-view />
        </div>
    </div>
</template>


<script>

import MainFilter from "./filter/MainFilter.vue";

export default {

    components: {
        MainFilter,
    },

    data(){
        return{
            loading: true,
            route: this.$router.history.current.name
        }
    },

    methods: {
        createOrder(){
            if(this.$route.path != '/order')
            this.$router.push('order')
        },

        goBack(){
          this.$router.go(-1)
        }
    },

    mounted(){

    }
}

</script>


<style>

.page-title{
    margin-bottom: 20px;
    padding: 10px;
    border-bottom: 1px solid;
    padding: 36px;
}

.page-content{
    padding: 10px;
    height: 100vh;
}

.pageCard{
    margin: 20px;
}


</style>
