<template>
  <v-combobox
    v-model="selected"
    :items="years"
    :value="years"
    item-value="value"
    item-text="text"
    :return-object="true"
    label="Ano"
    dense
    @change="change"
  />
</template>

<script>
export default ({

  data: () => ({
    selected: new Date().getFullYear(),

  }),

  computed: {
    years () {
      const years = []
      const date = new Date() // pegar data atual
      const currentYear = date.getFullYear() // pegar ano atual
      for (let year = currentYear - 5; year <= currentYear + 5; year++) {
        years.push(year)
      }
      return years
    },
  },

  created () {
    this.change()
  },

  methods: {
    change () {
      if (this.selected) {
        this.$emit('change', this.selected)
      }
    },
  },

})
</script>
