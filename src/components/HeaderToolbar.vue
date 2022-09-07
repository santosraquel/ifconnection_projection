<!-- <template>
  <v-app-bar
    app
    clipped-left
    class="header-toolbar"
    color="#1C5C27"
  >
    <!-- left -->
    <v-app-bar-nav-icon
      class="ml-0 mr-3"
      @click.stop="toggleSidebarMenu"
      color="white"
    />
    <nuxt-link
      to="/"
      class="title-link"
    >
      <v-toolbar-title class="appLogo">
        <a href="/">
      
          <img
            alt=""
            src="@/assets/img/logoBranco.png"
          >
      </a>
      </v-toolbar-title>
    </nuxt-link>

    <v-spacer />

    <v-menu
        v-if="user"
        bottom
        min-width="200px"
        rounded
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            x-large
            v-on="on"
          >

            <v-avatar
              size="40"
            >
              <v-img :src="user.photoURL || require('@/assets/img/avatar.png')" />
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar
                
              >
                <v-img :src="user.photoURL || require('@/assets/img/avatar.png')" />
              </v-avatar>
              <h3>{{ user.name }} {{user.lastName}}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                text
                to="/perfil"
              >
                Meu Perfil
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                text
                @click="submit"
              >
                Sair
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>

    <!-- <avatar-user /> -->

  </v-app-bar>
</template>

<script>
import OnMsg from '@/mixins/OnMsg'
import { getAccountModule, getAppModule } from '@/store'

// import AvatarUser from './AvatarUser.vue'

export default {

  components: {
    // AvatarUser,
  },

  data: () => ({
  }),
  
  computed: {
    // title: () => process.env.APP_TITLE,

    user () {
      const accountModule = getAccountModule(this.$store)
      return accountModule.user
    },
  },

  mixins: [OnMsg],

  methods: {
    toggleSidebarMenu () {
      const appModule = getAppModule(this.$store)
      appModule.toggleSidebarMenu()
    },

    async submit () {
      try {
        await getAccountModule(this.$store).signOut()
        window.location.reload()
      } catch (err) {
        console.error(err)
        this.errorSnack()
      }
    },
  },

}
</script>

<style lang="scss">
.header-toolbar {
   .appLogo {
    margin-left: 10px;
    h1 {
      padding: 0;
    }
    a {
      text-decoration: none;
      display: block;
      height: 100%;
    }
    img {
      padding-top: 5px;
      height: 60px !important;
    }
   }

  .title-link {
    text-decoration: none;
    color: white;
  }
}

</style> -->
