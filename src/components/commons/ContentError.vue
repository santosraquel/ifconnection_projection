<template>
  <v-container>
    <p v-if="errorCode" class="errorPageMessage">
      <v-icon>fas fa-heart-broken</v-icon>
      <!-- eslint-disable-next-line vue/no-v-html !-->
      <span v-html="errorText" />
    </p>

    <p v-if="!!errorCode" class="text-xs-center">
      <v-btn v-if="errorCode !== 404" color="primary" text @click="refresh">
        Atualizar página
      </v-btn>
      <v-btn v-if="!!errorCode" color="accent" depressed to="/courses/">
        Catálogo de Cursos
      </v-btn>
    </p>
  </v-container>
</template>

<script>
export default {

  props: {
    errorCode: { required: true, type: [Number, String] },
  },

  computed: {
    errorText () {
      if (this.errorCode === 404) {
        return `Ah não! Parece que você não possui acesso ou esse conteúdo não está mais disponivél. <br><br>
        Caso acredite ser um erro, contate o administrador do domínio.`
      } else if (this.errorCode === 'denied') {
        return 'Ah não! Você não possui permissão para acessar essa página, <br class="hidden-xs-only"> caso tenha sido concedida recentemente, aguarde alguns minutos e atualize a página.'
      } else {
        return 'Oops! Algo de errado, não foi possível carregar o conteúdo, tente atualizar a página.'
      }
    },
  },

  methods: {
    refresh () {
      window.location.reload()
    },
  },
}
</script>
