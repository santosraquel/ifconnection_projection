<template>
  <v-app>
    <app-header id="appHeader" />
    <v-sheet
      id="appContent"
      class="overflow-y-auto"
      style="height: 100vh;"
    >
      <v-main :class="$vuetify.breakpoint.name">
        <nuxt />
      </v-main>
      <app-footer />
    </v-sheet>
  </v-app>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

export default {

  components: {
    AppHeader,
    AppFooter,
  },

  middleware: 'authenticate',

  data () {
    return {
    }
  },
}
</script>

<style lang="scss">
html, body, #app {
  overflow: hidden !important;
}
#appHeader {
  z-index: 50;
}
#appContent {
  background: var(--v-primary-lighten1);
  .v-main {
    padding-top: 70px !important;
    margin-bottom: 20px !important;
  }
}

.flexcard {
  display: flex !important;
  flex-direction: column !important;
}
</style>
