<template>

  <v-layout>

    <img v-if="!current" src="../../static/IFConnection.png"/>

    <template v-else>
      <img v-if="current.type === 'image'" :src="current.src"/>
  
      <video v-else-if="current.type === 'video'" class="video" width="100%" height="100%" autoplay="autoplay">
          <source :src="current.src" type="video/mp4">
        </video>
    </template>

  </v-layout>

</template>

<script>
import { OnRules } from 'vuetify-js-utils'

import { OnMsg, CrudPage } from '@/mixins'
import { Media } from "./Media";
import { mediasService } from "./MediasService";
import { isArray } from 'lodash';

export default {
    data: () => ({
        items: [],  
        xItem: 0,
        xMedia: 0,
        target: {},
    }),

      mixins: [CrudPage, OnRules, OnMsg],

    beforeCreate () {
      this.Model = Media
      this.$service = mediasService
    },

    watch:{
      current(){
        clearTimeout(this.timeOut)       
        this.timeOut = setTimeout(() => {
          if(this.xMedia < this.items[this.xItem].medias.length - 1) {
            this.xMedia++
          }else{
            this.xMedia = 0
            if(this.xItem < this.items.length - 1) {
              this.xItem++
            }else{
              this.xItem = 0
            }
          }
        },this.current.time)
      }
    },

    computed:{
      current(){
        if(this.items.length > 0){
          const item = this.items[this.xItem]
          if(isArray(item.medias) && item.medias.length > 0){
            return item.medias[this.xMedia]
          }
        }
        return undefined
      },
    },
    
    mounted () {
      this.list()
    },
}
</script>

<style scoped lang="scss">

*{
  margin: 0 !important;
  padding: 0 !important;
  box-sizing: border-box;
}

.content{
  max-width: 100%;
  max-height: 100%;
}

.content,.video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content, img {
  width: 100vw;
  height: 100vh;
  object-fit: contain !important;
  background-size: cover !important;
}



</style>