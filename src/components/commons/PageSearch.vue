<template>
  <v-layout class="my-2">
    <v-text-field
      v-if="search"
      v-model="params.search"
      hide-details
      class="py-0"
      :outlined="outlined"
      :rounded="rounded"
      clearable
      :label="label"
      prepend-inner-icon="mdi-magnify"
    />
  </v-layout>
</template>

<script>

export default {

  props: {
    search: { type: Boolean },
    label: { type: String, required: true },
    outlined: Boolean,
    rounded: Boolean,
  },

  data: () => ({
    params: {
      search: null,
    },
  }),

  watch: {
    params: {
      deep: true,
      handler (v) {
        clearTimeout(this.timeOut)
        this.timeOut = setTimeout(() => {
          this.$emit('change', v)
        }, 500)
      },
    },
  },
}
</script>
