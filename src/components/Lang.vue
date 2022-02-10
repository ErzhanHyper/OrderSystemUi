<template>
    <div>
        <a class="lang" v-for="(locale, index) in locales" @click="changeLang(locale.key)" :key="index" >
          <span v-if="locale.key != $i18n.locale"> {{locale.name}} </span>
        </a>
    </div>
</template>


<script>
    export default {

        data:() => ({
            locales: [],
        }),


        methods: {
            changeLang(lang){
                this.$i18n.locale = lang
            }
        },

        mounted(){
            Object.entries(this.$i18n.messages).forEach(([key, value]) => {
                let item = {
                    'key': value.key,
                    'name' : value.name
                }
                this.locales.push(item);
            });
        }
    }
</script>


<style>
    a.lang{
        color: #d86c42!important;
        font-weight: 600;
    }
</style>
