<template>
  <v-container fluid>
    <v-layout class="sectionHeader">
      <!-- <h3>{{ pageTitle }}</h3> -->
      <home-facts id="sobre" :rows="facts1" />
    </v-layout>
    <next-slips v-if="false" />
  </v-container>
</template>

<script>
import HomeFacts from '@/components/home/HomeFacts.vue'

export default {

  components: {
    HomeFacts,
  },

  layout: 'unsigned',

  data: () => ({
    pageTitle: 'Dashboard',
    facts1: [
      {
        title: 'IF&nbsp; CONNECTION',
        text: 'O sistema IF Connection resultado do trabalho de conclusão de curso apresentado ao Instituto Federal do Paraná - Campus Paranavaí para obtenção do título de graduação em Engenharia de Software, tem como principal objetivo aproximar alunos, professores e servidores, de modo que estes tenham acesso de forma mais rápida e eficiente aos assuntos relacionados a comunidade acadêmica, tais como: eventos associados a ensino, pesquisa, extensão e tecnologia.',
        img: '',
      },
      {
        title: 'O que é mídia indoor?',
        text: ' <br><br>',
        img: '',
        odd: true,
      },
      {
        title: 'O que o sistema oferece?',
        text: 'O sistema IF Connection oferece suporte para uploads e download de imagens, GIFs e vídeos, bem como permite a exibição dessas mídias através de TVs instaladas por toda a instituição, permitindo assim,  que qualquer pessoa dentro da instituição independentemente do lugar onde estejam tenham acesso de forma instantânea as informações que diz respeito à comunidade acadêmica desde editais até eventos.',
        img: '',
      },
    ],
  }),

  head () {
    return {
      title: this.pageTitle,
    }
  },
}
</script>