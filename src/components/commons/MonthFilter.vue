<template>
  <v-col>
    <v-row>
      <v-col cols="4">
        <year-filter
          v-model="year"
          @change="(v) => year = v"
        />
      </v-col>
      <v-col cols="8">
        <v-combobox
          v-model="selected"
          :items="items"
          item-value="value"
          item-text="text"
          :return-object="true"
          label="Mês"
          clearable
          hide-details
          dense
        >
          <template slot="append-outer">
            <v-menu
              v-if="fields.length !== 1"
              bottom
              origin="center center"
              transition="scale-transition"
            >
              <template #activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  v-bind="attrs"
                  icon
                  :style="{position:'relative',top:'-6px'}"
                  v-on="on"
                >
                  <v-icon>mdi-dots-vertical </v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item
                  v-for="(item, i) in fields"
                  :key="i"
                  link
                  @click="field = item"
                >
                  <v-badge
                    color="pink"
                    dot
                    :value="item === field"
                  >
                    <v-list-item-title>{{ item | header(headers) }}</v-list-item-title>
                  </v-badge>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-combobox>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import { arraySearch } from '@/utils'
import { putZero } from '@/utils/putZero'
import YearFilter from './YearFilter.vue'

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]
export default {
  components: { YearFilter },

  filters: {
    header: (v, headers) => {
      if (!v) { return }
      const item = arraySearch('value', v, headers)
      return item ? item.text : v
    },
  },

  props: {
    headers: { type: Array, required: true },
    fields: { type: Array, required: true },
  },

  data: () => ({
    selected: null,
    start: '',
    end: '',
    field: '',
    search: '',
    year: '',
  }),

  computed: {
    items () {
      return months.map((item, indice = 0) => {
        return {
          text: item,
          value: indice,
          year: this.year,
        }
      })
    },

  },
  watch: {
    selected () {
      this.change()
    },

    year () {
      if (this.year) {
        this.change()
      }
    },

    field () {
      if (this.selected) {
        this.change()
      }
    },
  },

  created () {
    this.field = this.fields[0]
  },

  methods: {
    getDateStart () {
      const yyyy = this.year
      const mm = putZero(this.selected.value, 1)
      const dd = '01'
      return `${yyyy}-${mm}-${dd}`
    },

    getDateEnd () {
      const yyyy = this.year
      const mm = putZero(this.selected.value, 1)
      const dd = (new Date(yyyy, mm, 0)).getDate()
      return `${yyyy}-${mm}-${dd}`
    },

    change () {
      if (!this.selected) { return this.$emit('change') }
      this.start = this.getDateStart()
      this.end = this.getDateEnd()
      this.$emit('change', { start: this.start, end: this.end, field: this.field })
    },
  },

}
</script>
