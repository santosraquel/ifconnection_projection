<template>
  <v-card :elevation="12" class="pa-5 alingCard marginCard" width="50%">
    <v-card-text class="text-center subtitle-1 grey--text text--darken-1">
      <!-- title -->
      <p class="colorTitle">
        <b>{{ appTitle }}</b>
      </p>
      <v-container>
        <v-form>
          <v-row>
            <v-col class="paddingColumn">
              <v-text-field
                v-model="name"
                label="Nome"
                outlined
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="lastname"
                label="Sobrenome"
                outlined
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="email"
                label="E-mail"
                outlined
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="userName"
                label="Nome de Usuário"
                outlined
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="password"
                outlined
                label="Senha"
                :append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
                :rules="[rules.required, rules.min6]"
                :type="showPass ? 'text' : 'password'"
                :disabled="loading"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="passwordConfirm"
                outlined
                label="Confirmar Senha"
                :append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
                :rules="[rules.required, rules.min6]"
                :type="showPass ? 'text' : 'password'"
                :disabled="loading"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn
                class="buttonBack"
                to="/"
                depressed
                block
              >
                <v-icon left>
                  mdi-arrow-left-bold
                </v-icon>
                VOLTAR
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                class="buttonCreate"
                block
              >
                CRIAR
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import OnMsg from '@/mixins/OnMsg'
import { getAccountModule } from '@/store'
import DatePicker from '@/components/commons/DatePicker.vue'

export default {

  components: {
    DatePicker,
  },

  mixins: [OnMsg],

  layout: 'unsigned',

  data: () => ({
    appTitle: 'Crie sua Conta',
    name: '',
    lastname: '',
    row: true,
    email: '',
    userName: '',
    password: '',
    passwordConfirm: '',
    loading: true,
    showPass: false,
    rules: {
      required: (v = '') => !!v || 'Campo obrigatório.',
      min6: (v = '') => v.length >= 6 || 'Ao menos 6 caracteres.',
      email: (v = '') => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || ('Deve ser um endereço válido.'),
    },
  }),

  computed: {
    user () {
      const accountModule = getAccountModule(this.$store)
      return accountModule.user
    },

    forceLogin () {
      const accountModule = getAccountModule(this.$store)
      return accountModule.forceLogin
    },
  },

  watch: {
    user (v) {
      if (!v) { this.loading = false }
      if (this.user._id) { this.redirect() }
    },

    forceLogin (v) {
      if (v) { this.loading = false }
    },
  },

  mounted () {
  // Force login state
    this.loading = !this.forceLogin
  },

  methods: {
    redirect () {
      let url = '/'

      const next = this.$route.query.next
      if (next && typeof next === 'string') {
        url = decodeURI(next)
      }

      if (!url || url === 'undefined' || url === '/login') {
        this.$router.push('/')
      } else { this.$router.push(url) }
    },

    submitGoogle () {
      this.loading = true
      this.accountModule.signInGoogle()
        .catch((err) => {
          console.error(err)
          this.errorSnack('Usuário não registrado.')
          this.loading = false
        })
    },
  },
}
</script>

<style lang="scss">

  .colorTitle{
    color: var(--v-primary-base);
    font-size: 26px !important;
    margin-bottom: 50px !important;
  }

   .buttonCreate{
    background-color: #1c5c27 !important;
    color: white !important;
  }

  .buttonBack{
    color: #848484 !important;
  }

  .paddingColumn{
    padding-bottom: 0 !important;
  }

  .span{
    text-align: left !important;
    margin: 0 !important;
  }

  .marginFieldset{
    margin: 0 0 0 10px!important;
    padding: 0 !important;
    border: #757575 1px;
  }

  .noPadding{
    padding: 0 !important;
  }

  .alingCard{
    margin: 0 auto;
  }

  .marginCard{
    margin-top: 50px;
    margin-bottom: 50px;
  }
</style>
