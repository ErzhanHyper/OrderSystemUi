<template>
    <div>
        <notifications class="base-notification" group="validation"  position="bottom right">
            <template slot="body" slot-scope="props">
                <div :class="'wrapper wrapper-'+props.item.type">
                    <a class="title">{{ props.item.title }}</a>
                    <div class="text ">
                        {{ props.item.text }}
                    </div>
                    <span @click="props.close()" class="close"><v-icon>mdi-close</v-icon></span>
                </div>
            </template>
        </notifications>


    </div>
</template>


<script>

export default{

    mounted(){

        this.$notify({
            group: "validation",
            title: 'заголовок',
            text: 'Текст',
            duration: 4000,
            type: 'info'
        });
    }

}

</script>


<style lang="scss">


.base-notification{
  margin-right: 2px;
  margin-bottom: 10px;
  .wrapper {
    padding: 0 6px 6px 6px;
    border-radius: 4px;
    box-shadow: 0 0 2px 2px rgba(0,0,0,.1);
    margin:4px;
    position:relative;
  }
  .text{
    font-size: 14px;
  }
  .close{
    position:absolute;
    top:4px;
    right:4px;
  }
  .wrapper-info{
    color: #606060;
    background: #ffffff;
  }
  .wrapper-error{
    color: #fff;
    background: #ef7270;
    .title{
        color: #fff;
    }
    .close i{
        color: #fff;
    }
  }
}

</style>
