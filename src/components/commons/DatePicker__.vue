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
        :disabled="disabled"
        :label="label"
        :rules="computedRules"
        append-icon="mdi-calendar"
        autocomplete="off"
        :outlined="outlined"
        return-masked-value
        mask="##/##/####"
        @blur="inputVal = parseDate(dateFormatted)"
        v-on="on"
      />
      <!-- <p>Date in ISO format: <strong>{{ inputVal }}</strong></p> !-->
    </template>
    <v-date-picker v-model="inputVal" :allowed-dates="allowedDates" no-title @input="picker = false" />
  </v-menu>
</template>

<script>
import BindModel from '../mixers/BindModel'

export default {
  mixins: [BindModel],

  props: {
    rules: { type: Array, default: undefined },
    label: { type: String, required: true },
    min: { type: String, default: '' },
    max: { type: String, default: '' },
    readonly: Boolean,
    outlined: Boolean,
    disabled: Boolean,
  },

  data () {
    return {
      picker: false,
      dateFormatted: '',
    }
  },

  computed: {
    computedDateFormatted () {
      return this.formatDate(this.inputVal)
    },
    computedRules () {
      const rules = [
        (v) => {
          const [d, m, y] = v.split('/')
          return this.allowedDates(`${y}-${m}-${d}`) || 'Data ínvalida.'
        },
      ]
      if (this.rules) {
        rules.push(...this.rules)
      }
      return rules
    },
  },

  watch: {
    inputVal () {
      this.dateFormatted = this.formatDate(this.inputVal)
    },
  },

  methods: {

    setDate (date) {
      this.inputVal = date
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

    allowedDates (val) {
      const self = this
      function minRule () {
        const minDate = new Date(self.min)
        const date = new Date(val)
        return minDate <= date
      }

      function maxRule () {
        const maxDate = new Date(self.max)
        const date = new Date(val)
        return maxDate >= date
      }

      if (this.min && this.max) {
        return minRule() && maxRule()
      } else if (this.min) {
        return minRule()
      } else if (this.max) {
        return maxRule()
      }
      return true
    },
  },
}
</script>
