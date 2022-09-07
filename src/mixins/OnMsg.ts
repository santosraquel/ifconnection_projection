import Vue from 'vue'
import { getAppModule } from '@/store'

export default Vue.extend({
  methods: {
    onMsg (msg: string, type = 'warning') {
      return getAppModule(this.$store).setPopup({
        msg,
        type,
        status: true,
      })
    },

    successSnack (msg = 'Operação realizada com sucesso') {
      this.onMsg(msg, 'success')
    },

    infoSnack (msg = 'Operação finalizada') {
      this.onMsg(msg, 'info')
    },

    warnSnack (msg = 'Oops... Algo estranho') {
      this.onMsg(msg, 'warning')
    },

    errorSnack (msg = 'Oops... Algo de errado.') {
      this.onMsg(msg, 'error')
    },
  },
})
