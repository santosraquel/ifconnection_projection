<template>
  <v-card :elevation="12" class="pa-5">
    <v-card-text v-if="loading" class="text-center">
      <v-progress-circular
        size="60"
        indeterminate
        color="primary"
      />
    </v-card-text>

    <v-card-text v-else class="text-center subtitle-1 grey--text text--darken-1">
      <template v-if="!success">
        <h2 class="mb-25">
          Recuperação de senha
        </h2>
        <p class="mb-30">
          Vamos definir uma nova senha, <br>
          informe o E-mail utilizado no login
        </p>

        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            outlined
            mask="###.###.###-##"
            :rules="[rules.required, rules.email]"
            label="E-mail"
            @keydown.enter.prevent="submit"
          />
        </v-form>
      </template>

      <template v-else>
        <h3 class="mb-25">
          Quase lá...
        </h3>

        <p class="mb-30">
          Enviamos um e-mail para "{{ email }}", siga suas instruções para definir sua nova senha.
        </p>
      </template>

      <v-alert
        :value="Boolean(errorMessage)"
        color="error"
        outlined
      >
        {{ errorMessage }}
      </v-alert>
    </v-card-text>

    <v-card-actions v-if="!loading">
      <v-spacer />
      <v-btn
        color="primary"
        :text="!success"
        to="/login"
      >
        {{ success ? 'Ok, ':'' }}Fazer login
      </v-btn>
      <v-btn
        v-if="!success"
        color="accent"
        :loading="loading"
        @click.native="submit"
      >
        {{ btnText }}
      </v-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script>
import { authService } from '@/app/auth/AuthService.js'

export default {
  layout: 'login',

  data () {
    return {
      btnText: 'Continuar',
      loading: false,
      email: '',
      success: false,
      errorMessage: '',
      valid: false,
      rules: {
        required: value => !!value || 'Campo obrigatório.',
        email: v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || ('Deve ser um endereço válido.'),
      },
    }
  },

  head () {
    return {
      title: 'Recuperar senha',
    }
  },

  mounted () {
  },

  methods: {
    submit () {
      this.errorMessage = ''
      if (!this.$refs.form.validate()) {
        return // Form error
      }
      this.loading = true
      const self = this
      authService.sendPasswordResetEmail(this.email)
        .then(function () {
          self.success = true
          self.loading = false
        })
        .catch(function (error) {
          self.loading = false
          self.success = false
          console.error(error)
          self.errorMessage = 'Oops. Algo de errado, verifique o E-mail e tente novamente.'
        })
    },
  },
}
</script>
