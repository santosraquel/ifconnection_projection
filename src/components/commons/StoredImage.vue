<template>
  <img
    :src="imageURL"
  >
</template>

<script>
import { OnModel } from '@/mixins'
import { downloadFile } from './upload/downloadFile'

export default {

  mixins: [OnModel],

  props: {
    src: { type: String, required: true },
  },

  data: () => ({
    imageURL: '',
  }),

  watch: {
    src: {
      immediate: true,
      async handler (v) {
        this.imageURL = await downloadFile(v)
      },
    },
  },
}
</script>
