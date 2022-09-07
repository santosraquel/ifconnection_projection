import Vue from 'vue'
import { arraySearch } from '@/utils'

export default Vue.extend({

  props: {
    value: { type: [Object, Array, String], default: () => (undefined) },
    rules: { type: Array, required: false, default: () => (undefined) },
    label: { type: String, default: '' },
    disabled: Boolean,
    hideDetails: Boolean,
    multiple: Boolean,
    autofocus: Boolean,
    chips: Boolean,
    outlined: Boolean,
    changeOnly: Boolean,
    itemDisabled: { type: [Array, String, Function], default: () => (undefined) },
  },

  data: () => ({
    items: [],
    loading: false,
    search: null,
    serverSearch: true,
  }),

  computed: {
    modelValue: {
      get () {
        if (this.value && !this.value._id) {
          return ''
        }
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      },
    },
  },

  watch: {
    search (v) {
      clearTimeout(this.timeout)
      // Avoid initial search
      if (this.value && (this.search === this.value ||
        this.search === this.value.label)) { return }

      // Debonce timeout
      this.timeout = setTimeout(() => {
        this.list(v)
      }, 500)
    },
  },

  created () {
    if (!this.$service) {
      console.error('Service don\'t defined. Please set this.$service in component\'s beforeCreate that use OnAutocomplete mixin.')
    }
    if (this.value) {
      if (!Array.isArray(this.value)) {
        this.pushItem(this.value)
      } else {
        for (const item of this.value) {
          this.pushItem(item)
        }
      }
    }
  },

  methods: {
    async list (query) {
      try {
        if ((this.modelValue && query === this.modelValue.label)) { return }
        this.loading = true
        const list = this.serverSearch
          ? await this.$service.list({ search: query })
          : await this.$service.list()
        this.items = list.items
      } catch (err) {
        console.error(err)
      }
      this.loading = false
    },

    /**
     * Push references or object item
     */
    pushItem (item) {
      if (item._id) {
        this.items.push(item)
      } else if (item) {
        this.items.push({ _id: item, label: item })
      }
    },

    removeItem (item) {
      const index = arraySearch('_id', item._id, this.modelValue, true)
      if (index >= 0) { this.modelValue.splice(index, 1) }
    },

    openForm (_id) {
      this.$refs.form.open(_id)
    },

    addSaved (item) {
      this.items.push(item)
      this.modelValue = item
      this.$emit('change')
    },
  },
})
