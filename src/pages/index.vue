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
        <h1 class="my-2 titleColor">Projeção</h1>
        <btn-login
          color="#85c1f5"
          class="white--text"
          :src="require('@/assets/img/logo-google.png')"
          title="Entre com o Google"
          :loading="loading"
          @click="submitGoogle"
        />
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
        this.$router.push('/dashboard')
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


<!-- <template>
  <v-container>
      <v-row>
        <v-col  align="center" cols="6">
            <v-avatar size="300">
              <img
                src="@/assets/img/ifconnection.png"
                alt="John"
              >
            </v-avatar>
        </v-col>
        <v-col class="mt-5 pr-5 paddingColumn"  cols="6">
          <h1 class="mt-2 mb-3 text-center">IF Connection</h1>
          <p>
            O sistema IF Connection resultado do trabalho de conclusão de curso apresentado ao Instituto Federal do Paraná - Campus Paranavaí para obtenção do título de Bacharel em Engenharia de Software, tem como principal objetivo aproximar alunos, professores e servidores, de modo que estes tenham acesso de forma mais rápida e eficiente aos assuntos relacionados a comunidade acadêmica, como por exemplo eventos associados a ensino, pesquisa, extensão e tecnologia que ocorrem dentro da instituição de ensino por meio de um sistema de mídia indoor.

          </p>
          
        </v-col>
      </v-row> 
         <v-row justify="center">
          <v-col class="mt-5 pr-5 paddingColumn"  cols="12">
            <h1 class="mt-2 mb-4 text-center">O que é Mídia Indoor?</h1>
            <p class="mt-2">
              O termo mídia indoor refere-se a uma tendência do mercado que visa transmitir conteúdos e informações em lugares onde há um grande fluxo de pessoas ou até mesmo em locais com espera forçada, como por exemplo: shoppings, agências bancárias, recepções, entre outros, por meio da utilização de painéis digitais, como televisões de LED (Light Emitting Diode) e LCD (Liquid Crystal Display). Normalmente essas televisões são posicionadas de forma estratégica, de tal forma que o público local consiga visualizar o conteúdo ali transmitido.             </p>
            
          </v-col>
      </v-row> 
      <v-row justify="center">
        <v-col
          v-for="item in items"
          :key="item.title"
          cols="12"
          lg="3"
          md="3"
          sm="6"
          class="column"
          align="center"
        >
            <v-avatar size="150">
              <img
                :src="item.src"
                alt=""
              >
            </v-avatar>
            <h2 class="mt-3 text-center">{{item.title}}</h2>
            <p class="pl-3 pr-3 mt-2 text-center">{{item.text}}</p>
        </v-col>
      </v-row>
        <v-row justify="center">
          <v-col class="mt-5 pr-5 paddingColumn"  cols="12">
            <h1 class="mt-2 mb-3 text-center">O que o sistema oferece?</h1>
            <p>
              O sistema IF Connection oferece suporte para uploads e download de imagens, GIFs e vídeos, bem como permite a exibição dessas mídias através de TVs instaladas por toda a instituição, permitindo assim,  que qualquer pessoa dentro da instituição independentemente do lugar onde estejam tenham acesso de forma instantânea as informações que diz respeito à comunidade acadêmica desde editais até eventos.
            </p>
            
          </v-col>
      </v-row> 
  </v-container>
</template>

<script>
export default {

  layout: 'site',

  data: () => ({
    items: [
      {
        title: 'Missão',
        text: 'Criar um sistema de mídia indoor que aproxime cada vez mais professores, alunos e servidores do Instituto Federal do Paraná - Campus Paranavaí.',
        src: require('@/assets/img/connection.png'),
      },
      {
        title: 'Visão',
        text: 'Tornar-se referência de solução para outras Instituições de Ensino.',
        src: require('@/assets/img/visao.jpg'),
      },
      {
        title: 'Valores',
        text: 'Profisionalismo, Comprometimento e Transparência',
        src: require('@/assets/img/valores.jpg'),
      },
    ],
  }),
}
</script>

<style lang="scss" scoped>
.row {
  line-height: 1.5rem;
  font-size: 1.2rem;
  padding-top: 3em;
  padding-bottom: 3em;
  position: relative;
  .v-image {
    max-width: 60vw;
    margin: 0 auto;
  }
  &::before {
    content: ' ';
    display: block;
    position: absolute;
    bottom: 0;
    width: 100%;
    border-bottom: .3rem solid var(--v-primary-base);
    border-bottom-right-radius: 40%;
    height: 20%;
  }
  &.odd {
    text-align: right;
    &::before {
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 40%;
    }
  }
  .rowTitle {
    // color: var(--v-accent-base);

    font-weight: 900;
    font-size: 2rem;
    line-height: 2.3rem;
  }
}
.column{
  padding: 20px !important;
}

h1{
  color: var(--v-primary-base);
  margin-bottom: 50px !important;
}

h2{
  border-bottom: 2px solid green;
  color: var(--v-primary-base);
}

.paddingColumn{
  padding: 20px !important;
}

p{ 
  color: rgb(84, 84, 84);
}

</style> -->
