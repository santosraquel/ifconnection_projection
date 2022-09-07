<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="email"
        outlined
        label="Email"
        :rules="[rules.required, rules.email]"
        :disabled="loading"
        @keyup.enter.prevent="submit"
        @input="notMatch = false"
      />

      <v-text-field
        v-model="password"
        outlined
        label="Senha"
        :append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
        :rules="[rules.required, rules.min6]"
        :type="showPass ? 'text' : 'password'"
        :disabled="loading"
        @input="notMatch = false"
        @keyup.enter.prevent="submit"
        @click:append="showPass = !showPass"
      />
      <v-alert
        :value="Boolean(errorMessage !== '')"
        color="error"
        icon="mdi-alert"
        outlined
      >
        {{ errorMessage }}
      </v-alert>
      <p class="text-left">
        <br>
        <v-btn
          :disabled="loading"
          style="text-transform: inherit"
          to="/auth/reset_password"
          nuxt
          text
          small
        >
          <v-icon
            color="primary"
            left
          >
            mdi-lock
          </v-icon>
          Esqueci minha senha
        </v-btn>
        <br>
        <v-btn
          :disabled="loading"
          style="text-transform: inherit"
          class="ml-5"
          to="/singup"
          nuxt
          text
          small
        >
          Cadastre-se
        </v-btn>
      </p>
    </v-form>
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="primary"
        :loading="loading"
        depressed
        @click.native="submit"
      >
        {{ btnText }}
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import { FirebaseError } from 'firebase/app'

import OnMsg from '@/mixins/OnMsg'
import { getAccountModule } from '@/store'

export default {

  mixins: [OnMsg],

  props: {
    redirect: { type: Function, required: true },
  },

  data: () => ({
    btnText: 'Entrar',
    showPass: false,
    valid: false,
    notMatch: false,
    errorMessage: '',
    loading: false,
    email: '',
    password: '',
    rules: {
      required: (v = '') => !!v || 'Campo obrigatório.',
      min6: (v = '') => v.length >= 6 || 'Ao menos 6 caracteres.',
      email: (v = '') => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || ('Deve ser um endereço válido.'),
    },
  }),

  methods: {
    ...mapMutations('account', ['setUser']),
    ...mapActions('account', ['signIn']),

    async submit () {
      this.errorMessage = ''
      try {
        this.loading = true
        await getAccountModule(this.$store).signIn({ email: this.email, password: this.password })
      } catch (err) {
        if (err instanceof FirebaseError && (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found')) {
          this.errorMessage = 'Verifique seu E-mail e senha e tente novamente.'
          this.btnText = 'Tente novamente'
        } else {
          this.errorMessage = 'Ocorreu um erro ao tentar entrar.'
        }
        console.error(err)
        this.loading = false
      }
    },
  },
}
</script>
