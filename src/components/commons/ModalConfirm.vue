<template>
  <v-dialog
    v-model="valueModel"
    :max-width="maxWidth"
    scrollable
    persistent
  >
    <v-card>
      <v-toolbar dark color="primary" flat class="mb-5">
        <v-toolbar-title> {{ title }}</v-toolbar-title>
      </v-toolbar>

      <v-card-text :style="{ height }">
        <slot />
      </v-card-text>

      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          @click="submit('cancel', $event)"
        >
          {{ cancelBtnText }}
        </v-btn>
        <v-btn
          :color="confirmBtnColor"
          depressed
          :disabled="confirmBtnDisabled"
          @click="submit('confirm', $event)"
        >
          {{ confirmBtnText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    maxWidth: {
      type: String,
      default: '400px',
    },
    title: {
      type: String,
      default: '',
    },
    titleClass: {
      type: [String, Array],
      default: '',
    },
    height: {
      type: String,
      default: '',
    },
    cancelBtnText: {
      type: String,
      default: 'Cancelar',
    },
    confirmBtnColor: {
      type: String,
      default: 'primary',
    },
    confirmBtnText: {
      type: String,
      default: 'OK',
    },
    confirmBtnDisabled: Boolean,
    // v-model
    value: Boolean,
  },

  computed: {
    valueModel: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      },
    },
  },

  methods: {
    submit (val, event) {
      this.valueModel = false
      this.$emit(val, event)
    },
  },
}
</script>
