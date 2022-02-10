<template>
  <div>
  </div>
</template>

<script>

import {get as getCategories, store as storeCategories} from '../../services/api/category.js'

export default {

  data () {
    return {
      data: ['1', '2']
    }
  },

  methods: {

    getCategories,
    storeCategories



  },

  mounted(){
    this.getCategories()
  }

}

</script>
