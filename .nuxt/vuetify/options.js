// eslint-disable-next-line import/no-extraneous-dependencies
import { pt } from 'vuetify/lib/locale'

export default function () {
  return {
    treeShake: true,
    customVariables: ['@/assets/scss/variables.scss'],

    lang: {
      locales: { pt },
      current: 'pt',
    },

    theme: {
      options: {
        customProperties: true,
      },
      themes: {
        light: {
          primary: {
            // base: '#dfc58e',
            // lighten1: '#e2dddc',
            base: '#1C5C27',
            lighten1: '#FFFFFF',
          },
        },
      },
    },

    icons: {
      iconfont: 'md',
    },
  }
}
