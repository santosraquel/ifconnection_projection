<template>
  <v-navigation-drawer
    v-model="drawer"
    class="sidebarMenu"
    permanent
    absolute
    expand-on-hover
    clipped
  >
    <!-- main -->
    <v-list shaped>
      <template v-for="(item, i) in routes">
        <v-list-item
          v-if="!item.items"
          :key="`list-${i}`"
          :to="item.to"
          active-class="primary--text"
          nuxt
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          v-else
          :key="`list-${i}`"
          :prepend-icon="item.icon"
          no-action
        >
          <template #activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.items"
            :key="child.title"
            :to="child.to"
            nuxt
          >
            <v-list-item-icon>
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="child.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </template>
    </v-list>

  <!-- footer -->
      <template #append>
        <v-list shaped>
          <v-list-item
            class="profile"
            two-line
          >
            <v-list-item-avatar size="40px">
              <v-img :src="user.photoURL || require('@/assets/img/avatar.png')" />
            </v-list-item-avatar>
  
            <v-list-item-content v-if="user">
              <v-list-item-title>{{ user.nickname || user.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            active-class="primary--text"
            @click="submit"
          >
            <v-list-item-action>
              <v-icon>mdi-arrow-left</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Sair</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
  </template>

<script>
import OnMsg from '@/mixins/OnMsg'
import routes from '@/data/routes.json'
import { getAccountModule, getAppModule } from '@/store'

export default {

  mixins: [OnMsg],

  computed: {
    routes () {
      return routes.filter((item) => {
        if (!item.role) {
          return true
        }
        switch (item.role) {
          case 'Admin':
            return this.user.role === 'Admin'
          case 'Editor':
            return ['Admin', 'Editor'].includes(this.user.role)
          case 'Viewer':
            return ['Admin', 'Editor', 'Viewer'].includes(this.user.role)
          default:
            return false
        }
      })
    },

    user () {
      const accountModule = getAccountModule(this.$store)
      return accountModule.user
    },

    drawer: {
      get () {
        const appModule = getAppModule(this.$store)
        return appModule.sidebarMenu
      },

      set (bool) {
        const appModule = getAppModule(this.$store)
        appModule.setSidebarMenu(bool)
      },
    },
  },

  methods: {
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
.sidebarMenu {
  // padding-top: 70px;
  .profile {
    background-color: #f9fcff;

    .v-avatar {
      position: relative;
      left: -10px;
    }

    .v-list-item__title {
      font-weight: 600;
      font-size: 16px;
      line-height: normal;
      color: var(--v-primary-lighten1) !important;
    }

    .v-list-item__subtitle {
      font-size: 10px;
      letter-spacing: .4px;
    }
  }

  .v-list-item__title {
    font-size: 14px;
  }
}
</style>
