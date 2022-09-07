<template>
  <v-menu
    v-model="picker"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template #activator="{ on }">
      <v-text-field
        v-model="dateFormatted"
        v-mask="'##/##/####'"
        :disabled="disabled"
        :label="label"
        append-icon="mdi-calendar"
        autocomplete="off"
        :rules="rules"
        :outlined="outlined"
        return-masked-value
        :hide-details="hideDetails"
        @blur="modelValue = parseDate(dateFormatted)"
        v-on="on"
      />
      <!-- <p>Date in ISO format: <strong>{{ value }}</strong></p> !-->
    </template>
    <v-date-picker v-model="modelValue" no-title @input="picker = false" />
  </v-menu>
</template>

<script>

import { mask } from 'vue-the-mask'

import { OnModel } from '@/mixins'

export default {
  directives: { mask },

  mixins: [OnModel],

  props: {
    value: { type: String, default: '' },
    rules: { type: Array, default: undefined },
    label: { type: String, default: '' },
    min: { type: String, default: '' },
    max: { type: String, default: '' },
    readonly: Boolean,
    outlined: Boolean,
    disabled: Boolean,
    hideDetails: Boolean,
  },

  data () {
    return {
      picker: false,
      dateFormatted: '',
    }
  },

  watch: {
    value: {
      immediate: true,
      handler () {
        this.dateFormatted = this.formatDate(this.value)
      },
    },
  },

  methods: {

    setDate (date) {
      this.value = date
    },

    formatDate (date) {
      if (!date) { return null }

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },

    parseDate (date) {
      if (!date) { return null }

      const [day, month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
  },
}
</script>
