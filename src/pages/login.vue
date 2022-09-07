<template>
  <v-card :elevation="15" class="pa-2 glass">
    <v-card-text class="text-center subtitle-1 grey--text text--darken-1">
      <p>
        <v-img
        contain
          max-width="250"
          class="mx-auto"
          alt=""
          src="/logotipo2.png"
        />
      </p>
      <!-- title -->

      <template v-if="loading">
        <v-progress-circular
          size="60"
          indeterminate
          color="primary"
        />
        <p class="mt-5">
          Verificando autenticação
        </p>
      </template>
      <template v-else>
        <btn-login
          color="#85c1f5"
          class="white--text"
          :src="require('@/assets/img/logo-google.png')"
          title="Entre com o Google"
          :loading="loading"
          @click="submitGoogle"
        />
        <!-- <h1 class="mt-2 titleColor">Projeção</h1> -->
        <login-with-email class="mt-10" :redirect="redirect" />
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'

import OnMsg from '@/mixins/OnMsg'
import BtnLogin from '@/app/auth/components/BtnLogin.vue'

export default {

  components: {
    LoginWithEmail: () => import('../app/auth/components/LoginWithEmail'),
    BtnLogin,
  },

  mixins: [OnMsg],

  layout: 'login',

   middleware: 'authenticate',

  data: () => ({
    loading: true,
  }),

  computed: {
    ...mapState('account', ['user', 'forceLogin']),
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
    // Reset data logout
    const { meta } = this.$route
    if (Object.keys(meta).length > 0) {
      this.setUser(null)
      this.setPermission(null)
    }
    // Force login state
    this.loading = !this.forceLogin
  },

  methods: {
    ...mapMutations('account', ['setUser', 'setPermission']),
    ...mapActions('account', ['signInGoogle']),

    submitGoogle () {
      this.loading = true
      this.signInGoogle()
        .catch(err => {
          console.error(err)
          this.errorSnack('Usuário não registrado.')
          this.loading = false
        })
    },

    redirect () {
      const url = decodeURI(this.$route.query.next)

      if (!url || url === 'undefined' || url === '/login') {
        this.$router.push('/')
      } else { this.$router.push(url) }
    },
  },
}
</script>

<style lang="scss" scoped>

.titleColor{
  color: var(--v-primary-base);
  font-size: 26px !important;
}

</style>
