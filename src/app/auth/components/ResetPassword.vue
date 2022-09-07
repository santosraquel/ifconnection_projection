<template>
  <v-card id="loginCard" :elevation="12" class="pa-5">
    <v-card-text v-if="loading" class="text-center">
      <v-progress-circular
        size="60"
        indeterminate
        color="primary"
      />
    </v-card-text>
    <v-card-text v-else class="text-center subtitle-1 grey--text text--darken-1">
      <div v-if="success">
        <h3 class="mb-25">
          Sua nova senha foi definida!
        </h3>
      </div>

      <div v-else-if="invalidCode">
        <h3 class="mb-25">
          Link expirado
        </h3>

        <p class="mb-30">
          Parece que o seu link expirou ou já foi utilizado, caso ainda precise definir uma nova senha
          <n-link to="/auth/reset_password">
            solicite novamente.
          </n-link>
        </p>
      </div>

      <v-form v-else ref="form" v-model="valid" lazy-validation>
        <h2 class="mb-5">
          Definir nova senha
        </h2>

        <v-text-field
          v-model="password"
          outlined
          :append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
          :rules="[rules.required, rules.min6]"
          :type="showPass ? 'text' : 'password'"
          label="Nova senha"
          :disabled="loading"
          @input="notMatch = false"
          @keyup.enter="submit"
          @click:append="showPass = !showPass"
        />

        <v-text-field
          v-model="passwordConfirm"
          outlined
          :append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
          :rules="[rules.required, rules.min6, rules.passMatch]"
          :type="showPass ? 'text' : 'password'"
          label="Confirme a nova senha"
          :disabled="loading"
          @input="notMatch = false"
          @keyup.enter="submit"
          @click:append="showPass = !showPass"
        />
      </v-form>

      <v-alert
        :value="Boolean(errorMessage)"
        color="error"
        icon="warning"
        outlined
      >
        {{ errorMessage }}
      </v-alert>
    </v-card-text>

    <v-card-actions v-if="!loading">
      <v-spacer />
      <v-btn
        color="primary"
        :text="!(success || invalidCode)"
        to="/login"
      >
        {{ success ? 'Ok, ':'' }}Fazer login
      </v-btn>
      <v-btn
        v-if="!(success || invalidCode)"
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

import { auth } from '@/firebase/fireauth'
import { getUrlParam } from '@/utils'
import { confirmPasswordReset, verifyPasswordResetCode } from '@firebase/auth'

export default {
  data () {
    return {
      btnText: 'Salvar',
      password: '',
      passwordConfirm: '',
      valid: false,
      showPass: false,
      mode: false,
      loading: true,
      success: false,
      invalidCode: false,
      notMatch: false,
      errorMessage: '',
      rules: {
        required: value => !!value || 'Campo obrigatório.',
        min6: v => v.length >= 6 || 'Ao menos 6 caracteres.',
        passMatch: () => !this.notMatch || 'As senhas devem ser iguais.',
      },
    }
  },

  mounted () {
    this.actionCode = getUrlParam('oobCode')

    this.checkCode()
  },

  methods: {

    checkCode () {
      const self = this
      verifyPasswordResetCode(auth, this.actionCode)
        .then(() => {
          self.loading = false
          self.invalidCode = false
        }).catch(function (error) {
        // Try again
          console.error(error)
          self.invalidCode = true
          self.loading = false
        })
    },

    head () {
      return {
        title: 'Definir nova senha',
      }
    },

    submit () {
      this.errorMessage = ''
      // Check pass match
      this.notMatch = this.password !== this.passwordConfirm

      if (!this.$refs.form.validate()) {
        return // Form error
      }

      this.loading = true

      const self = this
      confirmPasswordReset(auth, this.actionCode, this.password)
        .then(function () {
          self.loading = false
          self.success = true
        }).catch(function (error) {
        // Error occurred during confirmation. The code might have expired or the
        // password is too weak.
          console.error(error)
          self.errorMessage = 'Oops! Algo de errado, tente novamente.'
        })
    },
  },
}
</script>
