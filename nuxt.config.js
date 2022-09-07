
const APP_TITLE = process.env.APP_TITLE

export default {
  srcDir: 'src/',

  env: {
    ...process.env,
  },

  ssr: false,

  head: {
    titleTemplate: (titleChunk) => {
      const APP_TITLE = process.env.APP_TITLE
      // Fix duplicate title
      if (titleChunk === APP_TITLE) {
        titleChunk = ''
      }

      // If undefined or blank then we don't need the hyphen
      return titleChunk ? `${titleChunk} - ${APP_TITLE}` : APP_TITLE
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Nunito|Material+Icons&display=swap' },
    ],
  },

  router: {
    // trailingSlash: true,
  },

  modules: [
    '@nuxtjs/pwa',
    // '@nuxtjs/firebase',
    '@nuxtjs/axios',
  ],

  loading: {
    color: '#E97300',
    height: '5px',
  },

  firebase: {
    services: {
      auth: {
        ssr: true,
      },
    },
  },

  css: ['@/assets/scss/global.scss'],

  plugins: [
    { src: '@/plugins/fireauth.ts', ssr: false },
  ],

  pwa: {
    // disable the modules you don't need
    meta: false,
    icon: false,
    // if you omit a module key form configuration sensible defaults will be applied
    // manifest: false,

    manifest: {
      name: APP_TITLE,
      short_name: APP_TITLE,
      lang: 'pt-BR',
      display: 'standalone',
      icons: [
        {
          src: '/favicon.png',
          sizes: '192x192 512x512',
        },
      ],
    },
  },

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module',
    '@nuxt/postcss8',
    '@nuxtjs/vuetify',
    '@nuxtjs/router',
  ],

  vuetify: {
    optionsPath: '@@/vuetify.options.js',
  },

  routerModule: {
    keepDefaultRouter: true,
  },

  build: {
  },
}
