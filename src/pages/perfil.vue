<template>
  <v-card :elevation="12" class="pa-5 alingCard marginCard" width="50%">
    <v-card-text class="text-center subtitle-1 grey--text text--darken-1">
      <!-- title -->
      <p class="colorTitle">
        <b>{{ appTitle }}</b>
      </p>
      <avatar-input 
        class="mb-5 w-32 h-32 rounded-full" 
        v-model="user.photoURL"
        default-src="https://kgms.kgms.ca/wp-content/plugins/testimonial-add/templates/user-icon.jpg"
      />
     
     <v-container>
        <v-form>
          <v-row>
            <v-col class="paddingColumn">
              <v-text-field
                v-model="user.name"
                label="Nome"
                outlined
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="user.lastname"
                label="Sobrenome"
                outlined
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="user.email"
                label="E-mail"
                outlined
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="user.username"
                label="Nome de Usuário"
                outlined
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="user.password"
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
                v-model="user.passwordConfirm"
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
            <v-col cols="6"/>
            <v-col cols="6">
              <v-btn
                class="buttonCreate"
                block
              >
                Atualizar
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
import AvatarInput from '@/components/AvatarInput.vue'

export default {

  components: {
    DatePicker,
    AvatarInput,
},

  mixins: [OnMsg],

  data: () => ({
    appTitle: 'Meus Dados',
    name: '',
    photoURL: '',
    nickname: '',
    date: '',
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
  .inputFile{
    margin-bottom: 10px;
    size: 12px;
  }
  
  .colorTitle{
    color: black;
    font-size: 26px !important;
    margin-bottom: 10px !important;
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
    margin-top: 30px;
    margin-bottom: 30px;
  }
</style>
