import Vue from 'vue'
import { Timestamp } from 'firebase/firestore'

export default Vue.extend({
  filters: {
    formatDate: (v) => {
      if (v) {
        if (v.nanoseconds && !(v instanceof Timestamp)) {
          v = new Timestamp(v.seconds, v.nanoseconds)
        }
        if (v instanceof Timestamp) {
          v = v.toDate()
        }
        if (Number.isInteger(v)) {
          v = new Date(v)
        }
        if (v instanceof Date) {
          v = v.toISOString().split('T')[0]
        }
        const [y, m, d] = v.split('-')
        return `${d}/${m}/${y}`
      }
      return v
    },
  },
})
