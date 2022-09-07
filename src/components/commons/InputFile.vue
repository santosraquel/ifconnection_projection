<template>
  <v-card
    class="input-file"
    :ripple="step === 1 && !isDisabled"
    :disabled="disabled"
    light
    outlined
    @dragenter="OnDragEnter"
    @dragleave="OnDragLeave"
    @dragover.prevent
    @drop="onDrop"
    @click="(step === 1 && !isDisabled) && $refs.file.click()"
  >
    <v-card-text
      :style="{ minHeight }"
      :class="[
        'd-flex pa-0',
        step === 1 && 'flex-column align-center justify-center'
      ]"
    >
      <template v-if="step === 1">
        <v-icon large>
          mdi-cloud-upload
        </v-icon>
        <span class="input-file--text">
          <slot />
        </span>
      </template>
      <template v-else-if="step === 2">
        <v-overlay
          :value="isDisabled"
          :z-index="4"
          absolute
        >
          <v-progress-circular
            :size="70"
            :width="7"
            color="primary"
            indeterminate
          />
        </v-overlay>

        <v-row
          no-gutters
          align-content="center"
        >
          <v-tooltip
            v-for="(item, i) in internalVal"
            :key="i"
            :disabled="!errors[i]"
            color="error"
            bottom
          >
            <template #activator="{ on }">
              <v-chip
                :color="errors[i] ? 'error' : ''"
                class="ma-2"
                close-icon="mdi-delete"
                close
                @click:close="$delete(internalVal, i); $delete(errors, i)"
                v-on="on"
              >
                <v-chip
                  color="warning"
                  class="mr-2"
                  :input-value="true"
                  label
                  x-small
                >
                  {{ item.extension }}
                </v-chip>
                {{ item.name }}
              </v-chip>
            </template>
            <span>{{ errors[i] }}</span>
          </v-tooltip>
        </v-row>
      </template>
      <v-expand-transition>
        <div
          v-if="step === 3"
          class="dragging d-flex flex-column align-center justify-center transition-fast-in-fast-out input-file--text"
        >
          <p>Concluído</p>
          <v-icon
            color="success"
            large
          >
            mdi-check-all
          </v-icon>
        </div>
      </v-expand-transition>

      <input
        ref="file"
        type="file"
        style="display: none;"
        multiple
        :accept="accept"
        @change="onFileChange($event.target.files)"
      >
      <v-expand-transition>
        <div
          v-if="!isDisabled && step === 1 && isDragging"
          class="dragging d-flex flex-column align-center justify-center transition-fast-in-fast-out input-file--text"
        >
          <p>Pode saltar</p>
          <v-icon
            color="#fff"
            large
          >
            mdi-upload
          </v-icon>
        </div>
      </v-expand-transition>
    </v-card-text>
    <v-card-actions
      v-if="isInternalVal"
      class="pa-4"
    >
      <span
        :class="[
          'caption',
          isLimitFile && 'error--text'
        ]"
      >{{ internalVal.length }}/{{ limitFile }}</span>
      <v-spacer />
      <v-btn
        text
        :disabled="isDisabled"
        :loading="isDisabled"
        @click="clearAll"
      >
        Limpar
      </v-btn>
      <v-btn
        :disabled="isErrors || isLimitFile || isDisabled"
        :loading="isDisabled"
        color="primary"
        @click="uploadFile"
      >
        Fazer Upload
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import firestorage from '@/firebase/firestorage'
import { OnMsg } from '@/mixins'

export default {
  mixins: [OnMsg],

  props: {
    minHeight: {
      type: [String, Number],
      default: '400px',
    },
    type: {
      type: String,
      default: 'image',
      validator: val => ['image', 'video', 'pdf', 'all'].includes(val),
    },
    maxSizeFile: {
      type: Number,
      default: 5,
    },
    limitFile: {
      type: Number,
      default: 1000,
    },
    paste: {
      type: String,
      default: 'tests',
    },
    disabled: Boolean,

    // v-model
    value: {
      type: Array,
      default () { return [] },
    },
  },

  data: () => ({
    step: 1,
    loading: false,
    done: false,

    isDragging: false,
    dragCount: 0,

    internalVal: [],
    errors: [],
  }),

  computed: {
    valueModel: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      },
    },

    isDisabled () {
      return this.loading || this.disabled
    },

    isInternalVal () {
      return this.step === 2 && this.internalVal.length > 0
    },

    isLimitFile () {
      if (this.internalVal.length > this.limitFile) {
        return true
      }
      return false
    },

    isErrors () {
      if (this.isInternalVal) {
        let result = false

        for (let i = 0; i < this.errors.length; i++) {
          if (typeof this.errors[i] === 'string') {
            result = true
            break
          }
        }

        return result
      }

      return false
    },

    accept () {
      switch (this.type) {
        case 'image': return '.jpg, .jpeg, .png'
        case 'video': return '.mp4'
        case 'pdf': return '.pdf'
        default: return ''
      }
    },
  },

  watch: {
    internalVal (val) {
      if (val.length === 0) {
        this.errors = []
        this.clearAll()
      }
    },
  },

  methods: {
    OnDragEnter (e) {
      e.preventDefault()

      this.dragCount++
      this.isDragging = true
    },
    OnDragLeave (e) {
      e.preventDefault()
      this.dragCount--
      if (this.dragCount <= 0) {
        this.isDragging = false
      }
    },
    onDrop (e) {
      e.preventDefault()
      e.stopPropagation()
      this.isDragging = false

      if (this.step === 1) {
        this.onFileChange(e.dataTransfer.files)
      }
    },

    onFileChange (files) {
      if (this.disabled) {
        this.onMsg('Não pode enviar arquivo com o campo bloqueado!', 'error')
        this.internalVal = []
      } else if (files.length > 0) {
        Object.values(files).forEach((el, i) => {
          const size = el.size / 1024 / 1024
          const extension = `.${el.type.split('/')[1]}`

          this.errors[i] = false
          if (size > this.maxSizeFile) {
            this.errors[i] = `Arquivo é muito grande! Permitido apenas: ${this.maxSizeFile}MB`
          }
          if (this.type !== 'all') {
            const accept = this.accept.split(', ')

            if (!accept.includes(extension)) {
              this.errors[i] = `Arquivo inválido! somente: ${this.accept}`
            }
          }

          this.internalVal.push({ file: el, name: el.name, extension })
        })

        this.step = 2
      } else {
        this.onMsg('Selecione um arquivo para upload')
        this.internalVal = []
      }
    },

    async uploadFile () {
      this.loading = true
      this.done = false

      for (let i = 0; i < this.internalVal.length; i++) {
        try {
          const data = await this.changeStorageRef(`${this.paste}/${this.internalVal[i].name}`, this.internalVal[i].file)

          this.done = true
          this.valueModel.push(data)
        } catch (err) {
          console.error(err)
          this.valueModel = []
          this.done = false

          this.onMsg('Ops! Algo deu errado no Servidor, tente novamente ou atualize a página', 'error')
          break
        }
      }
      this.loading = false

      if (this.done) {
        this.step = 3

        setTimeout(() => {
          this.internalVal = []
        }, 400)
      }
    },

    changeStorageRef (pathFile, file) {
      return new Promise((resolve, reject) => {
        firestorage.ref(pathFile).put(file)
          .then((snapshot) => {
            snapshot.ref.getDownloadURL()
              .then(url => resolve(url))
              .catch(err => reject(err))
          }).catch((err) => {
            reject(err)
          })
      })
    },

    clearAll () {
      this.initFile()
      // case-sensive
      setTimeout(() => { this.step = 1 }, 400)
    },

    initFile () {
      this.$refs.file.value = ''
      this.isDragging = false
      this.dragCount = 0
    },
  },
}
</script>

<style lang="scss">
.input-file {
  .dragging {
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 0;
    border-radius: 4px;
    background-color: #dadada !important;

    &.input-file--text {
      color: #72777d;
    }
  }

  .input-file--text {
    user-select: none;
    font-size: 1.3rem;
    color: #72777d;
  }

  .v-card__text {
    overflow-y: auto;
  }
}
</style>
