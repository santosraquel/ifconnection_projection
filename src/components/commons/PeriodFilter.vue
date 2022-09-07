<template>
  <div class="actions">
    <v-layout>
      <v-form ref="form">
        <v-row class="scale" no-gutters>
          <v-col cols="3" />
          <v-col cols="3">
            <date-picker
              v-model="period.start"
              label="Dt. Inicio"
              :rules="[rules.required]"
              hide-details
            />
          </v-col>
          <v-col cols="3">
            <date-picker
              v-model="period.end"
              label="Dt. Fim"
              :rules="[rules.required]"
              hide-details
            />
          </v-col>
          <v-col cols="3">
            <v-btn
              left
              color="blue-grey lighten-4"
              @click="_filter"
            >
              <v-icon small left>
                mdi-filter
              </v-icon>
              Filtrar
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-layout>
  </div>
</template>

<script>
import { OnRules } from 'vuetify-js-utils'
import DatePicker from './DatePicker.vue'

export default {
  components: { DatePicker },

  mixins: [OnRules],

  props: {
    filter: { type: Function, required: true },
    list: { type: Object, required: true },
  },

  data: () => ({
    period: {
      start: '',
      end: '',
    },
  }),

  created () {
    this.period.start = this.list.start
    this.period.end = this.list.end
  },

  methods: {
    _filter () {
      if (this.$refs.form.validate()) {
        this.filter(this.period)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .scale {
    transform: scale(.85);
    position: relative;
    left: 10%;
  }

  .v-btn {
    margin: 15px 0 0px 10px;
  }
</style>
