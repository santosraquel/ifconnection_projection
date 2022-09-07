<template>
  <v-menu
    v-model="showMenu"
    :position-x="x"
    :position-y="y"
    absolute
    offset-y
  >
    <slot />
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    showMenu: false,
    x: 0,
    y: 0,
  }),

  methods: {
    open (e) {
      e.preventDefault()
      this.showMenu = false
      this.x = e.clientX
      this.y = e.clientY
      this.$nextTick(() => {
        this.showMenu = true
      })
    },
    close () {
      this.showMenu = false
    },
  },
}
</script>
