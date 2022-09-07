<template>
  <v-app>
    <app-header />
    <!-- main -->
    <v-main class="bg-body" :class="$vuetify.breakpoint.name">
      <v-container
        class="fill-height"
        :scrollable="scrollable"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="12"
            md="6"
          >
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <app-footer />
    <!-- popup: msg -->
    <float-msg />
  </v-app>
</template>

<script>
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
// import Unsigned from './unsigned.vue'

export default {
  components: {
    FloatMsg: () => import('@/components/FloatMsg.vue'),
    AppFooter,
    AppHeader,
    // Unsigned,
  },

}
</script>

<style lang="scss">

.bg-body::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  // background: url('/bg-login.jpg') no-repeat center center fixed;
  background-color: #FFFFFF;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  opacity: .7;
}

</style>
