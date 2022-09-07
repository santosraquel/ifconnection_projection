<template>
  <v-btn
    class="btn-login pl-0"
    :height="30"
    :color="color"
    :dark="dark"
    :disabled="disabled"
    v-bind="isLoading"
    depressed
    @click.capture="click"
    @click.capture.native="click"
  >
    <v-img
      class="mr-3"
      :src="src"
      :max-width="30"
    />
    <span>{{ $vuetify.breakpoint.xs ? 'Conectar' : title }}</span>
  </v-btn>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    dark: Boolean,
    disabled: Boolean,
    loading: Boolean,
  },

  computed: {
    isLoading () {
      if (this.loading) { return { loading: true, width: 40, fab: true } }
      return { rounded: true }
    },
    ghost () {
      return this.disabled || this.loading
    },
  },

  methods: {
    click (e) {
      if (this.ghost) {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
      } else { this.$emit('click', e) }
    },
  },
}
</script>

<style lang="scss">
.btn-login {
  span {
    text-transform: none;
    font-size: 16px;
  }

  &.v-btn--disabled {
    .v-image {
      filter: grayscale(100%);
    }
  }
}
</style>
