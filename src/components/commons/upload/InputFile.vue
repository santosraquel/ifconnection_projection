<template>
  <div>
    <fieldset>
      <legend>{{ label }}</legend>
      <template v-if="!uploading">
        <input
          v-show="false"
          ref="inputFile"
          type="file"
          :path="path"
          :accept="accept"
          @change="upload()"
        >
        <v-btn
          dark
          color="primary"
          class="mr-5 pa-3"
          @click="openPicker()"
        >
          <v-icon
            class="mr-1"
          >
            folder
          </v-icon>
          {{ modelValue ? 'alterar': 'selecionar' }}
        </v-btn>
        <v-btn
          color="primary"
          class="pa-3"
          :disabled="!modelValue"
          @click="openView()"
        >
          <v-icon
            class="mr-1"
          >
            visibility
          </v-icon>
          Visualizar
        </v-btn>
        <div v-if="error" class="mt-2">
          <span class="errorMessage">{{ errorMessage }}</span>
        </div>
        <modal-viwer
          v-model="viewPath"
          @openPicker="openPicker"
        />
      </template>

      <template v-else>
        <v-row>
          <v-col
            cols="12"
            md="3"
          >
            Enviando arquivo
          </v-col>
          <v-col
            cols="12"
            md="6"
            class="mt-1"
          >
            <v-progress-linear
              color="grey"
              indeterminate
              rounded
              height="10"
            />
          </v-col>
          <v-col
            cols="12"
            md="3"
            icon
            dark
          >
            <v-icon
              class="buttonCancelFile"
            >
              cancel
            </v-icon>
          </v-col>
        </v-row>
      </template>
    </fieldset>
  </div>
</template>

<script>
// import path from 'path'
import { OnModel, OnMsg } from '@/mixins'
import { upload } from './upload'
import ModalViwer from './ModalViwer.vue'

export default {
  components: {
    ModalViwer,
  },

  mixins: [OnModel, OnMsg],

  props: {
    value: { type: String, required: true },
    label: { type: String, required: true },
    accept: { type: String, default: '' },
    path: { type: String, default: '' },
  },

  data: () => ({
    downloadURL: '',
    loading: true,
    uploading: false,
    viewPath: '',
    errorMessage: '',
    error: false,

  }),

  methods: {
    async upload () {
      try {
        const file = this.$refs.inputFile.files[0]
        if (!this.isValidFile(file)) {
          return
        }
        this.uploading = true
        this.viewPath = ''
        await upload(file, this.path)
        this.modelValue = this.path
        this.uploading = false
      } catch (e) {
        this.errorSnack()
        console.log(e)
      } finally {
        this.modelValue = this.path
        this.uploading = false
      }
    },

    isValidFile (file) {
      const extensionFile = file.name.split('.').pop() // pegando a extensão do arquivo
      const accepts = this.accept.split(',').map((item) => {
        item = item.replace('.', '')
        return item
      })

      if (accepts.includes(extensionFile)) {
        this.error = false
        return true
      } else {
        this.errorMessage = `Somente arquivos com extensão ${accepts} são permitidos! `
        this.error = true
        return false
      }
    },

    openPicker () {
      this.$refs.inputFile.click()
    },

    openView () {
      this.viewPath = this.modelValue
    },
  },
}
</script>

<style lang="scss">
  .errorMessage{
    color: red;
  }
</style>
