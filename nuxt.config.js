import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang:"en",
    },
    titleTemplate: 'Read My Star - %s',
    title: 'Write My Story',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'og:description', name: 'og:description',  content: 'Free personalized astrology made easy, fun and simple.' },
      { hid: "og:image", name:"og:image", content:"/icon.png"},
      { hid: 'description', name: 'description',  content: 'Free personalized astrology made easy, fun and simple.' },
      { hid: 'keyword', name: 'keyword', content: 'astrology, horoscope, horoscopes, birth chart, horoscope 2020, free horoscopes, ascendant, aries, taurus, gemini, cancer, leo, virgo, libra, scorpio, sagittarius, capricorn, aquarius, pisces, zodiac, sun sign, self knowledge, sign, characters, story' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // https://github.com/nuxt-community/analytics-module
    ['@nuxtjs/google-analytics', {
      id: 'UA-179945653-1'
    }],
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Content module configuration (https://go.nuxtjs.dev/content-config)
  content: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  router: {
      scrollBehavior(to) {
        if (to.hash) {
          return window.scrollTo({ top: document.querySelector(to.hash).offsetTop + window.innerHeight, behavior: 'smooth' });
        }
        return window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
   //Nuxt uses terser as minifier.
   terser: {
      terserOptions: {
        compress: {
          //this removes console.log from production environment! ;)
          drop_console: true
        }
      }
    },
    extend(config, ctx) {
    config.module.rules.push({
      enforce: "pre",
      test: /\.(js|vue)$/,
      loader: "eslint-loader",
      exclude: /(node_modules)/,
      options: {
        fix: true
      }
    })
  }
},
pwa: {
  manifest: {
    name: 'Read My Star',
    lang: 'en',
    short_name: "Read My Star",
    description: "We help you to read your stars so you can write your own story.",
    start_url: "https://readmystar.com/",
    useWebmanifestExtension: false,
    //IOS Categories List: https://developer.apple.com/app-store/categories/
    categories: ["lifestyle", "reference", "entertainment", "education"],
    screenshots : [
  {
    "src": "/images/screenshots/screely-1604707550350.png",
    "sizes": "1366x800",
    "type": "image/png"
  },
  {
    "src": "/images/screenshots/Screen Shot 2020-11-06 at 20.59.43.png",
    "sizes": "2960x1440",
    "type": "image/png"
  },
  {
    "src": "/images/screenshots/Screen Shot 2020-11-06 at 21.00.03.png",
    "sizes": "2960x1440",
    "type": "image/png"
  },
  {
    "src": "/images/screenshots/Screen Shot 2020-11-06 at 21.00.24.png",
    "sizes": "1440x2960",
    "type": "image/png"
  },
  {
    "src": "/images/screenshots/Screen Shot 2020-11-06 at 21.01.37.png",
    "sizes": "1440x2960",
    "type": "image/png"
  },
  {
    "src": "/images/screenshots/Screen Shot 2020-11-06 at 21.02.30.png",
    "sizes": "1440x2960",
    "type": "image/png"
  }
]
  }
},
}
