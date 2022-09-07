<template>
  <v-progress-linear v-if="!ready" indeterminate />
  <v-img v-else height="300px" contain :src="item.downloadUrl" />
</template>

<script>
import { getDownloadUrl } from '@/firebase/storage'

export default {
  props: {
    value: { type: Object, required: true },
  },

  computed: {
    item: {
      get () {
        return this.value
      },
      set (item) {
        this.$emit('input', item)
      },
    },

    ready () {
      return this.item.storagePath && this.item.downloadUrl
    },
  },

  watch: {
    async 'item.storagePath' (v) {
      console.log(v)
      if (this.item.storagePath && !this.item.downloadUrl) {
        this.item.downloadUrl = await getDownloadUrl(this.item.storagePath)
        delete this.item.uploading
      }
    },
  },
}
</script>
