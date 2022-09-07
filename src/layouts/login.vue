<template>
  <v-app>
    <!-- main -->
    <v-main class="bg-body">
      <v-container
        class="fill-height bgContainer"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- popup: msg -->
    <float-msg />
  </v-app>
</template>

<script>
export default {
  components: {
    FloatMsg: () => import('@/components/FloatMsg.vue'),
  },
}
</script>

<style lang="scss" scoped>
// .bgContainer{
//   opacity: 0.9;
// }

.bg-body::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  // background-image: linear-gradient(to right bottom, #051937, #004d7a, #008793, #00bf72, #a8eb12);
  background-image: linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12);
  // background:#1C5C27;
//  background: url('~assets/img/bglogin.png') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  // opacity: 0.9;
}
</style>
