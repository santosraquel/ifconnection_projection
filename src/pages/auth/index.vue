<template>
  <v-card v-if="!mode" id="loginCard" class="elevation-12">
    <v-progress-circular
      size="60"
      indeterminate
      color="primary"
    />
  </v-card>
  <v-card v-else-if="invalidUrl" id="loginCard" class="elevation-12">
    <h3 class="mb-25">
      Link inválido...
    </h3>

    <p class="mb-30">
      Parece que essa url foi mal formatada,
      <n-link to="/auth/reset_password">
        solicite novamente
      </n-link>
    </p>
  </v-card>
  <reset-password v-else-if="mode === 'resetPassword'" />
</template>

<script>
import ResetPassword from '@/app/auth/components/ResetPassword'
import { firebaseConfig } from '@/firebase/configs'
import { getUrlParam } from '@/utils'

export default {
  name: 'NewPassword',
  components: { ResetPassword },
  layout: 'login',

  data () {
    return {
      btnText: 'Salvar',
      password: '',
      mode: false,
      invalidUrl: false,
      rules: {
        required: value => !!value || 'Campo obrigatório.',
        min6: v => v.length >= 6 || 'Ao menos 6 caracteres.',
      },
    }
  },

  mounted () {
    this.mode = getUrlParam('mode')

    // For now just reset Password are working
    if (this.mode !== 'resetPassword') { this.$router.push('/login') }

    const apiKey = getUrlParam('apiKey')
    if (firebaseConfig.apiKey !== apiKey) {
      this.invalidUrl = true
    }
  },
}
</script>
