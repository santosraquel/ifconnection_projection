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
      <nuxt />
    </v-main>

    <!-- popup: msg -->
    <float-msg />
  </v-app>
</template>

<script>
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

// .bgToolbar{
//     background-image: linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12);
// }
</style>
