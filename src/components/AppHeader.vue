<template>
  <v-app-bar
    app
    absolute
    color=""
    height="75px"
    dark
    class="colorHeader"
    :class="$vuetify.breakpoint.name"
    short
  >
    <v-app-bar-nav-icon v-if="isMobileMenu" @click.stop="drawer = !drawer" />
    <v-toolbar-title class="appLogo">
      <a href="/">
        <h1>
          <img
            alt=""
            src="@/assets/img/logoBranco.png"
          >
        </h1>
      </a>
    </v-toolbar-title>
    <v-spacer />
    <v-btn
      text
      class="mt-2 mr-2 mb-2"
      depressed
      to="/singup"
    >
      Cadastrar-se
    </v-btn>
    <v-btn
      text
      rounded
      outlined
      depressed
      :style="{
        border: '1px solid white',
        borderRadius: '15px'
      }"
      to="/dashboard"
      color="white"
    >
      <v-icon color="white" weight>
        mdi-account
      </v-icon>
      Entrar
    </v-btn>
  </v-app-bar>
</template>

<script>

export default {
  props: {
    value: { type: Boolean, required: true },
    isMobileMenu: Boolean,
  },

  computed: {
    mobile () {
      return this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm'
    },
    drawer: {
      get () {
        return this.value
      },
      set (v) {
        this.$emit('input', v)
      },
    },
  },

}
</script>

<style lang="scss">
.v-app-bar {
  .appLogo {
    margin-left: 100px;
    h1 {
      padding: 0;
    }
    a {
      text-decoration: none;
      display: block;
      height: 100%;
    }
    img {
      padding-top: 10px;
      height: 70px;
    }
  }
  .v-toolbar__content {
    padding-bottom: 0;
    #mainMenu {
      position: relative;
      bottom: -17px;
    }
  }
}

.colorHeader{
  background-image: linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12);

}
</style>
