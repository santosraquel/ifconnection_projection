<template>
  <v-dialog
    v-model="isOpen"
    max-width="50%"
  >
    <v-card>
      <v-toolbar
        color="primary"
        dark
        class="titleModal"
      >
        Relatório da Imagem
        <v-spacer />
        <v-btn icon @click="close()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-progress-linear
        v-if="loading"
        indeterminate
        color="primary"
      />
      <v-card-text
        class="pa-10"
      >
        <v-img
          v-if="!loading"
          contain
          max-height="100%"
          max-width="100%"
          :src="downloadURL"
          @load="loaded = true"
        >
          <v-row
            v-if="!loaded"
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="grey"
              :size="50"
            />
          </v-row>
        </v-img>
      </v-card-text>
      <v-divider />
      <v-card-actions class="justify-end">
        <v-btn
          dark
          color="primary"
          @click="$emit('openPicker')"
        >
          <v-icon
            class="mr-1"
          >
            folder
          </v-icon>
          Alterar arquivo
        </v-btn>
        <v-spacer />
        <v-btn
          outlined
          color="primary"
          @click="close()"
        >
          Fechar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { OnModel } from '@/mixins'
import { downloadFile } from './downloadFile'

export default {

  mixins: [OnModel],

  props: {
    value: { type: String, required: true },
  },

  data: () => ({
    isOpen: false,
    downloadURL: '',
    loading: true,
    loaded: false,
  }),

  watch: {
    modelValue: {
      immediate: true,
      async handler () {
        if (!this.modelValue) {
          this.isOpen = false
          return
        }
        this.isOpen = true
        this.loading = true
        this.downloadURL = await downloadFile(this.modelValue)
        this.loading = false
      },
    },
  },
  methods: {
    close () {
      this.modelValue = ''
    },
  },
}
</script>

<style lang="scss">
  .titleModal{
    font-size: 20px;
  }
</style>
