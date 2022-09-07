<template>
  <v-app>
    <!-- header -->
    <sidebar-menu />
    <!-- <header-toolbar
      :title="title"
      class="bgToolbar"
    /> -->

    <!-- main -->
    <v-main id="appMain">
      <nuxt class="nuxt"/>

      <nuxt-link to="/medias" :prefetch="false" />

    </v-main>

    <!-- popup: msg -->
    <float-msg />
  </v-app>
</template>

<script>
import { mediasService } from '@/app/medias/MediasService'
export default {
  components: {
    SidebarMenu: () => import('@/components/SidebarMenu.vue'),
    // HeaderToolbar: () => import('@/components/HeaderToolbar.vue'),
    FloatMsg: () => import('@/components/FloatMsg.vue'),
  },

  middleware: 'authenticate',

  data () {
    return {
      // title: process.env.shortTitle,
    }
  },
}
</script>

<style lang="scss">
#appMain .v-main__wrap {
  padding-left: 56px;
}

.nuxt{
  max-width: 100% !important;
  max-height: 100% !important;
}

// .bgToolbar{
//     background-image: linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12);
// }
</style>
