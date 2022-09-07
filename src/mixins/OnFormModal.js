import _ from 'lodash'

import { planeObject } from '@/utils'
import { FirestoreCrudService } from '@/firebase/FirestoreCrudService'
import { FirestoreData } from '@/firebase/FirestoreData'

import ModalBase from './components/ModalBase.vue'
import OnMsg from './OnMsg'

export default {

  components: {
    ModalBase,
  },

  mixins: [OnMsg],

  data: () => ({
    isOpen: false,
    target: {},
    isUpdate: false,
    persistent: true,
    saving: false,
    edited: false,
    loading: true,
    loaded: false,
    key: new Date().getTime(),
    hideFooter: true,
  }),

  computed: {
    title () {
      return this.isUpdate ? 'Editar' : 'Adicionar'
    },
  },

  watch: {
    target: {
      deep: true,
      handler () {
        this.edited = true
      },
    },
  },

  created () {
    if (!this.$service) {
      console.error('Service don\'t defined. Please set this.$service in component\'s beforeCreate that use OnFormModal mixin.')
    } else if (!(this.$service instanceof FirestoreCrudService)) {
      console.error('$service must be instance of FirestoreCrudService')
    }
    if (!this.Model) {
      console.error('Model don\'t defined. Please set this.Model in component\'s beforeCreate that use OnFormModal mixin.')
    } else if (this.Model.prototype instanceof FirestoreData) {
      this.target = new this.Model()
    } else {
      console.error('Model must be instance of FirestoreData, or a class that extends FirestoreData')
    }
  },

  methods: {
    beforeOpen () {

    },
    
    async open (objOrId = {}, load = true) {
      try {
        if (!(this.$service instanceof FirestoreCrudService)) {
          throw new TypeError('$service must be instance of FirestoreCrudService')
        }
        load = objOrId && !objOrId.fancy
        this.beforeOpen()
        this.loading = true
        this.isOpen = true
        this.$emit('open')
        if (this.Model instanceof FirestoreData) {
          this.target = new this.Model()
        }
        this.isUpdate = false
        this.saving = false
        this.hideFooter = true
        if (!load) {
          this.target = _.merge(this.target, planeObject(objOrId))
          if (this.target.fancy) {
            this.target._id = ''
          }
          this.isUpdate = !!this.target._id
        } else if (objOrId && (
          (typeof objOrId._id === 'string' && objOrId._id) ||
        typeof objOrId === 'string')) {
          this.isUpdate = true
          this.target = await this.$service.get(objOrId._id || objOrId)
        }
        await this.afterLoad()
        await this.$nextTick()
        this.$refs.form && this.$refs.form.resetValidation()
        setTimeout(() => {
          this.edited = !!this.target.fancy
          this.hideFooter = false
        }, 300)
      } catch (err) {
        this.isOpen = false
        this.errorSnack()
        console.error(err)
      } finally {
        this.loading = false
        this.formLoaded && this.formLoaded()
      }
    },

    submit (close = true) {
    // Validate a form before save
      if (!this.edited && this.target._id) {
        this.infoSnack('Nada foi alterado.')
        return true
      }
      if (this.validateForm()) {
        return this.save(close)
      }
      return false
    },

    async afterLoad () {
      return Promise.resolve()
    },

    validateForm () {
      if (!this.$refs.form.validate()) {
        this.warnSnack('Preencha os campos obrigatórios.')
        return false
      }
      return true
    },

    mergeData (data) {
      this.target = _.merge(this.target, data)
    },

    close () {
      this.isOpen = false
      this.loading = true
      this.$emit('close')
    },

    handlerClose () {
      if (!this.edited || (this.edited &&
      window.confirm('Você tem certeza? Dados serão perdidos.'))) {
        this.close()
      }
    },

    async save (close = true) {
      try {
        this.saving = true
        delete this.target.fancy
        this.beforeSave && await this.beforeSave()
        const saved = await this.$service.save(this.target, this.isUpdate)
        this.$emit('saved', saved)
        this.$emit('change', false)
        if (close) {
          this.close()
          this.successSnack('Dados salvos com sucesso!')
        } else {
          this.mergeData(saved)
        }
        this.edited = false
        this.isUpdate = true
        return saved
      } catch (err) {
        this.errorSnack()
        console.error('Falha ao savar', err)
      } finally {
        this.saving = false
      }
    },
  },
}