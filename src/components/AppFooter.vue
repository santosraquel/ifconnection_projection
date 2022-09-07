<template>
  <v-footer
    id="appFooter"
    color=""
    class="text-center colorFooter"
    :class="$vuetify.breakpoint.name"
    dark
  >
    <v-spacer />
    <span>
      <a href="/">
        <v-img
          contain
          max-width="150"
          class="my-2"
          alt=""
          src=""
        />
      </a>
    </span>
    <v-spacer />
  <span style="font-size: 14px; color: white;">
      Desenvolvido por Raquel Santos. &copy;{{ new Date().getFullYear() }} IfConnection&reg;
    </span>
    <v-spacer />

    <v-spacer />
  </v-footer>
</template>

<script>

export default {

}
</script>

<style lang="scss">
.colorFooter{
    background-image: linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12);

}
.v-footer.xs, .v-footer.sm {
  // display: block;
  bottom: 0;
  position: relative;
  .v-image {
    margin: 10px auto !important;
    height: 100%;
  }
}
#appFooter {
  color: black;
  background-position: bottom;
}

.span{
  background-color: white;
}
</style>
