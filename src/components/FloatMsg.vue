<template>
  <v-snackbar
    v-model="snackbar"
    :color="popup.type"
    right
  >
    <!-- eslint-disable-next-line vue/no-v-html -->
    <span v-html="popup.msg" />
    <v-btn
      icon
      @click="snackbar = false"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
import { getAppModule } from '@/store'

export default {

  computed: {
    snackbar: {
      get () {
        const appModule = getAppModule(this.$store)
        return appModule.popup.status
      },
      set (bool) {
        const appModule = getAppModule(this.$store)
        appModule.setBoolPopup(bool)
      },
    },

    popup () {
      const appModule = getAppModule(this.$store)
      return appModule.popup
    },
  },
}
</script>
